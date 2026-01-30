'use client';

import { useState } from 'react';

interface CreateBuildModalProps {
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateBuildModal({ onClose, onCreate }: CreateBuildModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="gradient-border w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Create New Game</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Game Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-dmi-darker border border-gray-700 rounded-lg focus:outline-none focus:border-dmi-orange transition-colors"
                placeholder="My Awesome Game"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 py-3 bg-dmi-orange hover:bg-dmi-orange/80 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
