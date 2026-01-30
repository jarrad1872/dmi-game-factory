'use client';

import { useState } from 'react';

export type AIModel = 'opus' | 'kimi';

interface AIPromptPanelProps {
  onBuild: (prompt: string, model: AIModel) => void;
  isBuilding: boolean;
  disabled?: boolean;
}

const MODEL_INFO = {
  opus: {
    name: 'Opus 4.5',
    description: 'Best quality, slower',
    icon: '🎯',
    badge: 'Quality',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
  kimi: {
    name: 'Kimi 2.5',
    description: 'Fast iteration',
    icon: '⚡',
    badge: 'Fast',
    badgeColor: 'bg-green-500/20 text-green-400',
  },
};

const EXAMPLE_PROMPTS = [
  'Add a power-up that makes the player invincible for 5 seconds',
  'Make the player move 20% faster',
  'Add a double-jump ability',
  'Create a new type of obstacle',
  'Add a combo multiplier system',
  'Make the background animate with particles',
];

export default function AIPromptPanel({ onBuild, isBuilding, disabled }: AIPromptPanelProps) {
  const [model, setModel] = useState<AIModel>('opus');
  const [prompt, setPrompt] = useState('');

  const handleBuild = () => {
    if (prompt.trim() && !isBuilding && !disabled) {
      onBuild(prompt.trim(), model);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleBuild();
    }
  };

  return (
    <div className="space-y-4">
      {/* Model Selector */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block font-medium uppercase tracking-wide">
          AI Model
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(MODEL_INFO) as AIModel[]).map((m) => {
            const info = MODEL_INFO[m];
            return (
              <button
                key={m}
                onClick={() => setModel(m)}
                disabled={disabled}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  model === m
                    ? 'border-dmi-orange bg-dmi-orange/10 shadow-lg shadow-orange-500/10'
                    : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{info.icon}</span>
                  <span className="font-semibold text-sm">{info.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${info.badgeColor}`}>
                    {info.badge}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{info.description}</div>
              </button>
            );
          })}
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
          className="w-full h-28 px-4 py-3 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-all text-sm resize-none disabled:opacity-50"
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
            ? 'bg-dmi-orange/50 cursor-wait'
            : prompt.trim() && !disabled
            ? 'bg-gradient-to-r from-dmi-orange to-orange-500 hover:from-orange-500 hover:to-dmi-orange shadow-lg shadow-orange-500/25'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isBuilding ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            <span>Building with {MODEL_INFO[model].name}...</span>
          </>
        ) : (
          <>
            <span>🤖</span>
            <span>Build with AI</span>
          </>
        )}
      </button>

      {/* Model Note */}
      <div className="text-xs text-gray-600 text-center">
        Using {MODEL_INFO[model].icon} {MODEL_INFO[model].name} • {MODEL_INFO[model].description}
      </div>
    </div>
  );
}
