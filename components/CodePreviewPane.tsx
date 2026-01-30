'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GameConfig } from '@/lib/types';

interface CodePreviewPaneProps {
  code: string;
  config: GameConfig;
}

type ViewMode = 'mobile' | 'desktop';

export default function CodePreviewPane({ code, config }: CodePreviewPaneProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
          body: JSON.stringify({ code, config }),
        });
        
        if (res.ok) {
          const html = await res.text();
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          
          setPreviewUrl(url);
        } else {
          setError('Failed to generate preview');
        }
      } catch (err) {
        console.error('Preview generation failed:', err);
        setError('Preview generation failed');
      } finally {
        setLoading(false);
      }
    }, 600); // Slightly longer debounce for code changes

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, config]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current && previewUrl) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 50);
    }
  }, [previewUrl]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      {/* Toolbar */}
      <div className="glass border-b border-gray-800/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-medium text-gray-500 ml-2">Live Preview</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-800/60 rounded-lg p-0.5 border border-gray-700/50">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-dmi-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
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
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all"
            title="Refresh"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div
          className={`relative transition-all duration-300 ${
            viewMode === 'mobile' 
              ? 'w-[320px] h-[568px]' 
              : 'w-full h-full max-w-4xl'
          }`}
        >
          {/* Device frame for mobile */}
          {viewMode === 'mobile' && (
            <div className="absolute -inset-2 rounded-[24px] bg-gray-900 shadow-2xl pointer-events-none" />
          )}

          <div
            className={`relative bg-black overflow-hidden h-full ${
              viewMode === 'mobile'
                ? 'rounded-[20px]'
                : 'rounded-lg'
            }`}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dmi-dark z-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="spinner w-6 h-6" />
                  <span className="text-xs text-gray-400">Updating...</span>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dmi-dark z-20">
                <div className="flex flex-col items-center gap-3 text-center p-4">
                  <div className="text-2xl">⚠️</div>
                  <div className="text-red-400 text-sm">{error}</div>
                  <button
                    onClick={handleRefresh}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs"
                  >
                    Try Again
                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
