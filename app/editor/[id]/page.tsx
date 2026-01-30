'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GameBuild, GameConfig, DEFAULT_CONFIG } from '@/lib/types';
import { getBuild, updateBuild, publishBuild, unpublishBuild } from '@/lib/storage';
import ConfigPanel from '@/components/ConfigPanel';
import PreviewPane from '@/components/PreviewPane';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [build, setBuild] = useState<GameBuild | null>(null);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [showMobileConfig, setShowMobileConfig] = useState(false);
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
    } else {
      router.push('/dashboard');
    }
  }, [params.id, router]);

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
    autoSave(newConfig);
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
      </div>
    </div>
  );
}
