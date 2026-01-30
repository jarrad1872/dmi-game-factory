import { NextResponse } from 'next/server';
import { getTemplateList, getTemplate, getTemplateHtml, getCategories } from '@/lib/templates';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const action = searchParams.get('action');
  
  // Get specific template HTML (for code editor)
  if (id && action === 'html') {
    const html = getTemplateHtml(id);
    if (!html) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Get specific template with metadata and HTML
  if (id) {
    const template = getTemplate(id);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    return NextResponse.json(template);
  }
  
  // Get categories
  if (action === 'categories') {
    return NextResponse.json(getCategories());
  }
  
  // Get all templates (metadata only)
  const templates = getTemplateList();
  return NextResponse.json(templates);
}
