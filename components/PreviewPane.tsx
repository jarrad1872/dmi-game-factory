'use client';

import { useState, useEffect, useRef } from 'react';
import { GameConfig } from '@/lib/types';

interface PreviewPaneProps {
  config: GameConfig;
}

type ViewMode = 'mobile' | 'desktop';

export default function PreviewPane({ config }: PreviewPaneProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Generate preview with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        });
        
        if (res.ok) {
          const html = await res.text();
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          
          // Cleanup old URL
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          
          setPreviewUrl(url);
          setIsPlaying(false);
        }
      } catch (err) {
        console.error('Preview generation failed:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [config]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  const handlePlayTest = () => {
    setIsPlaying(true);
    // Focus iframe to capture keyboard input
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current && previewUrl) {
      iframeRef.current.src = previewUrl;
    }
    setIsPlaying(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-dmi-darker border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Preview</span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-500">{config.template}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-dmi-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-dmi-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🖥️
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Refresh"
          >
            🔄
          </button>

          <button
            onClick={handlePlayTest}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isPlaying
                ? 'bg-green-600 text-white'
                : 'bg-dmi-blue hover:bg-dmi-blue/80 text-white'
            }`}
          >
            {isPlaying ? '🎮 Playing' : '▶ Play Test'}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-[#1a1a2e]">
        <div
          className={`relative bg-black rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full max-w-4xl'
          }`}
          style={{
            boxShadow: viewMode === 'mobile' 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 8px #1a1a2e, 0 0 0 10px #333' 
              : undefined
          }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-dmi-dark z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin w-8 h-8 border-2 border-dmi-orange border-t-transparent rounded-full" />
                <span className="text-sm text-gray-400">Generating preview...</span>
              </div>
            </div>
          )}

          {previewUrl && (
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full h-full border-0"
              title="Game Preview"
              allow="autoplay"
            />
          )}

          {/* Mobile notch for realism */}
          {viewMode === 'mobile' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl" />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-dmi-darker border-t border-gray-800 px-4 py-2">
        <p className="text-xs text-gray-500 text-center">
          {config.template === 'flappy' && '💡 Tap or press SPACE to flap'}
          {config.template === 'runner' && '💡 Tap or press SPACE to jump'}
          {config.template === 'match3' && '💡 Tap adjacent tiles to swap them'}
        </p>
      </div>
    </div>
  );
}
