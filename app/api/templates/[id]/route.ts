import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Security: only allow alphanumeric template IDs
    if (!/^[a-z0-9-]+$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid template ID' },
        { status: 400 }
      );
    }
    
    const templatePath = join(process.cwd(), 'public', 'templates', `${id}.html`);
    
    const content = await readFile(templatePath, 'utf-8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    );
  }
}
