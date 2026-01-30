# DMI Game Factory - IDE Upgrade Status

## 🤖 AI Game Builder (NEW!)

The killer feature: **Non-coders can build games by describing what they want.**

### How It Works
1. Open any game in the editor
2. Switch to "🤖 AI Code" tab
3. Choose your agent: **Opus 4.5** (quality) or **Kimi K2** (fast)
4. Describe what you want: "Make the player faster", "Add power-ups", etc.
5. Click **Build** (or Cmd+Enter)
6. Watch the AI modify your game in real-time!

### Agent Options
| Agent | Best For | Speed | Quality |
|-------|----------|-------|---------|
| 🧠 Claude Opus 4.5 | Complex features, new mechanics | Slower | Highest |
| ⚡ Kimi K2 | Quick edits, simple changes | Fast | Good |

### Example Prompts
- "Make the player move 50% faster"
- "Add a power-up that doubles score for 5 seconds"
- "Change the theme to neon cyberpunk colors"
- "Add particle effects when collecting items"
- "Create a combo system for consecutive matches"
- "Add screen shake when player dies"

### API Endpoint
`POST /api/agent`
```json
{
  "prompt": "Make the obstacles spawn faster",
  "currentCode": "<full HTML>",
  "config": { /* GameConfig */ },
  "model": "opus" | "kimi"
}
```

Returns:
```json
{
  "code": "<modified HTML>",
  "status": "success",
  "message": "⚡ Kimi: Increased spawn rate by 30%!",
  "tokensUsed": 800
}
```

### Clawdbot Integration
Set these environment variables to connect to full AI capabilities:
- `CLAWDBOT_API_URL` - Clawdbot API endpoint
- `CLAWDBOT_API_TOKEN` - Authentication token

Without these, the factory runs in demo mode with simple pattern-based modifications.

---

## ✅ Completed Features

### 1. Monaco Code Editor (✅ Done)
- Full Monaco Editor integration with `@monaco-editor/react`
- Custom "dmi-dark" theme matching the factory aesthetic
- Syntax highlighting for HTML, CSS, and JavaScript
- Real-time preview updates as you type
- Keyboard shortcuts (Ctrl+S to save, Shift+Alt+F to format)
- Auto-save to local storage with debouncing
- Split view: code editor on left, live preview on right

### 2. Extensible Template System (✅ Done)
- File-based templates in `/templates/` directory
- Each template folder contains:
  - `template.json` - Metadata (name, description, icon, category, features, tags)
  - `game.html` - Complete game source code
- Templates auto-discovered from folder structure
- API endpoint at `/api/templates` to list and fetch templates
- Template processing with variable substitution

### 3. Template Gallery (✅ Done)
- New `/gallery` page showing all available templates
- Grid layout with template cards
- Category filtering (arcade, puzzle, etc.)
- Search functionality
- "View Code" modal to preview template source
- "Use Template" button to create new project from template
- Difficulty badges and feature lists

### 4. Editor Tabs (✅ Done)
- Config mode: Original visual configuration editor
- Code mode: Full Monaco code editor
- Tab switching in header: ⚙️ Config | 💻 Code
- Both modes share the same preview system
- "Reset" button to restore original template code

### 5. Export Improvements (✅ Done)
- Export dropdown menu with options:
  - 📄 Download HTML - Single file export
  - 📦 Download ZIP - With README and separate files
  - 🔗 Copy Embed Code - For iframe embedding
- Exports work from both config and code modes
- Code changes are preserved in exports

## 📁 New Files Created

```
dmi-game-factory/
├── templates/
│   ├── flappy/
│   │   ├── template.json
│   │   └── game.html (15KB - complete Phaser game)
│   ├── runner/
│   │   ├── template.json
│   │   └── game.html (14KB - complete Phaser game)
│   └── match3/
│       ├── template.json
│       └── game.html (18KB - complete Phaser game)
├── app/
│   ├── gallery/
│   │   └── page.tsx (Template gallery page)
│   └── api/
│       ├── agent/
│       │   └── route.ts (AI Agent API - Clawdbot integration)
│       └── templates/
│           └── route.ts (Template API)
├── components/
│   ├── AIAgentPanel.tsx (AI builder UI with agent selector)
│   ├── CodeEditor.tsx (Monaco wrapper)
│   └── CodePreviewPane.tsx (Live preview for code mode)
└── lib/
    └── templates.ts (Template utilities)
```

## 🔧 Modified Files

- `app/editor/[id]/page.tsx` - Added tabs, code editor mode
- `app/dashboard/page.tsx` - Added gallery link, template parameter handling
- `app/api/preview/route.ts` - Support for code-based preview
- `app/api/export/route.ts` - ZIP export, code export support
- `components/CreateBuildModal.tsx` - Accept defaultTemplate prop
- `lib/types.ts` - Added code field to GameBuild
- `package.json` - Added @monaco-editor/react, jszip, file-saver

## 🎮 Available Templates

| Template | Category | Difficulty | Description |
|----------|----------|------------|-------------|
| 🐦 Flappy Clone | Arcade | Easy | Classic tap-to-fly game |
| 🏃 Endless Runner | Arcade | Easy | Side-scrolling jump game |
| 💎 Match-3 Puzzle | Puzzle | Medium | Tile-matching strategy |

## 🚀 How to Use

### Config Mode (Default)
1. Create new game from dashboard
2. Use visual configuration panel
3. Select template, customize colors, add products
4. Preview updates automatically

### Code Mode (New!)
1. Click "💻 Code" tab in editor
2. Edit HTML/CSS/JavaScript directly
3. Preview updates in real-time
4. Save changes (auto-save or Ctrl+S)
5. Export as HTML or ZIP

### Template Gallery
1. Click "🎨 Gallery" from dashboard
2. Browse templates by category
3. Search by name or tags
4. "View Code" to see source
5. "Use Template" to start new project

## 📝 Template Variables

Templates support these placeholders:
- `{{TITLE}}` - Game title
- `{{PRIMARY_COLOR}}` - Theme primary color
- `{{SECONDARY_COLOR}}` - Theme secondary color
- `{{BG_COLOR}}` - Background color
- `{{CTA_TEXT}}` - Call-to-action button text
- `{{CTA_URL}}` - Call-to-action URL
- `{{DIFFICULTY}}` - Game difficulty (1-10)
- `{{SHOW_BRANDING}}` - Show DMI branding (true/false)
- `{{PRODUCTS_JSON}}` - JSON array of selected products
- `{{#SHOW_BRANDING}}...{{/SHOW_BRANDING}}` - Conditional blocks

## 🔜 Future Enhancements

- [ ] Multi-file editing (separate HTML/CSS/JS tabs)
- [ ] Template upload/creation UI
- [ ] Version control for code changes
- [ ] Collaboration features
- [ ] More template categories (idle, educational, action)
- [ ] Asset library integration
- [ ] Performance analytics

---

*Last updated: $(date)*
*Deployed to: factory.dmitools.com (via Vercel)*
