import { NextRequest, NextResponse } from 'next/server';
import { generateGameHTML, processTemplate } from '@/lib/templates';
import { GameConfig } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Support both config-based and code-based preview
    if (body.code) {
      // Direct code preview (from code editor)
      const config: GameConfig = body.config;
      const html = processTemplate(body.code, config);
      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    
    // Config-based preview (from config editor)
    const config: GameConfig = body;
    const html = generateGameHTML(config);
    
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 });
  }
}
