'use client';

import { useState } from 'react';

interface GameConfig {
  name: string;
  description: string;
  primaryColor: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface CreateGamePanelProps {
  templateId?: string;
  templateName?: string;
  onCreate?: (config: GameConfig) => void;
  onCancel?: () => void;
}

export default function CreateGamePanel({
  templateId,
  templateName = 'Selected Template',
  onCreate,
  onCancel,
}: CreateGamePanelProps) {
  const [config, setConfig] = useState<GameConfig>({
    name: '',
    description: '',
    primaryColor: '#A62022',
    difficulty: 'Medium',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    onCreate?.(config);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-dmi-gray px-6 py-4 border-b border-gray-200">
        <h2 className="font-display text-xl text-dmi-black">
          Configure Your Game
        </h2>
        <p className="font-body text-sm text-dmi-gray mt-1">
          Template: <span className="font-medium text-dmi-black">{templateName}</span>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Game Name */}
        <div>
          <label
            htmlFor="name"
            className="font-ui text-sm font-medium text-dmi-black block mb-2"
          >
            Game Name <span className="text-dmi-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={config.name}
            onChange={handleChange}
            placeholder="Enter your game name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-dmi-black placeholder-gray-400 focus:outline-none focus:border-dmi-red focus:ring-2 focus:ring-dmi-red/20"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="font-ui text-sm font-medium text-dmi-black block mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={config.description}
            onChange={handleChange}
            placeholder="Briefly describe your game"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-dmi-black placeholder-gray-400 focus:outline-none focus:border-dmi-red focus:ring-2 focus:ring-dmi-red/20 resize-none"
          />
        </div>

        {/* Brand Color */}
        <div>
          <label
            htmlFor="primaryColor"
            className="font-ui text-sm font-medium text-dmi-black block mb-2"
          >
            Brand Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={config.primaryColor}
              onChange={handleChange}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={config.primaryColor}
              onChange={handleChange}
              name="primaryColor"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-ui text-dmi-black uppercase"
            />
          </div>
          <p className="font-ui text-xs text-dmi-gray mt-2">
            Default: DMI Red (#A62022)
          </p>
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="font-ui text-sm font-medium text-dmi-black block mb-2"
          >
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={config.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-dmi-black bg-white focus:outline-none focus:border-dmi-red focus:ring-2 focus:ring-dmi-red/20"
          >
            <option value="Easy">Easy - Casual gameplay</option>
            <option value="Medium">Medium - Balanced challenge</option>
            <option value="Hard">Hard - Expert level</option>
          </select>
        </div>

        {/* Preview Section - Placeholder */}
        <div className="bg-dmi-gray rounded-lg p-6">
          <h3 className="font-ui font-semibold text-dmi-black mb-4">
            Preview
          </h3>
          <div className="aspect-video bg-dmi-white rounded border border-gray-200 flex items-center justify-center">
            <span className="font-ui text-gray-400">
              Live preview coming soon
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-dmi-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-dmi-primary"
            disabled={isSubmitting || !config.name.trim()}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              'Create Game'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
