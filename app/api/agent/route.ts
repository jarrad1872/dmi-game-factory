import { NextRequest, NextResponse } from 'next/server';

export interface AgentRequest {
  prompt: string;
  currentCode?: string;
  model: 'opus' | 'kimi';
  gameType: string;
}

export interface AgentResponse {
  code: string;
  status: 'success' | 'error';
  message?: string;
}

// Mock AI response generator - will be wired to Clawdbot later
function generateMockResponse(request: AgentRequest): AgentResponse {
  const { prompt, currentCode, gameType } = request;
  
  // If we have current code, inject a comment showing the AI "modified" it
  if (currentCode) {
    const timestamp = new Date().toISOString();
    const modifiedCode = currentCode.replace(
      '</head>',
      `  <!-- AI Modified: ${prompt.slice(0, 50)}... (${timestamp}) -->\n</head>`
    );
    
    // Add a simple visual indicator that something changed
    const withAIMarker = modifiedCode.replace(
      '.branding {',
      `.ai-indicator {
      position: fixed;
      top: 12px;
      right: 12px;
      background: linear-gradient(135deg, #9333ea, #7c3aed);
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-family: 'Inter', sans-serif;
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(147, 51, 234, 0.4);
    }
    .branding {`
    );
    
    // Add the AI indicator element
    const withIndicatorElement = withAIMarker.replace(
      '<div id="game-container">',
      `<div class="ai-indicator">🤖 AI Enhanced</div>\n  <div id="game-container">`
    );
    
    return {
      code: withIndicatorElement,
      status: 'success',
      message: `Applied: "${prompt.slice(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
    };
  }
  
  // Generate a simple placeholder game if no current code
  const placeholderCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>AI Generated Game | DMI Tools</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: #1a1a2e; 
      overflow: hidden;
      font-family: 'Inter', -apple-system, sans-serif;
    }
    #game-container { 
      width: 100vw; 
      height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center;
    }
    .ai-badge {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #9333ea, #7c3aed);
      color: white;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: bold;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(147, 51, 234, 0.5);
    }
    .prompt-display {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: #888;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 13px;
      max-width: 80%;
      text-align: center;
      z-index: 1000;
    }
    .cta-button {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #FF6B00, #4FC3F7);
      color: white;
      padding: 14px 36px;
      border-radius: 30px;
      font-weight: bold;
      text-decoration: none;
      font-size: 16px;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="ai-badge">🤖 AI Generated (Placeholder)</div>
  <div id="game-container">
    <canvas id="canvas" width="400" height="600" style="background: #0d1117; border-radius: 12px;"></canvas>
  </div>
  <div class="prompt-display">
    <strong>Your prompt:</strong><br/>
    "${prompt}"<br/><br/>
    <em>This is a placeholder. Wire the /api/agent endpoint to Clawdbot for real AI code generation.</em>
  </div>
  <a href="https://dmitools.com" class="cta-button">Shop DMI Tools</a>
  <script>
    // Placeholder animation
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? '#FF6B00' : '#4FC3F7'
      });
    }
    
    function animate() {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
      ctx.fillRect(0, 0, 400, 600);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > 400) p.vx *= -1;
        if (p.y < 0 || p.y > 600) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  </script>
</body>
</html>`;

  return {
    code: placeholderCode,
    status: 'success',
    message: `Generated placeholder for: "${prompt.slice(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequest = await request.json();
    
    const { prompt, model, gameType } = body;
    
    if (!prompt || !model || !gameType) {
      return NextResponse.json({
        code: '',
        status: 'error',
        message: 'Missing required fields: prompt, model, gameType',
      } as AgentResponse, { status: 400 });
    }
    
    // Simulate AI processing time
    const delay = model === 'opus' ? 2000 : 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const response = generateMockResponse(body);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json({
      code: '',
      status: 'error',
      message: 'Failed to process AI request',
    } as AgentResponse, { status: 500 });
  }
}
