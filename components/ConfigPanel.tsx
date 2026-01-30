'use client';

import { GameConfig, GameTemplate, GameTheme, DMI_PRODUCTS } from '@/lib/types';
import TemplateSelector from './TemplateSelector';

interface ConfigPanelProps {
  config: GameConfig;
  onChange: (updates: Partial<GameConfig>) => void;
}

const THEMES: { id: GameTheme; name: string; colors: string }[] = [
  { id: 'industrial', name: 'Industrial', colors: 'from-orange-500 to-blue-400' },
  { id: 'construction', name: 'Construction', colors: 'from-orange-400 to-yellow-400' },
  { id: 'tech', name: 'Tech', colors: 'from-cyan-400 to-purple-500' },
  { id: 'nature', name: 'Nature', colors: 'from-green-500 to-lime-400' },
];

export default function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  const toggleProduct = (productId: string) => {
    const products = config.products.includes(productId)
      ? config.products.filter(p => p !== productId)
      : [...config.products, productId];
    onChange({ products });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Template Selection */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Game Template
        </h3>
        <TemplateSelector
          selected={config.template}
          onSelect={(template) => onChange({ template })}
        />
      </section>

      {/* Game Title */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Game Title
        </h3>
        <input
          type="text"
          value={config.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 bg-dmi-darker border border-gray-700 rounded-lg focus:outline-none focus:border-dmi-orange transition-colors text-sm"
          placeholder="Enter game title"
        />
      </section>

      {/* Theme */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Theme
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onChange({ theme: theme.id })}
              className={`p-3 rounded-lg border-2 transition-all ${
                config.theme === theme.id
                  ? 'border-dmi-orange bg-dmi-orange/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className={`w-full h-3 rounded bg-gradient-to-r ${theme.colors} mb-2`} />
              <span className="text-xs">{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* DMI Products */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Featured Products
        </h3>
        <div className="space-y-2">
          {DMI_PRODUCTS.map((product) => (
            <label
              key={product.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                config.products.includes(product.id)
                  ? 'bg-dmi-orange/20 border border-dmi-orange/50'
                  : 'bg-gray-800/50 border border-transparent hover:border-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={config.products.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="sr-only"
              />
              <span className="text-xl">{product.icon}</span>
              <span className="text-sm">{product.name}</span>
              {config.products.includes(product.id) && (
                <span className="ml-auto text-dmi-orange">✓</span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Call to Action
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            value={config.ctaText}
            onChange={(e) => onChange({ ctaText: e.target.value })}
            className="w-full px-3 py-2 bg-dmi-darker border border-gray-700 rounded-lg focus:outline-none focus:border-dmi-orange transition-colors text-sm"
            placeholder="Button text"
          />
          <input
            type="url"
            value={config.ctaUrl}
            onChange={(e) => onChange({ ctaUrl: e.target.value })}
            className="w-full px-3 py-2 bg-dmi-darker border border-gray-700 rounded-lg focus:outline-none focus:border-dmi-orange transition-colors text-sm"
            placeholder="https://dmitools.com"
          />
        </div>
      </section>

      {/* Difficulty */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Difficulty: {config.difficulty}/10
        </h3>
        <input
          type="range"
          min="1"
          max="10"
          value={config.difficulty}
          onChange={(e) => onChange({ difficulty: parseInt(e.target.value) })}
          className="w-full accent-dmi-orange"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Easy</span>
          <span>Hard</span>
        </div>
      </section>

      {/* Branding Toggle */}
      <section>
        <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer">
          <span className="text-sm">Show DMI Branding</span>
          <div
            className={`w-11 h-6 rounded-full transition-colors ${
              config.showBranding ? 'bg-dmi-orange' : 'bg-gray-600'
            }`}
            onClick={() => onChange({ showBranding: !config.showBranding })}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${
                config.showBranding ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </label>
      </section>
    </div>
  );
}
