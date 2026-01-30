'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  difficulty: string;
  features: string[];
  tags: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  arcade: '🎮',
  puzzle: '🧩',
  idle: '⏰',
  educational: '📚',
  action: '⚔️',
  strategy: '🧠',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  hard: 'bg-red-500/20 text-red-400',
};

export default function GalleryPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateMetadata[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateMetadata | null>(null);
  const [codePreview, setCodePreview] = useState<string>('');

  useEffect(() => {
    fetch('/api/auth').then(res => {
      if (!res.ok) router.push('/');
    });

    Promise.all([
      fetch('/api/templates').then(res => res.json()),
      fetch('/api/templates?action=categories').then(res => res.json()),
    ]).then(([templatesData, categoriesData]) => {
      setTemplates(templatesData);
      setCategories(categoriesData);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load templates:', err);
      setLoading(false);
    });
  }, [router]);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleViewCode = async (template: TemplateMetadata) => {
    setSelectedTemplate(template);
    try {
      const res = await fetch(`/api/templates?id=${template.id}&action=html`);
      const html = await res.text();
      setCodePreview(html);
    } catch (err) {
      console.error('Failed to load template code:', err);
      setCodePreview('// Failed to load template code');
    }
  };

  const handleUseTemplate = (templateId: string) => {
    // Navigate to create modal with template pre-selected
    router.push(`/dashboard?template=${templateId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-dmi-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dmi-dark via-dmi-darker to-black">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <h1 className="text-xl font-bold">Template Gallery</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-dmi-darker border border-gray-700 rounded-xl focus:outline-none focus:border-dmi-orange transition-colors"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-dmi-orange text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-dmi-orange text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <span>{CATEGORY_ICONS[category] || '📁'}</span>
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="bg-dmi-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-dmi-orange/50 transition-all group"
            >
              {/* Template Preview */}
              <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <span className="text-7xl">{template.icon}</span>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleViewCode(template)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Code
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="px-4 py-2 bg-dmi-orange hover:bg-dmi-orange/80 rounded-lg text-sm font-medium transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${DIFFICULTY_COLORS[template.difficulty] || 'bg-gray-500/20 text-gray-400'}`}>
                    {template.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {template.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-dmi-orange">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Code Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={() => setSelectedTemplate(null)}
          />
          <div className="relative bg-dmi-darker rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedTemplate.icon}</span>
                <div>
                  <h3 className="font-bold">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-400">Template Source Code</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Code Preview */}
            <div className="h-[60vh] overflow-auto">
              <pre className="p-6 text-sm font-mono text-gray-300 whitespace-pre-wrap">
                {codePreview}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codePreview);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
              >
                📋 Copy Code
              </button>
              <button
                onClick={() => {
                  handleUseTemplate(selectedTemplate.id);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 bg-dmi-orange hover:bg-dmi-orange/80 rounded-lg text-sm font-medium transition-colors"
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
