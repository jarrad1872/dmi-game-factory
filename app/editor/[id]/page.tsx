'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GameBuild, GameConfig, DEFAULT_CONFIG } from '@/lib/types';
import { getBuild, updateBuild, publishBuild, unpublishBuild } from '@/lib/storage';
import ConfigPanel from '@/components/ConfigPanel';
import PreviewPane from '@/components/PreviewPane';
import CodeEditor from '@/components/CodeEditor';
import AIPromptPanel, { AIModel } from '@/components/AIPromptPanel';
import TemplateCodeSelector from '@/components/TemplateCodeSelector';
import { generateGameHTML } from '@/lib/templates/generator';

type EditorTab = 'config' | 'code';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [build, setBuild] = useState<GameBuild | null>(null);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<EditorTab>('config');
  const [code, setCode] = useState<string>('');
  const [codeModified, setCodeModified] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showMobileConfig, setShowMobileConfig] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Check auth
    fetch('/api/auth').then(res => {
      if (!res.ok) router.push('/');
    });

    // Load build
    const id = params.id as string;
    const loadedBuild = getBuild(id);
    if (loadedBuild) {
      setBuild(loadedBuild);
      setConfig(loadedBuild.config);
      // Generate initial code from config
      const initialCode = generateGameHTML(loadedBuild.config);
      setCode(initialCode);
    } else {
      router.push('/dashboard');
    }
  }, [params.id, router]);

  // Regenerate code when config changes (only if code hasn't been manually modified)
  useEffect(() => {
    if (!codeModified && build) {
      const newCode = generateGameHTML(config);
      setCode(newCode);
    }
  }, [config, codeModified, build]);

  // Auto-save with debounce
  const autoSave = useCallback((newConfig: GameConfig) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (build) {
        const updated = updateBuild(build.id, { config: newConfig });
        if (updated) setBuild(updated);
      }
    }, 1000);
  }, [build]);

  const handleConfigChange = (updates: Partial<GameConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setCodeModified(false); // Reset code modification when config changes
    autoSave(newConfig);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setCodeModified(true);
  };

  const handleSave = () => {
    if (!build) return;
    setSaving(true);
    const updated = updateBuild(build.id, { config });
    if (updated) setBuild(updated);
    setTimeout(() => setSaving(false), 500);
  };

  const handlePublish = () => {
    if (!build) return;
    const updated = build.status === 'published' 
      ? unpublishBuild(build.id)
      : publishBuild(build.id);
    if (updated) setBuild(updated);
  };

  const handleExport = async () => {
    if (!build) return;
    
    try {
      // If code was modified, export the modified code directly
      if (codeModified) {
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${build.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }
      
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, name: build.name }),
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${build.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleAIBuild = async (prompt: string, model: AIModel) => {
    if (!build) return;
    
    setIsBuilding(true);
    setAiMessage(null);
    
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          currentCode: code,
          model,
          gameType: config.template,
        }),
      });
      
      const data = await res.json();
      
      if (data.status === 'success' && data.code) {
        setCode(data.code);
        setCodeModified(true);
        setActiveTab('code');
        setAiMessage(data.message || 'Code generated successfully!');
      } else {
        setAiMessage(data.message || 'Failed to generate code');
      }
    } catch (err) {
      console.error('AI build failed:', err);
      setAiMessage('Failed to connect to AI service');
    } finally {
      setIsBuilding(false);
    }
  };

  const handleResetCode = () => {
    const freshCode = generateGameHTML(config);
    setCode(freshCode);
    setCodeModified(false);
    setAiMessage(null);
  };

  const handleTemplateSelect = (templateCode: string, templateId: string) => {
    setCode(templateCode);
    setCodeModified(true);
    setAiMessage(`Loaded template: ${templateId}`);
  };

  if (!build) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-dmi-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-dmi-darker border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-semibold">{build.name}</h1>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded ${
                build.status === 'published' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {build.status}
              </span>
              {codeModified && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                  🤖 AI Modified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile config toggle */}
          <button
            onClick={() => setShowMobileConfig(!showMobileConfig)}
            className="lg:hidden p-2 bg-gray-800 rounded-lg"
          >
            ⚙️
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-dmi-blue hover:bg-dmi-blue/80 rounded-lg text-sm transition-colors"
          >
            Export
          </button>
          
          <button
            onClick={handlePublish}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              build.status === 'published'
                ? 'bg-yellow-600 hover:bg-yellow-500'
                : 'bg-green-600 hover:bg-green-500'
            }`}
          >
            {build.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </header>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel - Config/Code */}
        <div className="hidden lg:flex lg:flex-col w-[420px] border-r border-gray-800 bg-dmi-darker/50">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('config')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'config'
                  ? 'text-white border-b-2 border-dmi-orange bg-dmi-darker/50'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              ⚙️ Config
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'code'
                  ? 'text-white border-b-2 border-dmi-orange bg-dmi-darker/50'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              💻 Code
              {codeModified && (
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'config' ? (
              <div className="h-full overflow-y-auto">
                <ConfigPanel config={config} onChange={handleConfigChange} />
                
                {/* AI Section in Config Tab */}
                <div className="border-t border-gray-800 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🤖</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                      AI Assistant
                    </h3>
                  </div>
                  <AIPromptPanel 
                    onBuild={handleAIBuild} 
                    isBuilding={isBuilding}
                  />
                  {aiMessage && (
                    <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs text-purple-300">
                      {aiMessage}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Code Controls */}
                <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-dmi-darker/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">HTML</span>
                    {codeModified && (
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                        Modified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {codeModified && (
                      <button
                        onClick={handleResetCode}
                        className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        Reset to Config
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).formatEditorCode) {
                          (window as any).formatEditorCode();
                        }
                      }}
                      className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Format
                    </button>
                  </div>
                </div>
                
                {/* Monaco Editor */}
                <div className="flex-1">
                  <CodeEditor 
                    code={code} 
                    onChange={handleCodeChange}
                    language="html"
                  />
                </div>
                
                {/* AI Section in Code Tab */}
                <div className="border-t border-gray-800 p-4 bg-dmi-darker/80">
                  <AIPromptPanel 
                    onBuild={handleAIBuild} 
                    isBuilding={isBuilding}
                  />
                  {aiMessage && (
                    <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs text-purple-300">
                      {aiMessage}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Config Panel - Mobile Overlay */}
        {showMobileConfig && (
          <div className="lg:hidden absolute inset-0 z-50 bg-dmi-dark/95 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('config')}
                    className={`text-sm font-medium ${activeTab === 'config' ? 'text-white' : 'text-gray-500'}`}
                  >
                    Config
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`text-sm font-medium ${activeTab === 'code' ? 'text-white' : 'text-gray-500'}`}
                  >
                    Code
                  </button>
                </div>
                <button
                  onClick={() => setShowMobileConfig(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  ✕
                </button>
              </div>
              {activeTab === 'config' ? (
                <>
                  <ConfigPanel config={config} onChange={handleConfigChange} />
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                    <h3 className="text-sm font-bold text-white mb-4">🤖 AI Assistant</h3>
                    <AIPromptPanel onBuild={handleAIBuild} isBuilding={isBuilding} />
                  </div>
                </>
              ) : (
                <div className="h-[60vh]">
                  <CodeEditor code={code} onChange={handleCodeChange} language="html" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Pane */}
        <div className="flex-1 bg-dmi-darker">
          <PreviewPane config={config} customCode={codeModified ? code : undefined} />
        </div>
      </div>
    </div>
  );
}
