'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameBuild } from '@/lib/types';
import { getBuilds, createBuild, deleteBuild, cloneBuild } from '@/lib/storage';
import BuildCard from '@/components/BuildCard';
import CreateBuildModal from '@/components/CreateBuildModal';

export default function DashboardPage() {
  const [builds, setBuilds] = useState<GameBuild[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const router = useRouter();

  useEffect(() => {
    // Check auth
    fetch('/api/auth').then(res => {
      if (!res.ok) router.push('/');
    });
    
    // Load builds
    setBuilds(getBuilds());
  }, [router]);

  const handleCreate = (name: string) => {
    const build = createBuild(name);
    setBuilds(getBuilds());
    router.push(`/editor/${build.id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this build?')) {
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-dmi-darker/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-dmi-orange to-dmi-blue rounded-lg flex items-center justify-center">
              <span className="text-xl">🎮</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">DMI Game Factory</h1>
              <p className="text-xs text-gray-400">DMI Tools Corp</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <div className="flex gap-2">
            {(['all', 'draft', 'published'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-dmi-orange text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-dmi-orange to-dmi-blue rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <span>+</span>
            <span>New Game</span>
          </button>
        </div>

        {/* Builds Grid */}
        {filteredBuilds.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-xl font-semibold mb-2">No games yet</h2>
            <p className="text-gray-400 mb-6">Create your first arcade game!</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-dmi-orange rounded-lg font-semibold hover:bg-dmi-orange/80 transition-colors"
            >
              Create Game
            </button>
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
