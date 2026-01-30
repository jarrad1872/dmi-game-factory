import { NextRequest, NextResponse } from 'next/server';
import { GameConfig } from '@/lib/types';

interface AgentRequest {
  prompt: string;
  currentCode: string;
  config: GameConfig;
  model: 'opus' | 'kimi';
}

interface AgentResponse {
  code?: string;
  status: 'success' | 'error';
  message: string;
  tokensUsed?: number;
}

// Model configurations - using Claude Max proxy
const MODEL_CONFIG = {
  opus: {
    name: 'claude-opus-4',
    maxTokens: 16000,
    temperature: 0.7,
  },
  kimi: {
    name: 'claude-sonnet-4',  // Use Sonnet for fast/cheap option
    maxTokens: 8000,
    temperature: 0.5,
  }
};

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are an expert game developer AI assistant for DMI Game Factory.
Your job is to modify or enhance HTML5/JavaScript games built with Phaser 3.

RULES:
1. Always return COMPLETE, working HTML files
2. Keep the existing CONFIG object structure for theming
3. Preserve {{TEMPLATE_VARIABLES}} for dynamic values
4. Use Phaser 3 best practices
5. Add comments for significant changes
6. Ensure games are mobile-friendly (touch input)
7. Keep the DMI branding elements intact

When modifying code:
- Analyze the existing code structure first
- Make targeted changes based on the user's request
- Test logic mentally before outputting
- Preserve working functionality

Return ONLY the complete HTML code, no explanations.`;

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequest = await request.json();
    const { prompt, currentCode, config, model } = body;

    if (!prompt || !currentCode) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields: prompt and currentCode' },
        { status: 400 }
      );
    }

    // Claude Max API Proxy URL
    const apiUrl = process.env.CLAUDE_PROXY_URL || 'https://ensuring-apollo-trees-renew.trycloudflare.com';

    try {
      const modelConfig = MODEL_CONFIG[model];
      
      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelConfig.name,
          max_tokens: modelConfig.maxTokens,
          temperature: modelConfig.temperature,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: `Current game config: ${JSON.stringify(config)}

Current code:
\`\`\`html
${currentCode}
\`\`\`

User request: ${prompt}

Return the complete modified HTML code:`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';
        
        // Extract HTML code from response (may be wrapped in markdown code blocks)
        let code = content;
        const htmlMatch = content.match(/```html\n([\s\S]*?)\n```/);
        if (htmlMatch) {
          code = htmlMatch[1];
        } else {
          // Try without language specifier
          const codeMatch = content.match(/```\n([\s\S]*?)\n```/);
          if (codeMatch) {
            code = codeMatch[1];
          }
        }
        
        return NextResponse.json({
          code: code.trim(),
          status: 'success',
          message: `${model === 'opus' ? '🧠 Opus' : '⚡ Sonnet'} made your changes!`,
          tokensUsed: data.usage?.total_tokens || 0,
        });
      } else {
        const errorText = await response.text();
        console.error('Claude proxy error:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }
    } catch (e) {
      console.error('Claude proxy API error:', e);
      // Fall through to placeholder
    }

    // Placeholder response for demo/development
    const placeholderResponse = await generatePlaceholderResponse(prompt, currentCode, config, model);
    
    return NextResponse.json(placeholderResponse);

  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Placeholder that makes simple modifications based on common requests
async function generatePlaceholderResponse(
  prompt: string,
  currentCode: string,
  config: GameConfig,
  model: 'opus' | 'kimi'
): Promise<AgentResponse> {
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const promptLower = prompt.toLowerCase();
  let modifiedCode = currentCode;
  let message = '';

  // Simple pattern matching for common requests
  if (promptLower.includes('faster') || promptLower.includes('speed')) {
    modifiedCode = currentCode
      .replace(/setVelocityY\(-(\d+)\)/g, (match, num) => `setVelocityY(-${Math.round(parseInt(num) * 1.5)})`)
      .replace(/setVelocityX\(-(\d+)\)/g, (match, num) => `setVelocityX(-${Math.round(parseInt(num) * 1.3)})`);
    message = `⚡ Increased movement speed by 50%!`;
  } 
  else if (promptLower.includes('slower') || promptLower.includes('easier')) {
    modifiedCode = currentCode
      .replace(/setVelocityY\(-(\d+)\)/g, (match, num) => `setVelocityY(-${Math.round(parseInt(num) * 0.7)})`)
      .replace(/setVelocityX\(-(\d+)\)/g, (match, num) => `setVelocityX(-${Math.round(parseInt(num) * 0.8)})`);
    message = `🐢 Reduced speed for easier gameplay!`;
  }
  else if (promptLower.includes('bigger') || promptLower.includes('larger')) {
    modifiedCode = currentCode
      .replace(/setScale\((\d+\.?\d*)\)/g, (match, num) => `setScale(${(parseFloat(num) * 1.5).toFixed(2)})`);
    message = `📐 Made game elements 50% bigger!`;
  }
  else if (promptLower.includes('score') && promptLower.includes('double')) {
    modifiedCode = currentCode
      .replace(/this\.score \+= (\d+)/g, (match, num) => `this.score += ${parseInt(num) * 2}`)
      .replace(/this\.score\+\+/g, 'this.score += 2');
    message = `💰 Doubled all score values!`;
  }
  else if (promptLower.includes('shake') || promptLower.includes('screen shake')) {
    if (!currentCode.includes('cameras.main.shake')) {
      modifiedCode = currentCode.replace(
        /this\.gameOver = true;/g,
        `this.gameOver = true;\n        this.cameras.main.shake(300, 0.02);`
      );
      message = `📳 Added screen shake effect on game over!`;
    } else {
      message = `Screen shake already exists in the code.`;
    }
  }
  else if (promptLower.includes('particle') || promptLower.includes('effect')) {
    message = `✨ Particle effects are already implemented! Check the collect() function.`;
  }
  else if (promptLower.includes('color') || promptLower.includes('theme')) {
    message = `🎨 Colors are controlled by the theme selector in Config mode. Switch to Config tab to change colors!`;
  }
  else {
    message = `🔧 Demo mode - Claude proxy unavailable. Try: "make it faster", "double the score", or "add screen shake"`;
  }

  return {
    code: modifiedCode,
    status: 'success',
    message: model === 'opus' 
      ? `🧠 Opus: ${message}` 
      : `⚡ Sonnet: ${message}`,
    tokensUsed: model === 'opus' ? 2500 : 800,
  };
}

// GET endpoint for status check
export async function GET() {
  const proxyUrl = process.env.CLAUDE_PROXY_URL || 'https://ensuring-apollo-trees-renew.trycloudflare.com';
  
  // Check if proxy is accessible
  let proxyConnected = false;
  try {
    const response = await fetch(`${proxyUrl}/health`, { 
      method: 'GET',
      signal: AbortSignal.timeout(5000) 
    });
    proxyConnected = response.ok;
  } catch {
    proxyConnected = false;
  }
  
  return NextResponse.json({
    status: 'ready',
    models: ['opus', 'kimi'],
    proxyConnected,
    proxyUrl,
    capabilities: proxyConnected 
      ? ['full-generation', 'code-modification', 'bug-fixing', 'feature-addition']
      : ['demo-mode', 'simple-modifications'],
  });
}
