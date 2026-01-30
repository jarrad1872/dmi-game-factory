import { NextRequest, NextResponse } from 'next/server';
import { generateGameHTML, processTemplate } from '@/lib/templates';
import { GameConfig } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, name, code, format } = body as { 
      config: GameConfig; 
      name: string; 
      code?: string;
      format?: 'html' | 'zip';
    };
    
    // Generate HTML from code or config
    let html: string;
    if (code) {
      html = processTemplate(code, config);
    } else {
      html = generateGameHTML(config);
    }
    
    const filename = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    // For zip export, use dynamic import
    if (format === 'zip') {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      // Add the HTML file
      zip.file('index.html', html);
      
      // Add a readme
      zip.file('README.md', `# ${name}

This game was created with DMI Game Factory.

## How to Run
Simply open \`index.html\` in any modern web browser.

## Customization
Edit index.html to customize the game. Look for the CONFIG object to change:
- Title
- Colors  
- Difficulty
- Products displayed

Visit https://factory.dmitools.com to create more games!
`);
      
      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      
      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${filename}.zip"`,
        },
      });
    }
    
    // Default: HTML export
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${filename}.html"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export game' }, { status: 500 });
  }
}
