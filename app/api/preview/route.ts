import { NextRequest, NextResponse } from 'next/server';
import { generateGameHTML } from '@/lib/templates/generator';
import { GameConfig } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const config: GameConfig = await request.json();
    const html = generateGameHTML(config);
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 });
  }
}
