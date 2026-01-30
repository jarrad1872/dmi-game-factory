'use client';

import { GameBuild, GameConfig, GameTemplate, DEFAULT_CONFIG } from './types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'dmi-game-factory-builds';

export function getBuilds(): GameBuild[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getBuild(id: string): GameBuild | null {
  const builds = getBuilds();
  return builds.find(b => b.id === id) || null;
}

export function saveBuilds(builds: GameBuild[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}

export function createBuild(name: string, config?: Partial<GameConfig>, template?: GameTemplate): GameBuild {
  const build: GameBuild = {
    id: uuidv4(),
    name,
    config: { 
      ...DEFAULT_CONFIG, 
      ...config,
      ...(template ? { template } : {})
    },
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const builds = getBuilds();
  builds.push(build);
  saveBuilds(builds);
  
  return build;
}

export function updateBuild(id: string, updates: Partial<GameBuild>): GameBuild | null {
  const builds = getBuilds();
  const index = builds.findIndex(b => b.id === id);
  
  if (index === -1) return null;
  
  builds[index] = {
    ...builds[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveBuilds(builds);
  return builds[index];
}

export function deleteBuild(id: string): boolean {
  const builds = getBuilds();
  const filtered = builds.filter(b => b.id !== id);
  
  if (filtered.length === builds.length) return false;
  
  saveBuilds(filtered);
  return true;
}

export function cloneBuild(id: string): GameBuild | null {
  const build = getBuild(id);
  if (!build) return null;
  
  return createBuild(`${build.name} (Copy)`, build.config);
}

export function publishBuild(id: string): GameBuild | null {
  return updateBuild(id, { status: 'published' });
}

export function unpublishBuild(id: string): GameBuild | null {
  return updateBuild(id, { status: 'draft' });
}
