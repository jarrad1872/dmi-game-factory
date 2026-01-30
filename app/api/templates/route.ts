import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Map template IDs to pre-built game files
const TEMPLATE_FILES: Record<string, string> = {
  'endless-runner': 'core-runner.html',
  'flappy': 'core-runner.html', // Fallback to core-runner for now
  'runner': 'core-runner.html',
  // Add more as we build them
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const action = searchParams.get('action');

  if (!id) {
    return NextResponse.json({ error: 'Missing template id' }, { status: 400 });
  }

  // Get template file name (default to core-runner if not found)
  const fileName = TEMPLATE_FILES[id] || 'core-runner.html';
  
  if (action === 'html') {
    try {
      // Try to read from public/games folder
      const filePath = path.join(process.cwd(), 'public', 'games', fileName);
      
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, 'utf-8');
        return new NextResponse(html, {
          headers: { 'Content-Type': 'text/html' }
        });
      }
      
      // Fallback: return a basic template
      return new NextResponse(getBasicTemplate(id), {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (error) {
      console.error('Template load error:', error);
      return new NextResponse(getBasicTemplate(id), {
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }

  // Return template info
  return NextResponse.json({
    id,
    fileName,
    available: Object.keys(TEMPLATE_FILES)
  });
}

// Basic fallback template
function getBasicTemplate(id: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DMI Game - ${id}</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  </style>
</head>
<body>
  <div id="game"></div>
  <script>
    const CONFIG = {
      title: 'DMI Game',
      brandColor: 0xA62022,
      playerSpeed: 300,
      jumpForce: -500,
      gravity: 1200,
    };
    
    class GameScene extends Phaser.Scene {
      constructor() { super('GameScene'); }
      create() {
        const { width, height } = this.scale;
        this.add.rectangle(width/2, height/2, width, height, 0xF5F5F5);
        this.add.text(width/2, height/2, 'Template: ${id}\\n\\nEdit in AI mode to customize', {
          fontSize: '24px',
          color: '#333',
          align: 'center'
        }).setOrigin(0.5);
      }
    }
    
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game',
      scene: GameScene,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
    });
  </script>
</body>
</html>`;
}
