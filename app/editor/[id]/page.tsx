'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { GameBuild, GameConfig, DEFAULT_CONFIG } from '@/lib/types';
import { getBuild, updateBuild, publishBuild, unpublishBuild } from '@/lib/storage';
import ConfigPanel from '@/components/ConfigPanel';
import PreviewPane from '@/components/PreviewPane';
import CodePreviewPane from '@/components/CodePreviewPane';
import AIAgentPanel from '@/components/AIAgentPanel';

// Dynamic import Monaco to avoid SSR issues
const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-[#0d1117]">
      <div className="animate-spin w-8 h-8 border-2 border-dmi-orange border-t-transparent rounded-full" />
    </div>
  ),
});

type EditorMode = 'config' | 'code';

interface BuildWithCode extends GameBuild {
  code?: string;
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [build, setBuild] = useState<BuildWithCode | null>(null);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [code, setCode] = useState<string>('');
  const [mode, setMode] = useState<EditorMode>('code'); // Default to code mode for AI
  const [saving, setSaving] = useState(false);
  const [showMobileConfig, setShowMobileConfig] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Load build and template code
  useEffect(() => {
    fetch('/api/auth').then(res => {
      if (!res.ok) router.push('/');
    });

    const id = params.id as string;
    const loadedBuild = getBuild(id) as BuildWithCode | null;
    
    if (loadedBuild) {
      setBuild(loadedBuild);
      setConfig(loadedBuild.config);
      
      // Load existing code or fetch template
      if (loadedBuild.code) {
        setCode(loadedBuild.code);
      } else {
        // Fetch template HTML
        fetch(`/api/templates?id=${loadedBuild.config.template}&action=html`)
          .then(res => res.text())
          .then(html => setCode(html))
          .catch(err => console.error('Failed to load template:', err));
      }
    } else {
      router.push('/dashboard');
    }
  }, [params.id, router]);

  // Listen for save keyboard shortcut
  useEffect(() => {
    const handleSave = () => handleSaveNow();
    window.addEventListener('editor-save', handleSave);
    return () => window.removeEventListener('editor-save', handleSave);
  }, [build, config, code, mode]);

  // Auto-save with debounce
  const autoSave = useCallback((newConfig: GameConfig, newCode?: string) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (build) {
        const updates: Partial<BuildWithCode> = { config: newConfig };
        if (newCode !== undefined) {
          updates.code = newCode;
        }
        const updated = updateBuild(build.id, updates) as BuildWithCode;
        if (updated) setBuild(updated);
      }
    }, 1000);
  }, [build]);

  const handleConfigChange = (updates: Partial<GameConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    autoSave(newConfig);
    
    // If template changed, load new template code
    if (updates.template && updates.template !== config.template) {
      fetch(`/api/templates?id=${updates.template}&action=html`)
        .then(res => res.text())
        .then(html => {
          setCode(html);
          autoSave(newConfig, html);
        })
        .catch(err => console.error('Failed to load template:', err));
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    autoSave(config, newCode);
  };

  const handleAICodeGenerated = (newCode: string) => {
    setCode(newCode);
    autoSave(config, newCode);
  };

  const handleSaveNow = () => {
    if (!build) return;
    setSaving(true);
    const updates: Partial<BuildWithCode> = { config };
    if (mode === 'code') {
      updates.code = code;
    }
    const updated = updateBuild(build.id, updates) as BuildWithCode;
    if (updated) setBuild(updated);
    setTimeout(() => setSaving(false), 500);
  };

  const handlePublish = () => {
    if (!build) return;
    const updated = build.status === 'published' 
      ? unpublishBuild(build.id)
      : publishBuild(build.id);
    if (updated) setBuild(updated as BuildWithCode);
  };

  const handleExport = async (format: 'html' | 'zip' = 'html') => {
    if (!build) return;
    setExportMenuOpen(false);
    
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          config, 
          name: build.name,
          code: mode === 'code' ? code : undefined,
          format
        }),
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${build.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleCopyEmbed = () => {
    if (!build) return;
    const embedCode = `<iframe src="data:text/html,${encodeURIComponent('<!-- Paste exported HTML here -->')}" width="400" height="700" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setExportMenuOpen(false);
  };

  const handleResetCode = async () => {
    if (!build) return;
    if (confirm('Reset code to original template? Your changes will be lost.')) {
      try {
        const res = await fetch(`/api/templates?id=${config.template}&action=html`);
        const html = await res.text();
        setCode(html);
        autoSave(config, html);
      } catch (err) {
        console.error('Failed to reset template:', err);
      }
    }
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
            <span className={`text-xs px-2 py-0.5 rounded ${
              build.status === 'published' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {build.status}
            </span>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1">
          <button
            onClick={() => setMode('config')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'config'
                ? 'bg-dmi-orange text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚙️ Config
          </button>
          <button
            onClick={() => setMode('code')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'code'
                ? 'bg-dmi-orange text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🤖 AI Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mode === 'code' && (
            <button
              onClick={handleResetCode}
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm transition-colors"
              title="Reset to original template"
            >
              ↺ Reset
            </button>
          )}
          
          <button
            onClick={() => setShowMobileConfig(!showMobileConfig)}
            className="lg:hidden p-2 bg-gray-800 rounded-lg"
          >
            ⚙️
          </button>

          <button
            onClick={handleSaveNow}
            disabled={saving}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="px-4 py-2 bg-dmi-blue hover:bg-dmi-blue/80 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              Export
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {exportMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setExportMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden">
                  <button
                    onClick={() => handleExport('html')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-700 flex items-center gap-2"
                  >
                    📄 Download HTML
                  </button>
                  <button
                    onClick={() => handleExport('zip')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-700 flex items-center gap-2"
                  >
                    📦 Download ZIP
                  </button>
                  <button
                    onClick={handleCopyEmbed}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-700 flex items-center gap-2 border-t border-gray-700"
                  >
                    🔗 Copy Embed Code
                  </button>
                </div>
              </>
            )}
          </div>
          
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
        {mode === 'config' ? (
          <>
            {/* Config Panel - Desktop */}
            <div className="hidden lg:block w-80 border-r border-gray-800 overflow-y-auto bg-dmi-darker/50">
              <ConfigPanel config={config} onChange={handleConfigChange} />
            </div>

            {/* Config Panel - Mobile Overlay */}
            {showMobileConfig && (
              <div className="lg:hidden absolute inset-0 z-50 bg-dmi-dark/95 overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Configuration</h2>
                    <button
                      onClick={() => setShowMobileConfig(false)}
                      className="p-2 hover:bg-gray-800 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <ConfigPanel config={config} onChange={handleConfigChange} />
                </div>
              </div>
            )}

            {/* Preview Pane */}
            <div className="flex-1 bg-dmi-darker">
              <PreviewPane config={config} />
            </div>
          </>
        ) : (
          <>
            {/* Code Editor with AI Panel */}
            <div className="flex-1 flex flex-col border-r border-gray-800 min-w-0">
              {/* AI Agent Panel */}
              <AIAgentPanel
                currentCode={code}
                config={config}
                onCodeGenerated={handleAICodeGenerated}
              />
              
              {/* Code Editor */}
              <div className="flex-1 min-h-0">
                <CodeEditor
                  code={code}
                  onChange={handleCodeChange}
                  language="html"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="w-[400px] flex-shrink-0 hidden lg:block">
              <CodePreviewPane code={code} config={config} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
