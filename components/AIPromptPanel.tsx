'use client';

import { useState } from 'react';

export type AIModel = 'opus';

interface AIPromptPanelProps {
  onBuild: (prompt: string, model: AIModel) => void;
  isBuilding: boolean;
  disabled?: boolean;
}

const EXAMPLE_PROMPTS = [
  'Add a power-up that makes the player invincible for 5 seconds',
  'Make the player move 20% faster',
  'Add a double-jump ability',
  'Create a new type of obstacle',
  'Add a combo multiplier system',
  'Make the background animate with particles',
];

export default function AIPromptPanel({ onBuild, isBuilding, disabled }: AIPromptPanelProps) {
  const [prompt, setPrompt] = useState('');

  const handleBuild = () => {
    if (prompt.trim() && !isBuilding && !disabled) {
      onBuild(prompt.trim(), 'opus');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleBuild();
    }
  };

  return (
    <div className="space-y-4">
      {/* Model Info */}
      <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
        <span className="text-2xl">🧠</span>
        <div>
          <div className="font-semibold text-sm text-purple-300">Claude Opus 4.5</div>
          <div className="text-xs text-gray-500">Best quality • Complex game modifications</div>
        </div>
      </div>

      {/* Prompt Input */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block font-medium uppercase tracking-wide">
          What do you want to build?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isBuilding}
          placeholder="Describe what you want the AI to build or change..."
          className="w-full h-28 px-4 py-3 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm resize-none disabled:opacity-50"
        />
        <div className="text-xs text-gray-600 mt-1">
          ⌘/Ctrl + Enter to build
        </div>
      </div>

      {/* Example Prompts */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block font-medium uppercase tracking-wide">
          Examples
        </label>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.slice(0, 3).map((example, i) => (
            <button
              key={i}
              onClick={() => setPrompt(example)}
              disabled={disabled || isBuilding}
              className="text-xs px-3 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-full text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {example.slice(0, 30)}...
            </button>
          ))}
        </div>
      </div>

      {/* Build Button */}
      <button
        onClick={handleBuild}
        disabled={!prompt.trim() || isBuilding || disabled}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
          isBuilding
            ? 'bg-purple-500/50 cursor-wait'
            : prompt.trim() && !disabled
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isBuilding ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            <span>Building with Opus...</span>
          </>
        ) : (
          <>
            <span>🧠</span>
            <span>Build with AI</span>
          </>
        )}
      </button>

      {/* Model Note */}
      <div className="text-xs text-gray-600 text-center">
        🧠 Powered by Claude Opus 4.5
      </div>
    </div>
  );
}
