'use client';

import { useState, useEffect, useRef } from 'react';
import { GameTemplate } from '@/lib/types';

interface CreateBuildModalProps {
  onClose: () => void;
  onCreate: (name: string, template?: GameTemplate) => void;
  defaultTemplate?: GameTemplate;
}

const TEMPLATES: { id: GameTemplate; name: string; icon: string; description: string }[] = [
  { id: 'flappy', name: 'Flappy Clone', icon: '🐦', description: 'Tap to fly' },
  { id: 'runner', name: 'Endless Runner', icon: '🏃', description: 'Jump & run' },
  { id: 'match3', name: 'Match-3 Puzzle', icon: '💎', description: 'Swap tiles' },
];

export default function CreateBuildModal({ onClose, onCreate, defaultTemplate }: CreateBuildModalProps) {
  const [name, setName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate>(defaultTemplate || 'flappy');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
    
    // Close on escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), selectedTemplate);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gradient-border w-full max-w-lg animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Create New Game</h2>
              <p className="text-sm text-gray-400 mt-1">Start building your arcade experience</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Game Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Game Name
              </label>
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-all text-lg"
                placeholder="My Awesome Game"
              />
            </div>

            {/* Template Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Start with Template
              </label>
              <div className="grid grid-cols-3 gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      selectedTemplate === template.id
                        ? 'border-dmi-orange bg-dmi-orange/15 shadow-lg shadow-orange-500/10'
                        : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{template.icon}</div>
                    <div className="font-semibold text-sm mb-0.5">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-gray-700/80 hover:bg-gray-600 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 py-4 bg-gradient-to-r from-dmi-orange to-orange-500 hover:from-orange-500 hover:to-dmi-orange rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-dmi-orange disabled:hover:to-orange-500 shadow-lg shadow-orange-500/25"
              >
                Create Game →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
