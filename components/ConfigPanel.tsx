'use client';

import { GameConfig, GameTemplate, GameTheme, DMI_PRODUCTS } from '@/lib/types';
import TemplateSelector from './TemplateSelector';

interface ConfigPanelProps {
  config: GameConfig;
  onChange: (updates: Partial<GameConfig>) => void;
}

const THEMES: { id: GameTheme; name: string; colors: string; description: string }[] = [
  { id: 'industrial', name: 'Industrial', colors: 'from-orange-500 to-blue-400', description: 'DMI signature' },
  { id: 'construction', name: 'Construction', colors: 'from-orange-400 to-yellow-400', description: 'Job site vibes' },
  { id: 'tech', name: 'Tech', colors: 'from-cyan-400 to-purple-500', description: 'Modern & sleek' },
  { id: 'nature', name: 'Nature', colors: 'from-green-500 to-lime-400', description: 'Eco-friendly' },
];

const DIFFICULTY_LABELS = ['Easy', 'Casual', 'Normal', 'Challenging', 'Hard', 'Expert', 'Intense', 'Brutal', 'Insane', 'Impossible'];

export default function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  const toggleProduct = (productId: string) => {
    const products = config.products.includes(productId)
      ? config.products.filter(p => p !== productId)
      : [...config.products, productId];
    onChange({ products });
  };

  return (
    <div className="p-5 space-y-8">
      {/* Template Selection */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🎮</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Game Type
          </h3>
        </div>
        <TemplateSelector
          selected={config.template}
          onSelect={(template) => onChange({ template })}
        />
      </section>

      {/* Game Title */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">✏️</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Game Title
          </h3>
        </div>
        <input
          type="text"
          value={config.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-4 py-3 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-all text-sm"
          placeholder="Enter game title"
        />
      </section>

      {/* Theme */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🎨</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Visual Theme
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onChange({ theme: theme.id })}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                config.theme === theme.id
                  ? 'border-dmi-orange bg-dmi-orange/10 shadow-lg shadow-orange-500/10'
                  : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30'
              }`}
            >
              <div className={`w-full h-4 rounded-full bg-gradient-to-r ${theme.colors} mb-3 shadow-md`} />
              <div className="font-semibold text-sm">{theme.name}</div>
              <div className="text-xs text-gray-500">{theme.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* DMI Products */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">⚙️</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Featured Products
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">Select products to feature in your game</p>
        <div className="space-y-2">
          {DMI_PRODUCTS.map((product) => (
            <label
              key={product.id}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                config.products.includes(product.id)
                  ? 'bg-gradient-to-r from-dmi-orange/20 to-dmi-orange/5 border border-dmi-orange/40 shadow-lg shadow-orange-500/5'
                  : 'bg-gray-800/40 border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/60'
              }`}
            >
              <input
                type="checkbox"
                checked={config.products.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="sr-only"
              />
              <span className="text-2xl">{product.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{product.name}</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                config.products.includes(product.id)
                  ? 'border-dmi-orange bg-dmi-orange text-white'
                  : 'border-gray-600'
              }`}>
                {config.products.includes(product.id) && (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🔗</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Call to Action
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Button Text</label>
            <input
              type="text"
              value={config.ctaText}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              className="w-full px-4 py-3 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-all text-sm"
              placeholder="Shop DMI Tools"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Link URL</label>
            <input
              type="url"
              value={config.ctaUrl}
              onChange={(e) => onChange({ ctaUrl: e.target.value })}
              className="w-full px-4 py-3 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-all text-sm"
              placeholder="https://dmitools.com"
            />
          </div>
        </div>
      </section>

      {/* Difficulty */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💪</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Difficulty
            </h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            config.difficulty <= 3 ? 'bg-green-500/20 text-green-400' :
            config.difficulty <= 6 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {DIFFICULTY_LABELS[config.difficulty - 1]}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={config.difficulty}
          onChange={(e) => onChange({ difficulty: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Easy</span>
          <span>Normal</span>
          <span>Hard</span>
        </div>
      </section>

      {/* Branding Toggle */}
      <section>
        <label className="flex items-center justify-between p-4 bg-gray-800/40 hover:bg-gray-800/60 rounded-xl cursor-pointer transition-colors border border-gray-700/30">
          <div className="flex items-center gap-3">
            <span className="text-lg">🏷️</span>
            <div>
              <div className="font-medium text-sm">DMI Branding</div>
              <div className="text-xs text-gray-500">Show logo in game</div>
            </div>
          </div>
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${
              config.showBranding ? 'bg-dmi-orange' : 'bg-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              onChange({ showBranding: !config.showBranding });
            }}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                config.showBranding ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </div>
        </label>
      </section>
    </div>
  );
}
