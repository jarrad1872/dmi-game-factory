'use client';

import { GameBuild } from '@/lib/types';

interface BuildCardProps {
  build: GameBuild;
  onEdit: () => void;
  onDelete: () => void;
  onClone: () => void;
}

const TEMPLATE_ICONS: Record<string, string> = {
  flappy: '🐦',
  runner: '🏃',
  match3: '💎',
};

const TEMPLATE_NAMES: Record<string, string> = {
  flappy: 'Flappy Clone',
  runner: 'Endless Runner',
  match3: 'Match-3',
};

export default function BuildCard({ build, onEdit, onDelete, onClone }: BuildCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="gradient-border card-hover">
      <div className="p-4">
        {/* Thumbnail */}
        <div className="aspect-video bg-dmi-dark rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="text-6xl">{TEMPLATE_ICONS[build.config.template] || '🎮'}</div>
          
          {/* Status Badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            build.status === 'published'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {build.status}
          </div>
        </div>

        {/* Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{build.name}</h3>
          <p className="text-sm text-gray-400">{TEMPLATE_NAMES[build.config.template]}</p>
          <p className="text-xs text-gray-500 mt-1">Updated {formatDate(build.updatedAt)}</p>
        </div>

        {/* Products */}
        <div className="flex flex-wrap gap-1 mb-4">
          {build.config.products.slice(0, 3).map((productId) => (
            <span
              key={productId}
              className="px-2 py-1 bg-dmi-orange/20 text-dmi-orange text-xs rounded"
            >
              {productId}
            </span>
          ))}
          {build.config.products.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
              +{build.config.products.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 py-2 bg-dmi-orange hover:bg-dmi-orange/80 rounded-lg font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onClone}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title="Clone"
          >
            📋
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
