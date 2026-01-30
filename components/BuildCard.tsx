'use client';

import { GameBuild, DMI_PRODUCTS } from '@/lib/types';

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

const THEME_GRADIENTS: Record<string, string> = {
  industrial: 'from-orange-500 to-blue-400',
  construction: 'from-orange-400 to-yellow-400',
  tech: 'from-cyan-400 to-purple-500',
  nature: 'from-green-500 to-lime-400',
};

export default function BuildCard({ build, onEdit, onDelete, onClone }: BuildCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getProductName = (productId: string) => {
    const product = DMI_PRODUCTS.find(p => p.id === productId);
    return product ? product.name : productId;
  };

  const getProductIcon = (productId: string) => {
    const product = DMI_PRODUCTS.find(p => p.id === productId);
    return product ? product.icon : '📦';
  };

  return (
    <div className="gradient-border card-hover group">
      <div className="p-5">
        {/* Thumbnail */}
        <div className={`aspect-video bg-gradient-to-br ${THEME_GRADIENTS[build.config.theme] || 'from-orange-500 to-blue-400'} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-2 text-4xl opacity-30">{TEMPLATE_ICONS[build.config.template] || '🎮'}</div>
            <div className="absolute bottom-2 right-2 text-4xl opacity-30">{TEMPLATE_ICONS[build.config.template] || '🎮'}</div>
          </div>
          
          {/* Main icon */}
          <div className="text-6xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            {TEMPLATE_ICONS[build.config.template] || '🎮'}
          </div>
          
          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            build.status === 'published'
              ? 'badge-published'
              : 'badge-draft'
          }`}>
            {build.status === 'published' ? '● Live' : '○ Draft'}
          </div>

          {/* Theme indicator */}
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs capitalize">
            {build.config.theme}
          </div>
        </div>

        {/* Info */}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1 truncate group-hover:text-dmi-orange transition-colors">
            {build.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{TEMPLATE_NAMES[build.config.template]}</span>
            <span className="text-gray-600">•</span>
            <span>{formatDate(build.updatedAt)}</span>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {build.config.products.slice(0, 3).map((productId) => (
            <span
              key={productId}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-dmi-orange/15 border border-dmi-orange/30 text-dmi-orange text-xs rounded-full"
              title={getProductName(productId)}
            >
              <span>{getProductIcon(productId)}</span>
              <span className="hidden sm:inline">{getProductName(productId).split(' ')[0]}</span>
            </span>
          ))}
          {build.config.products.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
              +{build.config.products.length - 3}
            </span>
          )}
          {build.config.products.length === 0 && (
            <span className="px-2.5 py-1 bg-gray-700/50 text-gray-500 text-xs rounded-full italic">
              No products
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 py-2.5 bg-gradient-to-r from-dmi-orange to-orange-500 hover:from-orange-500 hover:to-dmi-orange rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/25"
          >
            Edit
          </button>
          <button
            onClick={onClone}
            className="p-2.5 bg-gray-700/80 hover:bg-gray-600 rounded-lg transition-colors group/btn"
            title="Clone this build"
          >
            <span className="group-hover/btn:scale-110 inline-block transition-transform">📋</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors group/btn"
            title="Delete"
          >
            <span className="group-hover/btn:scale-110 inline-block transition-transform">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
