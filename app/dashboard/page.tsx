'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameBuild, GameTemplate } from '@/lib/types';
import { getBuilds, createBuild, deleteBuild, cloneBuild } from '@/lib/storage';
import BuildCard from '@/components/BuildCard';
import CreateBuildModal from '@/components/CreateBuildModal';

export default function DashboardPage() {
  const [builds, setBuilds] = useState<GameBuild[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check auth
    fetch('/api/auth').then(res => {
      if (!res.ok) {
        router.push('/');
      } else {
        setLoading(false);
        // Load builds
        setBuilds(getBuilds());
      }
    });
  }, [router]);

  const handleCreate = (name: string, template?: GameTemplate) => {
    const build = createBuild(name, undefined, template);
    setBuilds(getBuilds());
    router.push(`/editor/${build.id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this build? This action cannot be undone.')) {
      deleteBuild(id);
      setBuilds(getBuilds());
    }
  };

  const handleClone = (id: string) => {
    const cloned = cloneBuild(id);
    if (cloned) {
      setBuilds(getBuilds());
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/');
  };

  const filteredBuilds = builds.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const publishedCount = builds.filter(b => b.status === 'published').length;
  const draftCount = builds.filter(b => b.status === 'draft').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner w-10 h-10" />
          <span className="text-gray-400">Loading factory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-dmi-orange to-dmi-blue rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse-glow">
              <span className="text-2xl">🏭</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DMI Game Factory
              </h1>
              <p className="text-xs text-gray-500">DMI Tools Corp</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4 pr-4 border-r border-gray-700/50">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{builds.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{publishedCount}</div>
                <div className="text-xs text-gray-500">Live</div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <div className="flex gap-2 bg-gray-800/40 p-1 rounded-xl">
            {([
              { key: 'all', label: 'All', count: builds.length },
              { key: 'draft', label: 'Drafts', count: draftCount },
              { key: 'published', label: 'Published', count: publishedCount },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === f.key
                    ? 'bg-dmi-orange text-white shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {f.label}
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  filter === f.key ? 'bg-white/20' : 'bg-gray-700'
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-dmi-orange to-orange-500 hover:from-orange-500 hover:to-dmi-orange rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Game</span>
          </button>
        </div>

        {/* Builds Grid */}
        {filteredBuilds.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-dmi-orange/20 to-dmi-blue/20 rounded-full flex items-center justify-center animate-float">
              <span className="text-5xl">🎮</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              {filter === 'all' ? 'No games yet' : `No ${filter} games`}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Create your first arcade game and start engaging customers with interactive content!'
                : `You don't have any ${filter} games. ${filter === 'published' ? 'Publish a draft to go live!' : 'Start creating!'}`
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-dmi-orange to-orange-500 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
              >
                Create Your First Game
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBuilds.map((build) => (
              <BuildCard
                key={build.id}
                build={build}
                onEdit={() => router.push(`/editor/${build.id}`)}
                onDelete={() => handleDelete(build.id)}
                onClone={() => handleClone(build.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DMI Tools Corp. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="https://dmitools.com" target="_blank" rel="noopener noreferrer" className="hover:text-dmi-orange transition-colors">
              dmitools.com
            </a>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Create Modal */}
      {showModal && (
        <CreateBuildModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
