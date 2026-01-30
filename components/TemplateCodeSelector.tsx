'use client';

import { useState, useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  category: string;
  features: string[];
}

interface TemplatesData {
  templates: Template[];
  categories: Array<{ id: string; name: string; icon: string }>;
}

interface TemplateCodeSelectorProps {
  onSelect: (code: string, templateId: string) => void;
  currentTemplate?: string;
}

export default function TemplateCodeSelector({ onSelect, currentTemplate }: TemplateCodeSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/templates/templates.json')
      .then(res => res.json())
      .then((data: TemplatesData) => setTemplates(data.templates))
      .catch(err => console.error('Failed to load templates:', err));
  }, []);

  const handleSelectTemplate = async (templateId: string) => {
    setLoading(templateId);
    try {
      const res = await fetch(`/api/templates/${templateId}`);
      if (res.ok) {
        const code = await res.text();
        onSelect(code, templateId);
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Failed to load template:', err);
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-gray-800/60 hover:bg-gray-700/60 rounded-xl text-sm text-left transition-colors flex items-center gap-3"
      >
        <span className="text-lg">📁</span>
        <div>
          <div className="font-medium">Start from Template</div>
          <div className="text-xs text-gray-500">Load a pre-built game as starting point</div>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-gray-800/60 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Select Template</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-white text-xs"
        >
          Cancel
        </button>
      </div>
      
      <div className="space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            disabled={loading !== null}
            className={`w-full p-3 rounded-lg border text-left transition-all ${
              loading === template.id
                ? 'border-dmi-orange bg-dmi-orange/10'
                : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{template.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-400">
                    {template.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{template.description}</div>
              </div>
              {loading === template.id && (
                <div className="animate-spin w-4 h-4 border-2 border-dmi-orange border-t-transparent rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
