'use client';

import { GameTemplate } from '@/lib/types';

interface TemplateSelectorProps {
  selected: GameTemplate;
  onSelect: (template: GameTemplate) => void;
}

const TEMPLATES: { id: GameTemplate; name: string; icon: string; description: string }[] = [
  { id: 'flappy', name: 'Flappy Clone', icon: '🐦', description: 'Tap to fly, avoid obstacles' },
  { id: 'runner', name: 'Endless Runner', icon: '🏃', description: 'Auto-run, tap to jump' },
  { id: 'match3', name: 'Match-3', icon: '💎', description: 'Swap tiles to match 3+' },
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-2">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
            selected === template.id
              ? 'border-dmi-orange bg-dmi-orange/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{template.icon}</span>
            <div>
              <div className="font-semibold">{template.name}</div>
              <div className="text-xs text-gray-400">{template.description}</div>
            </div>
            {selected === template.id && (
              <span className="ml-auto text-dmi-orange text-lg">✓</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
