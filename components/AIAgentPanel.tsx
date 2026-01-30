'use client';

import { useState, useRef, useEffect } from 'react';
import { GameConfig } from '@/lib/types';

interface AIAgentPanelProps {
  currentCode: string;
  config: GameConfig;
  onCodeGenerated: (code: string) => void;
}

type AgentModel = 'opus' | 'kimi';

interface AgentStatus {
  status: 'idle' | 'thinking' | 'coding' | 'complete' | 'error';
  message: string;
  progress?: number;
}

const AGENT_INFO: Record<AgentModel, { name: string; icon: string; description: string; color: string }> = {
  opus: {
    name: 'Claude Opus 4.5',
    icon: '🧠',
    description: 'Heavy hitter • Best quality • Complex tasks',
    color: 'from-purple-500 to-indigo-600'
  },
  kimi: {
    name: 'Kimi K2',
    icon: '⚡',
    description: 'Lightning fast • Cost-effective • Quick edits',
    color: 'from-cyan-500 to-blue-500'
  }
};

const EXAMPLE_PROMPTS = [
  "Make the player move 50% faster",
  "Add a power-up that doubles score for 5 seconds",
  "Change the theme to neon cyberpunk colors",
  "Add particle effects when collecting items",
  "Create a combo system for consecutive matches",
  "Add a pause menu with restart option",
  "Make obstacles spawn in patterns",
  "Add screen shake when player dies",
];

export default function AIAgentPanel({ currentCode, config, onCodeGenerated }: AIAgentPanelProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentModel>('kimi');
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<AgentStatus>({ status: 'idle', message: '' });
  const [isExpanded, setIsExpanded] = useState(true);
  const [history, setHistory] = useState<{ prompt: string; agent: AgentModel; success: boolean }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [prompt]);

  const handleBuild = async () => {
    if (!prompt.trim()) return;
    
    setStatus({ status: 'thinking', message: 'Agent is analyzing your request...' });
    
    try {
      // Simulate progress updates
      const progressMessages = [
        { status: 'thinking', message: 'Understanding the codebase...', progress: 20 },
        { status: 'coding', message: 'Writing game logic...', progress: 50 },
        { status: 'coding', message: 'Optimizing and polishing...', progress: 80 },
      ];
      
      // Show progress updates
      for (const msg of progressMessages) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setStatus(msg as AgentStatus);
      }

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          currentCode,
          config,
          model: selectedAgent
        })
      });

      const data = await response.json();

      if (response.ok && data.code) {
        setStatus({ status: 'complete', message: data.message || 'Code generated successfully!', progress: 100 });
        onCodeGenerated(data.code);
        setHistory(prev => [{ prompt: prompt.trim(), agent: selectedAgent, success: true }, ...prev.slice(0, 9)]);
        setPrompt('');
      } else {
        throw new Error(data.error || 'Failed to generate code');
      }
    } catch (error) {
      console.error('Agent error:', error);
      setStatus({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Something went wrong. Try again.' 
      });
      setHistory(prev => [{ prompt: prompt.trim(), agent: selectedAgent, success: false }, ...prev.slice(0, 9)]);
    }

    // Reset status after delay
    setTimeout(() => {
      if (status.status !== 'idle') {
        setStatus({ status: 'idle', message: '' });
      }
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleBuild();
    }
  };

  const insertExample = (example: string) => {
    setPrompt(example);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-b border-gray-800">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dmi-orange to-purple-600 flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-sm">AI Game Builder</h3>
            <p className="text-xs text-gray-500">Describe what you want, AI builds it</p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Agent Selector */}
          <div className="flex gap-2">
            {(Object.entries(AGENT_INFO) as [AgentModel, typeof AGENT_INFO['opus']][]).map(([id, agent]) => (
              <button
                key={id}
                onClick={() => setSelectedAgent(id)}
                className={`flex-1 p-3 rounded-xl border-2 transition-all text-left ${
                  selectedAgent === id
                    ? `border-transparent bg-gradient-to-r ${agent.color} shadow-lg`
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{agent.icon}</span>
                  <span className="font-semibold text-sm">{agent.name}</span>
                </div>
                <p className={`text-xs ${selectedAgent === id ? 'text-white/80' : 'text-gray-500'}`}>
                  {agent.description}
                </p>
              </button>
            ))}
          </div>

          {/* Prompt Input */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build or change..."
              className="w-full px-4 py-3 pr-24 bg-gray-800/80 border border-gray-700 rounded-xl resize-none focus:outline-none focus:border-dmi-orange transition-colors text-sm min-h-[48px]"
              rows={1}
              disabled={status.status === 'thinking' || status.status === 'coding'}
            />
            <button
              onClick={handleBuild}
              disabled={!prompt.trim() || status.status === 'thinking' || status.status === 'coding'}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                !prompt.trim() || status.status === 'thinking' || status.status === 'coding'
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : `bg-gradient-to-r ${AGENT_INFO[selectedAgent].color} text-white hover:shadow-lg`
              }`}
            >
              {status.status === 'thinking' || status.status === 'coding' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Building</span>
                </>
              ) : (
                <>
                  <span>Build</span>
                  <span className="text-xs opacity-70">⌘↵</span>
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          {status.status !== 'idle' && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              status.status === 'error' 
                ? 'bg-red-500/20 border border-red-500/30' 
                : status.status === 'complete'
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-gray-800/80 border border-gray-700'
            }`}>
              {status.status === 'thinking' && (
                <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              )}
              {status.status === 'coding' && (
                <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              )}
              {status.status === 'complete' && <span className="text-green-400">✓</span>}
              {status.status === 'error' && <span className="text-red-400">✕</span>}
              <span className={`text-sm flex-1 ${
                status.status === 'error' ? 'text-red-300' : 
                status.status === 'complete' ? 'text-green-300' : 'text-gray-300'
              }`}>
                {status.message}
              </span>
              {status.progress && status.status !== 'complete' && status.status !== 'error' && (
                <span className="text-xs text-gray-500">{status.progress}%</span>
              )}
            </div>
          )}

          {/* Example Prompts */}
          {status.status === 'idle' && !prompt && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.slice(0, 4).map((example, i) => (
                  <button
                    key={i}
                    onClick={() => insertExample(example)}
                    className="px-3 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent History */}
          {history.length > 0 && status.status === 'idle' && (
            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs text-gray-500 mb-2">Recent:</p>
              <div className="space-y-1">
                {history.slice(0, 3).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => insertExample(item.prompt)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg text-left transition-colors"
                  >
                    <span className="text-sm">{AGENT_INFO[item.agent].icon}</span>
                    <span className="flex-1 text-xs text-gray-400 truncate">{item.prompt}</span>
                    <span className={item.success ? 'text-green-400' : 'text-red-400'}>
                      {item.success ? '✓' : '✕'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
