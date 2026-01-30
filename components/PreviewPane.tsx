'use client';

import { useState, useEffect, useRef } from 'react';
import { GameConfig } from '@/lib/types';

interface PreviewPaneProps {
  config: GameConfig;
}

type ViewMode = 'mobile' | 'desktop';

const TEMPLATE_INSTRUCTIONS: Record<string, string> = {
  flappy: '👆 Tap or press SPACE to flap • Avoid the pipes • Collect stars for bonus points',
  runner: '👆 Tap or press SPACE to jump • Avoid obstacles • Collect coins',
  match3: '👆 Tap adjacent tiles to swap • Match 3 or more • Clear the board',
};

export default function PreviewPane({ config }: PreviewPaneProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Generate preview with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
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
        } else {
          setError('Failed to generate preview');
        }
      } catch (err) {
        console.error('Preview generation failed:', err);
        setError('Preview generation failed');
      } finally {
        setLoading(false);
      }
    }, 400);

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
      // Force reload by setting src again
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 50);
    }
    setIsPlaying(false);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      {/* Toolbar */}
      <div className="glass border-b border-gray-800/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="h-4 w-px bg-gray-700"></div>
          <span className="text-sm font-medium text-gray-400">Preview</span>
          <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-500 capitalize">
            {config.template}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-dmi-orange text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile view"
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'desktop'
                  ? 'bg-dmi-orange text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop view"
            >
              🖥️ Desktop
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            title="Refresh preview"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button
            onClick={handlePlayTest}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              isPlaying
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-gradient-to-r from-dmi-blue to-blue-500 hover:from-blue-500 hover:to-dmi-blue text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="animate-pulse">●</span>
                <span>Playing</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Play Test</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div
          className={`relative transition-all duration-500 ease-out ${
            viewMode === 'mobile' 
              ? 'w-[390px] h-[844px] max-h-[calc(100vh-200px)]' 
              : 'w-full h-full max-w-5xl max-h-[700px]'
          }`}
        >
          {/* Device frame for mobile */}
          {viewMode === 'mobile' && (
            <div className="absolute inset-0 device-frame pointer-events-none z-10" />
          )}

          {/* Preview container */}
          <div
            className={`relative bg-black overflow-hidden h-full ${
              viewMode === 'mobile'
                ? 'rounded-[32px] m-3'
                : 'rounded-xl'
            }`}
            style={{
              boxShadow: viewMode === 'desktop' 
                ? '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05)' 
                : undefined
            }}
          >
            {/* Loading state */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dmi-dark z-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="spinner w-10 h-10" />
                  <span className="text-sm text-gray-400 font-medium">Generating preview...</span>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dmi-dark z-20">
                <div className="flex flex-col items-center gap-4 text-center p-6">
                  <div className="text-4xl">⚠️</div>
                  <div className="text-red-400 font-medium">{error}</div>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Iframe */}
            {previewUrl && (
              <iframe
                ref={iframeRef}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Game Preview"
                allow="autoplay"
                tabIndex={0}
              />
            )}
          </div>
        </div>
      </div>

      {/* Instructions bar */}
      <div className="glass border-t border-gray-800/50 px-6 py-3">
        <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
          <span className="text-dmi-orange">💡</span>
          {TEMPLATE_INSTRUCTIONS[config.template]}
        </p>
      </div>
    </div>
  );
}
