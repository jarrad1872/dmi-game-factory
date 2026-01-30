'use client';

import { GameTemplate } from '@/lib/types';

interface TemplateSelectorProps {
  selected: GameTemplate | string;
  onSelect: (template: GameTemplate) => void;
}

const TEMPLATES: { id: GameTemplate; name: string; icon: string; description: string; difficulty: string }[] = [
  { 
    id: 'flappy', 
    name: 'Flappy Clone', 
    icon: '🐦', 
    description: 'Tap to fly, avoid obstacles',
    difficulty: 'Easy to learn'
  },
  { 
    id: 'runner', 
    name: 'Endless Runner', 
    icon: '🏃', 
    description: 'Auto-run, tap to jump',
    difficulty: 'Fast-paced'
  },
  { 
    id: 'match3', 
    name: 'Match-3 Puzzle', 
    icon: '💎', 
    description: 'Swap tiles to match 3+',
    difficulty: 'Strategic'
  },
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all group ${
            selected === template.id
              ? 'border-dmi-orange bg-gradient-to-r from-dmi-orange/15 to-dmi-orange/5 shadow-lg shadow-orange-500/10'
              : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30 hover:bg-gray-800/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${
              selected === template.id 
                ? 'bg-dmi-orange/20' 
                : 'bg-gray-700/50'
            }`}>
              {template.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base mb-0.5">{template.name}</div>
              <div className="text-xs text-gray-400 mb-1">{template.description}</div>
              <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                selected === template.id 
                  ? 'bg-dmi-orange/30 text-dmi-orange' 
                  : 'bg-gray-700/50 text-gray-500'
              }`}>
                {template.difficulty}
              </span>
            </div>
            {selected === template.id && (
              <div className="w-8 h-8 rounded-full bg-dmi-orange flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
