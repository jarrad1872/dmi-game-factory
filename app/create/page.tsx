'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gameTemplates, GameTemplate } from '@/lib/game-templates';
import { createBuild, updateBuild } from '@/lib/storage';

export default function V2CreatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate | null>(null);
  const [step, setStep] = useState(1);
  const [gameName, setGameName] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStatus, setBuildStatus] = useState('');

  const handleSelectTemplate = (template: GameTemplate) => {
    setSelectedTemplate(template);
    setGameName(template.dmiTitle);
  };

  const handleContinue = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    } else if (step === 2) {
      handleBuildGame();
    }
  };

  const handleBuildGame = async () => {
    if (!selectedTemplate) return;
    
    setIsBuilding(true);
    setBuildStatus('Creating build...');
    
    try {
      // Create a build first
      const build = createBuild(gameName, {
        gameName,
        template: selectedTemplate.id as any,
        colors: { primary: '#A62022', secondary: '#222222' }
      });
      
      setBuildStatus('Generating game code with Claude Opus 4.5...');
      
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a complete ${selectedTemplate.title} game called "${gameName}" with the following concept: ${selectedTemplate.dmiConcept}. 
          
Include these game elements:
- Collectibles: ${selectedTemplate.collectibles.join(', ')}
- Obstacles: ${selectedTemplate.obstacles.join(', ')}
- Power-ups: ${selectedTemplate.powerUps.join(', ')}

Use DMI Tools branding with colors: Red (#A62022), Black (#222222), White background.
Make it mobile-friendly with touch controls.`,
          currentCode: '<!DOCTYPE html><html><head><title>Game</title></head><body></body></html>',
          config: { 
            gameName,
            template: selectedTemplate.id,
            colors: { primary: '#A62022', secondary: '#222222' }
          },
          model: 'opus'
        })
      });

      const data = await response.json();
      
      if (data.status === 'success' && data.code) {
        setBuildStatus('Game built! Opening editor...');
        
        // Update the build with the generated code
        updateBuild(build.id, { code: data.code } as any);
        
        // Redirect to the split-screen editor
        router.push(`/editor/${build.id}`);
      } else {
        setBuildStatus('Build failed: ' + (data.message || 'Unknown error'));
        setIsBuilding(false);
      }
    } catch (error) {
      console.error('Build error:', error);
      setBuildStatus('Build failed: Network error');
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dmi-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-dmi py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://dmitools.com/cdn/shop/files/dmi_800x470.png?v=1613785694"
                alt="DMI Tools"
                className="h-8 w-auto"
              />
              <span className="font-display text-xl text-dmi-black hidden sm:block">
                Game Factory
              </span>
            </a>
            <span className="badge-made-in-usa">Made in USA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container-dmi">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-dmi-black mb-2">
                Create New Game
              </h1>
              <p className="font-body text-dmi-gray">
                Choose a template and customize it for your needs.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-ui font-bold text-sm ${
                  step >= 1 ? 'bg-dmi-red text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  1
                </div>
                <span className={`font-ui text-sm font-medium ${step >= 1 ? 'text-dmi-black' : 'text-gray-500'}`}>
                  Select Template
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-ui font-bold text-sm ${
                  step >= 2 ? 'bg-dmi-red text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  2
                </div>
                <span className={`font-ui text-sm font-medium ${step >= 2 ? 'text-dmi-black' : 'text-gray-500'}`}>
                  Customize
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-ui font-bold text-sm ${
                  step >= 3 ? 'bg-dmi-red text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <span className={`font-ui text-sm font-medium ${step >= 3 ? 'text-dmi-black' : 'text-gray-500'}`}>
                  Editor
                </span>
              </div>
            </div>

            {/* Step 1: Template Selection */}
            {step === 1 && (
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="font-display text-xl text-dmi-black mb-6">
                  Select a Game Template ({gameTemplates.length} available)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelectTemplate(template)}
                      className={`card-dmi cursor-pointer group transition-all ${
                        selectedTemplate?.id === template.id 
                          ? 'ring-2 ring-dmi-red shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="aspect-video rounded-t-lg relative overflow-hidden bg-gray-100">
                        {template.previewUrl ? (
                          <img
                            src={template.previewUrl}
                            alt={template.dmiTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                            <span className="text-5xl drop-shadow-lg">{template.icon}</span>
                          </div>
                        )}
                        {selectedTemplate?.id === template.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-dmi-red text-white rounded-full flex items-center justify-center">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-ui text-xs text-dmi-red font-medium uppercase">
                            {template.category}
                          </span>
                          <span className="font-ui text-xs text-gray-400">
                            #{template.number}
                          </span>
                        </div>
                        <h3 className="font-ui font-semibold text-dmi-black group-hover:text-dmi-red transition-colors">
                          {template.dmiTitle}
                        </h3>
                        <p className="font-body text-sm text-dmi-gray mt-1 line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Customize */}
            {step === 2 && selectedTemplate && (
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="font-display text-xl text-dmi-black mb-6">
                  Customize Your Game
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Selected Template Preview */}
                  <div>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                      {selectedTemplate.previewUrl ? (
                        <img
                          src={selectedTemplate.previewUrl}
                          alt={selectedTemplate.dmiTitle}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${selectedTemplate.color} flex items-center justify-center`}>
                          <span className="text-8xl drop-shadow-lg">{selectedTemplate.icon}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-lg text-dmi-black">{selectedTemplate.dmiTitle}</h3>
                    <p className="font-body text-sm text-dmi-gray mt-2">{selectedTemplate.dmiConcept}</p>
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-6">
                    <div>
                      <label className="font-ui text-sm font-medium text-dmi-black block mb-2">
                        Game Name
                      </label>
                      <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-dmi-red font-body"
                        placeholder="Enter game name"
                      />
                    </div>

                    <div>
                      <label className="font-ui text-sm font-medium text-dmi-black block mb-2">
                        Game Elements
                      </label>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-ui text-xs font-semibold text-green-700 mb-1">Collectibles</h4>
                          <p className="font-body text-sm text-green-600">{selectedTemplate.collectibles.join(', ')}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <h4 className="font-ui text-xs font-semibold text-red-700 mb-1">Obstacles</h4>
                          <p className="font-body text-sm text-red-600">{selectedTemplate.obstacles.join(', ')}</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <h4 className="font-ui text-xs font-semibold text-purple-700 mb-1">Power-ups</h4>
                          <p className="font-body text-sm text-purple-600">{selectedTemplate.powerUps.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🧠</span>
                        <div>
                          <h4 className="font-ui font-semibold text-dmi-black text-sm">Powered by Claude Opus 4.5</h4>
                          <p className="font-body text-xs text-gray-500">AI will generate a complete, playable game</p>
                        </div>
                      </div>
                    </div>

                    {buildStatus && (
                      <div className={`p-4 rounded-lg ${
                        buildStatus.includes('failed') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        <div className="flex items-center gap-3">
                          {isBuilding && (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          )}
                          <span className="font-ui text-sm">{buildStatus}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn-dmi-secondary"
                  disabled={isBuilding}
                >
                  ← Back
                </button>
              ) : (
                <a href="/" className="btn-dmi-secondary">
                  Cancel
                </a>
              )}
              
              <button
                onClick={handleContinue}
                className="btn-dmi-primary"
                disabled={(step === 1 && !selectedTemplate) || isBuilding}
              >
                {isBuilding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                    Building...
                  </>
                ) : step === 1 ? (
                  'Continue →'
                ) : (
                  '🚀 Build & Open Editor'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
