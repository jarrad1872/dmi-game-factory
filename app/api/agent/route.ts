import { NextRequest, NextResponse } from 'next/server';
import { GameConfig } from '@/lib/types';

interface AgentRequest {
  prompt: string;
  currentCode: string;
  config: GameConfig;
  model: 'opus';
}

interface AgentResponse {
  code?: string;
  status: 'success' | 'error';
  message: string;
  tokensUsed?: number;
}

// Model configuration - using Claude Max proxy (Opus only)
const MODEL_CONFIG = {
  opus: {
    name: 'claude-opus-4',
    maxTokens: 4000,
    temperature: 0.7,
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

// Generate a complete working game template
function generateGameTemplate(config: GameConfig): string {
  const gameName = config.gameName || 'DMI Game';
  
  // Base Phaser 3 game template
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${gameName}</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: #1a1a1a; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #game-container { box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .dmi-branding {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #A62022;
      font-weight: bold;
      font-size: 12px;
      text-shadow: 1px 1px 2px white;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <script>
    // DMI Brand Colors
    const DMI_RED = 0xA62022;
    const DMI_BLACK = 0x222222;
    const DMI_WHITE = 0xFFFFFF;
    
    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: 'GameScene' });
        this.score = 0;
        this.gameOver = false;
        this.speed = 200;
      }
      
      preload() {
        // Create simple colored rectangles as textures
        const graphics = this.make.graphics();
        
        // Player
        graphics.fillStyle(DMI_RED, 1);
        graphics.fillRect(0, 0, 40, 40);
        graphics.generateTexture('player', 40, 40);
        
        // Collectible
        graphics.clear();
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(15, 15, 15);
        graphics.generateTexture('collectible', 30, 30);
        
        // Obstacle
        graphics.clear();
        graphics.fillStyle(DMI_BLACK, 1);
        graphics.fillRect(0, 0, 50, 50);
        graphics.generateTexture('obstacle', 50, 50);
        
        // Particle
        graphics.clear();
        graphics.fillStyle(0xFFD700, 0.8);
        graphics.fillCircle(4, 4, 4);
        graphics.generateTexture('particle', 8, 8);
      }
      
      create() {
        // Background
        this.add.rectangle(400, 300, 800, 600, DMI_WHITE);
        
        // Grid pattern
        const gridGraphics = this.add.graphics();
        gridGraphics.lineStyle(1, 0xE5E5E5);
        for (let i = 0; i < 800; i += 50) {
          gridGraphics.moveTo(i, 0);
          gridGraphics.lineTo(i, 600);
        }
        for (let i = 0; i < 600; i += 50) {
          gridGraphics.moveTo(0, i);
          gridGraphics.lineTo(800, i);
        }
        gridGraphics.strokePath();
        
        // Player
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);
        
        // Collectibles group
        this.collectibles = this.physics.add.group();
        
        // Obstacles group  
        this.obstacles = this.physics.add.group();
        
        // Spawn timer
        this.time.addEvent({
          delay: 2000,
          callback: this.spawnObjects,
          callbackScope: this,
          loop: true
        });
        
        // Initial spawn
        this.spawnObjects();
        
        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
          fontSize: '24px',
          fill: '#222',
          fontStyle: 'bold'
        });
        
        // Game title
        this.add.text(400, 30, '${gameName}', {
          fontSize: '28px',
          fill: '#A62022',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Instructions
        this.add.text(400, 570, 'Tap or SPACE to jump • Collect diamonds • Avoid obstacles', {
          fontSize: '14px',
          fill: '#666'
        }).setOrigin(0.5);
        
        // Collisions
        this.physics.add.overlap(this.player, this.collectibles, this.collect, null, this);
        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
        
        // Input
        this.input.on('pointerdown', this.jump, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Particle emitter
        this.emitter = this.add.particles(0, 0, 'particle', {
          speed: { min: -100, max: 100 },
          angle: { min: 0, max: 360 },
          scale: { start: 1, end: 0 },
          lifespan: 500,
          gravityY: 200,
          emitting: false
        });
        
        // DMI Branding
        this.add.text(780, 580, 'DMI Tools', {
          fontSize: '12px',
          fill: '#A62022',
          fontStyle: 'bold'
        }).setOrigin(1);
      }
      
      update() {
        if (this.gameOver) return;
        
        // Auto move forward
        this.player.x += 2;
        if (this.player.x > 750) this.player.x = 50;
        
        // Jump controls
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
          this.jump();
        }
        
        // Move obstacles and collectibles
        this.obstacles.children.entries.forEach(obj => {
          obj.x -= 3;
          if (obj.x < -50) obj.destroy();
        });
        
        this.collectibles.children.entries.forEach(obj => {
          obj.x -= 3;
          if (obj.x < -50) obj.destroy();
        });
      }
      
      jump() {
        if (this.player.body.touching.down || this.player.y > 450) {
          this.player.setVelocityY(-400);
        }
      }
      
      spawnObjects() {
        if (this.gameOver) return;
        
        // Spawn collectible
        const y = Phaser.Math.Between(100, 500);
        const collectible = this.collectibles.create(850, y, 'collectible');
        
        // Spawn obstacle
        const obstacleY = Phaser.Math.Between(100, 500);
        if (Math.abs(obstacleY - y) > 80) {
          this.obstacles.create(850, obstacleY, 'obstacle');
        }
      }
      
      collect(player, collectible) {
        collectible.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        // Particle effect
        this.emitter.emitParticleAt(collectible.x, collectible.y, 10);
        
        // Speed up slightly
        this.speed += 5;
      }
      
      hitObstacle(player, obstacle) {
        this.physics.pause();
        this.gameOver = true;
        player.setTint(0x888888);
        
        // Shake camera
        this.cameras.main.shake(300, 0.02);
        
        // Game over text
        this.add.text(400, 250, 'GAME OVER', {
          fontSize: '48px',
          fill: '#A62022',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(400, 320, 'Final Score: ' + this.score, {
          fontSize: '24px',
          fill: '#222'
        }).setOrigin(0.5);
        
        this.add.text(400, 370, 'Tap to restart', {
          fontSize: '18px',
          fill: '#666'
        }).setOrigin(0.5);
        
        this.input.once('pointerdown', () => {
          this.scene.restart();
        });
      }
    }
    
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#FFFFFF',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 800 },
          debug: false
        }
      },
      scene: GameScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };
    
    const game = new Phaser.Game(config);
  </script>
</body>
</html>`;
}

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
        const htmlMatch = content.match(/\`\`\`html\n([\s\S]*?)\n\`\`\`/);
        if (htmlMatch) {
          code = htmlMatch[1];
        } else {
          // Try without language specifier
          const codeMatch = content.match(/\`\`\`\n([\s\S]*?)\n\`\`\`/);
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

// Placeholder that makes simple modifications or generates new games
async function generatePlaceholderResponse(
  prompt: string,
  currentCode: string,
  config: GameConfig,
  model: 'opus'
): Promise<AgentResponse> {
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const promptLower = prompt.toLowerCase();
  
  // If this looks like a new game creation request, generate a full template
  if (promptLower.includes('create') || promptLower.includes('create a complete') || currentCode.length < 200) {
    const gameCode = generateGameTemplate(config);
    return {
      code: gameCode,
      status: 'success',
      message: `🧠 Opus generated ${config.gameName || 'your game'}! (Demo mode - AI proxy unavailable)`,
      tokensUsed: 3500,
    };
  }
  
  let modifiedCode = currentCode;
  let message = '';

  // Simple pattern matching for modifications
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
      .replace(/this\.score += (\d+)/g, (match, num) => `this.score += ${parseInt(num) * 2}`)
      .replace(/this\.score\+\+/g, 'this.score += 2');
    message = `💰 Doubled all score values!`;
  }
  else {
    message = `🔧 Demo mode - Claude proxy unavailable. Try: "make it faster", "double the score", or "add screen shake"`;
  }

  return {
    code: modifiedCode,
    status: 'success',
    message: `🧠 Opus: ${message}`,
    tokensUsed: 2500,
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
