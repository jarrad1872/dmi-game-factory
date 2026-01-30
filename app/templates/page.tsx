'use client';

import { useState } from 'react';
import { gameTemplates, categories, getTemplatesByCategory, GameTemplate } from '@/lib/game-templates';

export default function V2TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate | null>(null);
  
  const filteredTemplates = getTemplatesByCategory(selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-dmi-white">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-dmi py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://dmitools.com/cdn/shop/files/dmi_800x470.png?v=1613785694"
                alt="DMI Tools"
                className="h-8 w-auto"
              />
              <span className="font-display text-xl text-dmi-black hidden sm:block">
                Game Factory
              </span>
            </a>
            <a
              href="/create"
              className="btn-dmi-primary text-sm"
            >
              Create Game
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container-dmi">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-dmi-black mb-2">
              Game Templates
            </h1>
            <p className="font-body text-dmi-gray max-w-2xl">
              Browse our collection of {gameTemplates.length} professional arcade-style games. 
              Each template features DMI Tools branding and real product integration.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-ui text-sm px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category
                    ? 'bg-dmi-red text-white border-dmi-red'
                    : 'bg-white text-dmi-black border-gray-300 hover:border-dmi-red'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-70">
                    ({gameTemplates.filter(t => t.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <article
                key={template.id}
                className="card-dmi group cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                  {/* Game Number Badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 bg-white text-dmi-red rounded-full flex items-center justify-center font-ui font-bold text-sm z-10 shadow">
                    {template.number}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-ui text-xs px-2 py-1 bg-white/90 backdrop-blur rounded text-dmi-black shadow">
                      {template.category}
                    </span>
                  </div>

                  {/* Preview Image */}
                  {template.previewUrl ? (
                    <img
                      src={template.previewUrl}
                      alt={template.dmiTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                      <span className="text-6xl drop-shadow-lg">{template.icon}</span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white text-dmi-red rounded-lg font-ui font-semibold text-sm shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <span className="font-ui text-xs text-dmi-red font-medium uppercase tracking-wide">
                      {template.dmiTitle}
                    </span>
                  </div>
                  <h3 className="font-ui font-semibold text-dmi-black mb-2">
                    {template.title}
                  </h3>
                  <p className="font-body text-sm text-dmi-gray line-clamp-2 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-ui text-dmi-gray bg-gray-100 px-2 py-1 rounded">
                      {template.difficulty}
                    </span>
                    <span className="font-ui text-dmi-gray">
                      ~{template.estimatedTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="font-body text-dmi-gray">
                No templates found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-ui text-xs text-dmi-red font-medium uppercase tracking-wide">
                    Template #{selectedTemplate.number}
                  </span>
                  <h2 className="font-display text-2xl text-dmi-black mt-1">
                    {selectedTemplate.dmiTitle}
                  </h2>
                  <p className="font-body text-dmi-gray mt-1">
                    {selectedTemplate.title}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-dmi-black"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* DMI Concept */}
              <div>
                <h3 className="font-ui font-semibold text-dmi-black mb-2">DMI Concept</h3>
                <p className="font-body text-dmi-gray">
                  {selectedTemplate.dmiConcept}
                </p>
              </div>

              {/* Game Elements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-ui font-semibold text-green-700 text-sm mb-2">🎯 Collectibles</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    {selectedTemplate.collectibles.slice(0, 3).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-ui font-semibold text-red-700 text-sm mb-2">⚠️ Obstacles</h4>
                  <ul className="text-sm text-red-600 space-y-1">
                    {selectedTemplate.obstacles.slice(0, 3).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-ui font-semibold text-purple-700 text-sm mb-2">⚡ Power-ups</h4>
                  <ul className="text-sm text-purple-600 space-y-1">
                    {selectedTemplate.powerUps.slice(0, 3).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reference Games */}
              <div>
                <h3 className="font-ui font-semibold text-dmi-black mb-2">Similar Games</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.referenceGames.map((game, i) => (
                    <span key={i} className="font-ui text-sm px-3 py-1 bg-gray-100 rounded-full text-dmi-gray">
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className={`font-ui font-medium ${
                    selectedTemplate.difficulty === 'Easy' ? 'text-green-600' :
                    selectedTemplate.difficulty === 'Medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {selectedTemplate.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Est. Build Time:</span>
                  <span className="font-ui font-medium text-dmi-black">
                    {selectedTemplate.estimatedTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <a
                href={`/create?template=${selectedTemplate.id}`}
                className="flex-1 btn-dmi-primary text-center"
              >
                Use This Template
              </a>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="btn-dmi-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dmi-gray py-6">
        <div className="container-dmi">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-ui text-sm text-dmi-gray">
              © 2024 DMI Tools Corp. All rights reserved.
            </div>
            <span className="badge-made-in-usa">Made in USA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
