import { NextRequest, NextResponse } from 'next/server';
import { generateGameHTML } from '@/lib/templates/generator';
import { GameConfig } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { config, name }: { config: GameConfig; name: string } = await request.json();
    const html = generateGameHTML(config);
    
    // Return as downloadable HTML file
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export game' }, { status: 500 });
  }
}
