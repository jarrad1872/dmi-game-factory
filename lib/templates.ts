import fs from 'fs';
import path from 'path';
import { GameConfig, THEME_COLORS, DMI_PRODUCTS } from './types';

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  difficulty: string;
  features: string[];
  tags: string[];
}

export interface Template extends TemplateMetadata {
  html: string;
}

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

/**
 * Get all available templates (metadata only)
 */
export function getTemplateList(): TemplateMetadata[] {
  try {
    const folders = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const templates: TemplateMetadata[] = [];
    
    for (const folder of folders) {
      const metadataPath = path.join(TEMPLATES_DIR, folder, 'template.json');
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          templates.push(metadata);
        } catch (e) {
          console.error(`Failed to parse template metadata for ${folder}:`, e);
        }
      }
    }
    
    return templates;
  } catch (e) {
    console.error('Failed to read templates directory:', e);
    return [];
  }
}

/**
 * Get a specific template by ID
 */
export function getTemplate(id: string): Template | null {
  const templateDir = path.join(TEMPLATES_DIR, id);
  const metadataPath = path.join(templateDir, 'template.json');
  const htmlPath = path.join(templateDir, 'game.html');
  
  if (!fs.existsSync(metadataPath) || !fs.existsSync(htmlPath)) {
    return null;
  }
  
  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    return { ...metadata, html };
  } catch (e) {
    console.error(`Failed to load template ${id}:`, e);
    return null;
  }
}

/**
 * Get raw template HTML (for code editor)
 */
export function getTemplateHtml(id: string): string | null {
  const htmlPath = path.join(TEMPLATES_DIR, id, 'game.html');
  
  if (!fs.existsSync(htmlPath)) {
    return null;
  }
  
  try {
    return fs.readFileSync(htmlPath, 'utf-8');
  } catch (e) {
    console.error(`Failed to load template HTML ${id}:`, e);
    return null;
  }
}

/**
 * Process template with config values
 */
export function processTemplate(html: string, config: GameConfig): string {
  const theme = THEME_COLORS[config.theme];
  const products = DMI_PRODUCTS.filter(p => config.products.includes(p.id));
  
  let processed = html
    .replace(/\{\{TITLE\}\}/g, config.title)
    .replace(/\{\{PRIMARY_COLOR\}\}/g, theme.primary)
    .replace(/\{\{SECONDARY_COLOR\}\}/g, theme.secondary)
    .replace(/\{\{BG_COLOR\}\}/g, theme.bg)
    .replace(/\{\{CTA_TEXT\}\}/g, config.ctaText)
    .replace(/\{\{CTA_URL\}\}/g, config.ctaUrl)
    .replace(/\{\{DIFFICULTY\}\}/g, config.difficulty.toString())
    .replace(/\{\{SHOW_BRANDING\}\}/g, config.showBranding.toString())
    .replace(/\{\{PRODUCTS_JSON\}\}/g, JSON.stringify(products.map(p => ({
      id: p.id,
      name: p.name,
      icon: p.icon
    }))));
  
  // Handle conditional branding block
  if (config.showBranding) {
    processed = processed
      .replace(/\{\{#SHOW_BRANDING\}\}/g, '')
      .replace(/\{\{\/SHOW_BRANDING\}\}/g, '');
  } else {
    // Remove the entire branding block
    processed = processed.replace(/\{\{#SHOW_BRANDING\}\}[\s\S]*?\{\{\/SHOW_BRANDING\}\}/g, '');
  }
  
  return processed;
}

/**
 * Generate game HTML from config (uses template system)
 */
export function generateGameHTML(config: GameConfig): string {
  const template = getTemplate(config.template);
  
  if (template) {
    return processTemplate(template.html, config);
  }
  
  // Fallback to inline generator if template not found
  return generateFallbackHTML(config);
}

/**
 * Fallback HTML generator (for backwards compatibility)
 */
function generateFallbackHTML(config: GameConfig): string {
  const theme = THEME_COLORS[config.theme];
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: ${theme.bg};
      color: white;
      font-family: Inter, system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    h1 { color: ${theme.primary}; }
    p { color: #888; }
  </style>
</head>
<body>
  <div>
    <h1>${config.title}</h1>
    <p>Template "${config.template}" not found.</p>
    <p>Please add the template to the /templates folder.</p>
  </div>
</body>
</html>`;
}

/**
 * Get categories from all templates
 */
export function getCategories(): string[] {
  const templates = getTemplateList();
  const categories = new Set(templates.map(t => t.category));
  return Array.from(categories).sort();
}
