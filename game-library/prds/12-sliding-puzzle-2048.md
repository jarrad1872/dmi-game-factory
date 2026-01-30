# PRD: Diamond Merge - 2048 Sliding Puzzle

## Game Type
**Sliding Puzzle / Merge Mechanics (2048-style)**

## Reference Games

### Primary References
1. **2048** (Original by Gabriele Cirulli) - https://play2048.co/
   - Screenshot: https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/c9/70/9f/c9709f8c-8f0f-11eb-2f0a-3d8f9c0d1e2f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp
   - Grid: 4x4, swipe to merge tiles, exponential progression
   - Gameplay: https://play2048.co/
   
2. **Threes!** - https://apps.apple.com/us/app/threes/id779157948
   - More strategic variant with 1+2=3 mechanic
   - Personality-driven tile design
   
3. **2048 Variants** - https://2048game.com/variations/
   - Shows successful theming (Doge 2048, Flappy 2048, etc.)
   - Demonstrates adaptability of core mechanic

### Key Screenshots
- 2048 gameplay: https://lh3.googleusercontent.com/NXyFP-XMCX-JT8TzLl8JHqf0cPOGnRGFdCB0M-U_6A=s360
- Grid animations: https://i.imgur.com/qaK3Tjl.gif
- Merge effects: https://i.imgur.com/merge-animation.gif

## Core Mechanics

### Primary Action
- **Swipe/Arrow keys**: Slide all tiles in one of four directions (up, down, left, right)
- **Merge on collision**: When two identical tiles collide, they merge into the next tier
- **New tile spawns**: After each move, a new starting-tier tile appears in random empty space

### Win Conditions
- Reach the target tile (traditionally 2048, thematically "Diamond Master Drill Rig")
- Optional: Continue playing past win to achieve higher scores
- Challenge mode: Reach target in minimum moves

### Fail Conditions
- **Grid full**: No empty spaces and no valid merges available
- **No moves possible**: All adjacent tiles are different (rare in 2048)

### Progression System
- **Single endless game** (traditional 2048 style)
- **Score**: Sum of all merge values
- **High score tracking**
- **Level-based variant**: 
  - Level 1-5: 3x3 grid, target = 256-tier
  - Level 6-10: 4x4 grid, target = 1024-tier
  - Level 11+: 4x4 grid, target = 2048-tier and beyond
  - Level 16+: 5x5 grid, harder spawn rates

### Game Loop
1. Player swipes direction
2. All tiles slide to edge (with physics/animation)
3. Matching adjacent tiles merge
4. Score increases by merge value
5. New tile spawns in random empty cell
6. Check win/loss conditions
7. Repeat until grid full or target reached

---

## DMI THEME CONCEPT: "Diamond Merge - Build Your Drill Rig"

### Creative Title
**"Diamond Merge: Rig Builder"**

### Theme Context
**Setting**: DMI product evolution timeline / manufacturing assembly line

**Story Hook**: Start with basic diamond grit and progressively merge components to build increasingly powerful core drilling systems. Watch your tools evolve from raw materials through manufacturing stages to complete professional-grade drill rigs. Each merge represents a step in DMI's product development and assembly process.

### Puzzle Elements

#### Tile Progression (Powers of 2 → Tool Evolution)
Traditional 2048 uses: 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 → 512 → 1024 → 2048

**DMI Diamond Merge Evolution**:
1. **2**: Diamond Grit (raw material)
2. **4**: Diamond Segment (grit + bond matrix)
3. **8**: Segment Array (multiple segments)
4. **16**: Core Bit Head (segments on steel core)
5. **32**: Complete Core Bit (4.5" entry-level)
6. **64**: Professional Core Bit (6" wet)
7. **128**: Diamond Blade (14" turbo)
8. **256**: Premium Blade Kit (blade + accessories)
9. **512**: Hand-held Core Drill (portable rig)
10. **1024**: Stand-mounted Core Drill (professional rig)
11. **2048**: **Ultimate Drill Rig** (complete DMI system)
12. **4096+**: Bonus tiers: Multi-head system, complete jobsite setup

#### Visual Tile Design
Each tile shows:
- **Product illustration**: Evolving from particle → component → tool → system
- **Tier number**: Subtle, in corner (or use DMI part prefix)
- **Color coding**: 
  - 2-8: Raw materials (gray/silver gradient)
  - 16-64: Individual tools (blue gradient, DMI brand color)
  - 128-512: Tool systems (orange/red gradient, power tools)
  - 1024-2048: Complete rigs (gold/premium gradient)
  - 4096+: Rainbow/prismatic (legendary tier)

#### Tile Animations
- **Spawn**: Materialize with diamond dust sparkle
- **Slide**: Smooth physics-based movement with slight trail
- **Merge**: 
  1. Tiles collide and overlap
  2. Flash of light + welding spark effect
  3. Transform/morph into next tier product
  4. Scale pulse for emphasis
- **Special merges** (512+): Camera shake, dramatic flash

### Progression & Educational Value

#### Educational Goals
1. **Product Hierarchy**: Learn how DMI products build on each other
2. **Manufacturing Process**: Understand diamond tool assembly steps
3. **Product Families**: See relationships between bits, blades, and rigs
4. **Value Progression**: Grasp the escalating value from grit to complete systems
5. **Strategic Thinking**: Plan moves ahead to create efficient merges

#### Difficulty Variants
- **Classic Mode**: Standard 4x4 grid, play to 2048
- **Quick Play**: 3x3 grid, play to 512 (5-10 minute games)
- **Endurance**: 5x5 grid, see how high you can build
- **Time Attack**: Reach 1024 in under 5 minutes
- **Limited Moves**: Reach 512 in 100 moves or less

#### Achievements
- "From Dust to Diamond" - Create your first 2048 tile
- "Efficiency Expert" - Reach 1024 in under 150 moves
- "Product Line Master" - Unlock all 12 base tiers
- "Legendary Builder" - Reach 4096 tier
- "No Wasted Moves" - Complete game with 95%+ merge efficiency

### Educational Overlays
- **First time creating each tier**: Brief tooltip explaining the product
  - Example: "Core Bit (32) - Used for drilling precise holes in concrete and stone. Requires water cooling for optimal performance."
- **Pause menu**: Product catalog showing all unlocked tiers with specs
- **End screen**: Show what products you created during the game

---

## Visual Style Recommendations

### Art Direction
**Industrial Evolution with Satisfying Physics**

#### Color Palette
- **Base grid**: Dark steel gray (#2C3E50) with lighter grid lines
- **Tile colors**: Gradient from raw (gray) → professional (blue) → premium (gold)
- **Accents**: DMI blue, safety orange, diamond white sparkles
- **Background**: Subtle warehouse or factory floor texture

#### Typography
- **Tile numbers**: Bold, clean sans-serif (Montserrat Black)
- **Tile labels**: Smaller product name below number
- **Score**: Large, clear LED/digital style font
- **UI**: Industrial sans-serif (Roboto, Open Sans)

#### Visual Elements
- **Tiles**: Rounded corners, subtle depth/shadow, product illustrations
- **Grid**: Inset shadow, metal texture background
- **Merge effect**: Welding sparks, diamond particle burst
- **Background**: Animated conveyor belt or assembly line (subtle, not distracting)
- **UI chrome**: Industrial panels, rivets, metal textures

#### Animation Style
- **Tile movement**: Smooth easing with slight overshoot on stop
- **Merges**: Impact flash + particle explosion + scale bounce
- **New tile spawn**: Fade + scale up from 0.5 to 1.0
- **Victory**: Tiles explode outward, confetti of diamond dust

### Reference Visual Style
- **Tile design**: Clean like original 2048 but with product illustrations
- **Polish**: Juicy animations like "Threes!" (personality in movement)
- **Industrial theme**: Metal textures like "Machinarium"

---

## Technical Specifications (Phaser 3)

### Core Systems

#### 1. Grid Manager
```javascript
class GridManager {
  constructor(scene, gridSize = 4) {
    this.scene = scene;
    this.gridSize = gridSize;
    this.grid = this.createEmptyGrid();
    this.tileSize = 100;
    this.tileSpacing = 10;
    this.scoreManager = new ScoreManager();
  }
  
  createEmptyGrid() {
    const grid = [];
    for (let row = 0; row < this.gridSize; row++) {
      grid[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        grid[row][col] = null;
      }
    }
    return grid;
  }
  
  addRandomTile() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length === 0) return false;
    
    const {row, col} = Phaser.Utils.Array.GetRandom(emptyCells);
    const value = Math.random() < 0.9 ? 2 : 4; // 90% spawn as 2, 10% as 4
    const tile = new Tile(this.scene, row, col, value);
    this.grid[row][col] = tile;
    
    tile.spawn(); // Animation
    return true;
  }
  
  getEmptyCells() {
    const empty = [];
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col] === null) {
          empty.push({row, col});
        }
      }
    }
    return empty;
  }
  
  move(direction) {
    // direction: 'up', 'down', 'left', 'right'
    let moved = false;
    let mergeOccurred = false;
    
    const vectors = {
      up: {row: -1, col: 0},
      down: {row: 1, col: 0},
      left: {row: 0, col: -1},
      right: {row: 0, col: 1}
    };
    
    const vector = vectors[direction];
    const traversals = this.buildTraversals(direction);
    
    // Clear merge flags
    this.clearMergeFlags();
    
    // Traverse grid in direction of movement
    traversals.rows.forEach(row => {
      traversals.cols.forEach(col => {
        const tile = this.grid[row][col];
        if (tile) {
          const positions = this.findFarthestPosition({row, col}, vector);
          const next = this.grid[positions.next.row]?.[positions.next.col];
          
          // Can merge with next tile?
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(this.scene, positions.next.row, positions.next.col, tile.value * 2);
            merged.mergedFrom = [tile, next];
            
            this.grid[positions.next.row][positions.next.col] = merged;
            this.grid[row][col] = null;
            
            tile.moveTo(positions.next.row, positions.next.col);
            merged.mergeAnimation();
            
            this.scoreManager.addScore(merged.value);
            mergeOccurred = true;
            moved = true;
            
          } else {
            // Just move
            if (positions.farthest.row !== row || positions.farthest.col !== col) {
              this.grid[positions.farthest.row][positions.farthest.col] = tile;
              this.grid[row][col] = null;
              tile.moveTo(positions.farthest.row, positions.farthest.col);
              moved = true;
            }
          }
        }
      });
    });
    
    if (moved) {
      this.addRandomTile();
      if (this.isGameOver()) {
        this.scene.showGameOver();
      } else if (this.hasWon()) {
        this.scene.showVictory();
      }
    }
    
    return moved;
  }
  
  buildTraversals(direction) {
    const rows = [];
    const cols = [];
    
    for (let i = 0; i < this.gridSize; i++) {
      rows.push(i);
      cols.push(i);
    }
    
    // Reverse order for right/down to process from edge
    if (direction === 'right') cols.reverse();
    if (direction === 'down') rows.reverse();
    
    return {rows, cols};
  }
  
  findFarthestPosition(cell, vector) {
    let previous;
    do {
      previous = cell;
      cell = {
        row: previous.row + vector.row,
        col: previous.col + vector.col
      };
    } while (this.withinBounds(cell) && this.cellAvailable(cell));
    
    return {
      farthest: previous,
      next: cell
    };
  }
  
  withinBounds(cell) {
    return cell.row >= 0 && cell.row < this.gridSize &&
           cell.col >= 0 && cell.col < this.gridSize;
  }
  
  cellAvailable(cell) {
    return !this.grid[cell.row][cell.col];
  }
  
  clearMergeFlags() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col]) {
          this.grid[row][col].mergedFrom = null;
        }
      }
    }
  }
  
  isGameOver() {
    // Any empty cells?
    if (this.getEmptyCells().length > 0) return false;
    
    // Any possible merges?
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const tile = this.grid[row][col];
        if (!tile) continue;
        
        // Check all four directions
        const neighbors = [
          {row: row - 1, col},
          {row: row + 1, col},
          {row, col: col - 1},
          {row, col: col + 1}
        ];
        
        for (let neighbor of neighbors) {
          if (this.withinBounds(neighbor)) {
            const otherTile = this.grid[neighbor.row][neighbor.col];
            if (otherTile && otherTile.value === tile.value) {
              return false; // Merge possible!
            }
          }
        }
      }
    }
    
    return true; // No moves available
  }
  
  hasWon() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const tile = this.grid[row][col];
        if (tile && tile.value >= 2048) return true;
      }
    }
    return false;
  }
}
```

#### 2. Tile Class
```javascript
class Tile {
  constructor(scene, row, col, value) {
    this.scene = scene;
    this.row = row;
    this.col = col;
    this.value = value;
    this.mergedFrom = null;
    
    const pos = this.getPosition(row, col);
    
    // Container for tile
    this.container = scene.add.container(pos.x, pos.y);
    
    // Background
    this.bg = scene.add.rectangle(0, 0, 100, 100, this.getColor(value));
    this.bg.setStrokeStyle(2, 0xffffff, 0.3);
    
    // Product image
    this.sprite = scene.add.sprite(0, -10, this.getProductImage(value));
    this.sprite.setScale(0.6);
    
    // Value text
    this.text = scene.add.text(0, 35, value, {
      fontSize: '18px',
      fontFamily: 'Montserrat, Arial',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Product label
    this.label = scene.add.text(0, 48, this.getProductName(value), {
      fontSize: '9px',
      fontFamily: 'Arial',
      color: '#ffffff',
      alpha: 0.8
    }).setOrigin(0.5);
    
    this.container.add([this.bg, this.sprite, this.text, this.label]);
  }
  
  getPosition(row, col) {
    const tileSize = 100;
    const spacing = 10;
    const gridStartX = 250;
    const gridStartY = 150;
    
    return {
      x: gridStartX + col * (tileSize + spacing) + tileSize / 2,
      y: gridStartY + row * (tileSize + spacing) + tileSize / 2
    };
  }
  
  getColor(value) {
    const colors = {
      2: 0x7F8C8D,     // Diamond Grit - gray
      4: 0x95A5A6,     // Diamond Segment - light gray
      8: 0xBDC3C7,     // Segment Array - lighter gray
      16: 0x3498DB,    // Core Bit Head - DMI blue
      32: 0x2980B9,    // Complete Core Bit - darker blue
      64: 0x1ABC9C,    // Professional Bit - teal
      128: 0xE74C3C,   // Diamond Blade - red
      256: 0xC0392B,   // Premium Blade Kit - dark red
      512: 0xF39C12,   // Hand-held Drill - orange
      1024: 0xE67E22,  // Stand-mounted Drill - dark orange
      2048: 0xF1C40F,  // Ultimate Rig - gold
      4096: 0xD4AF37   // Multi-system - rich gold
    };
    return colors[value] || 0x2C3E50;
  }
  
  getProductImage(value) {
    const images = {
      2: 'grit',
      4: 'segment',
      8: 'segment_array',
      16: 'bit_head',
      32: 'core_bit_4',
      64: 'core_bit_6',
      128: 'blade_14',
      256: 'blade_kit',
      512: 'handheld_drill',
      1024: 'stand_drill',
      2048: 'ultimate_rig',
      4096: 'multi_system'
    };
    return images[value] || 'grit';
  }
  
  getProductName(value) {
    const names = {
      2: 'Grit',
      4: 'Segment',
      8: 'Array',
      16: 'Bit Head',
      32: '4.5" Bit',
      64: '6" Bit',
      128: '14" Blade',
      256: 'Blade Kit',
      512: 'Handheld',
      1024: 'Stand Drill',
      2048: 'ULTIMATE',
      4096: 'LEGENDARY'
    };
    return names[value] || '';
  }
  
  spawn() {
    this.container.setScale(0);
    this.scene.tweens.add({
      targets: this.container,
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut'
    });
  }
  
  moveTo(row, col) {
    this.row = row;
    this.col = col;
    const pos = this.getPosition(row, col);
    
    this.scene.tweens.add({
      targets: this.container,
      x: pos.x,
      y: pos.y,
      duration: 150,
      ease: 'Quad.easeOut'
    });
  }
  
  mergeAnimation() {
    // Flash effect
    this.scene.tweens.add({
      targets: this.bg,
      alpha: 0.3,
      duration: 100,
      yoyo: true
    });
    
    // Scale pulse
    this.scene.tweens.add({
      targets: this.container,
      scale: 1.15,
      duration: 150,
      yoyo: true,
      ease: 'Quad.easeOut'
    });
    
    // Particle effect
    this.scene.playParticleEffect(this.container.x, this.container.y, 'merge_sparks');
    
    // Sound
    this.scene.sound.play('merge_sound', {volume: 0.5});
    
    // Special effects for high-value merges
    if (this.value >= 512) {
      this.scene.cameras.main.shake(100, 0.005);
    }
  }
  
  destroy() {
    this.container.destroy();
  }
}
```

#### 3. Input Handler
```javascript
class InputHandler {
  constructor(scene, gridManager) {
    this.scene = scene;
    this.gridManager = gridManager;
    this.isProcessing = false;
    
    // Keyboard
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    
    // Swipe detection
    this.swipe = new SwipeDetector(scene);
    this.swipe.on('swipe', (direction) => this.handleMove(direction));
    
    // Listen for key presses
    scene.input.keyboard.on('keydown', (event) => {
      if (this.isProcessing) return;
      
      if (this.cursors.up.isDown || this.wasd.up.isDown) this.handleMove('up');
      else if (this.cursors.down.isDown || this.wasd.down.isDown) this.handleMove('down');
      else if (this.cursors.left.isDown || this.wasd.left.isDown) this.handleMove('left');
      else if (this.cursors.right.isDown || this.wasd.right.isDown) this.handleMove('right');
    });
  }
  
  handleMove(direction) {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    const moved = this.gridManager.move(direction);
    
    // Wait for animations to complete
    this.scene.time.delayedCall(200, () => {
      this.isProcessing = false;
    });
  }
}

class SwipeDetector extends Phaser.Events.EventEmitter {
  constructor(scene) {
    super();
    this.scene = scene;
    this.startX = 0;
    this.startY = 0;
    this.threshold = 50; // Minimum swipe distance
    
    scene.input.on('pointerdown', (pointer) => {
      this.startX = pointer.x;
      this.startY = pointer.y;
    });
    
    scene.input.on('pointerup', (pointer) => {
      const deltaX = pointer.x - this.startX;
      const deltaY = pointer.y - this.startY;
      
      if (Math.abs(deltaX) > this.threshold || Math.abs(deltaY) > this.threshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          this.emit('swipe', deltaX > 0 ? 'right' : 'left');
        } else {
          // Vertical swipe
          this.emit('swipe', deltaY > 0 ? 'down' : 'up');
        }
      }
    });
  }
}
```

#### 4. Score Manager
```javascript
class ScoreManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.highScore = this.loadHighScore();
    this.moves = 0;
    
    this.scoreText = scene.add.text(650, 50, '0', {
      fontSize: '48px',
      fontFamily: 'Montserrat',
      fontStyle: 'bold',
      color: '#ffffff'
    });
    
    this.highScoreText = scene.add.text(650, 110, `Best: ${this.highScore}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#95a5a6'
    });
    
    scene.add.text(650, 20, 'SCORE', {
      fontSize: '14px',
      color: '#7f8c8d'
    });
  }
  
  addScore(points) {
    this.score += points;
    this.updateDisplay();
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }
  
  updateDisplay() {
    this.scoreText.setText(this.score);
    this.highScoreText.setText(`Best: ${this.highScore}`);
    
    // Pulse animation
    this.scene.tweens.add({
      targets: this.scoreText,
      scale: 1.1,
      duration: 100,
      yoyo: true
    });
  }
  
  loadHighScore() {
    return parseInt(localStorage.getItem('diamondMerge_highScore') || '0');
  }
  
  saveHighScore() {
    localStorage.setItem('diamondMerge_highScore', this.highScore.toString());
  }
}
```

### Asset Requirements
```javascript
preload() {
  // Product images (12 tiers)
  this.load.image('grit', 'assets/products/diamond_grit.png');
  this.load.image('segment', 'assets/products/diamond_segment.png');
  this.load.image('segment_array', 'assets/products/segment_array.png');
  this.load.image('bit_head', 'assets/products/bit_head.png');
  this.load.image('core_bit_4', 'assets/products/core_bit_4_5.png');
  this.load.image('core_bit_6', 'assets/products/core_bit_6.png');
  this.load.image('blade_14', 'assets/products/blade_14.png');
  this.load.image('blade_kit', 'assets/products/blade_kit.png');
  this.load.image('handheld_drill', 'assets/products/handheld_drill.png');
  this.load.image('stand_drill', 'assets/products/stand_drill.png');
  this.load.image('ultimate_rig', 'assets/products/ultimate_rig.png');
  this.load.image('multi_system', 'assets/products/multi_system.png');
  
  // Background
  this.load.image('warehouse_bg', 'assets/backgrounds/warehouse_floor.jpg');
  this.load.image('grid_bg', 'assets/ui/grid_background.png');
  
  // Particles
  this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
  
  // Audio
  this.load.audio('slide', 'assets/audio/tile_slide.mp3');
  this.load.audio('merge_sound', 'assets/audio/merge_welding.mp3');
  this.load.audio('spawn', 'assets/audio/tile_spawn.mp3');
  this.load.audio('game_over', 'assets/audio/game_over.mp3');
  this.load.audio('victory', 'assets/audio/victory_fanfare.mp3');
}
```

### Performance Considerations
- **Tween pooling**: Reuse tween objects for tile movements
- **Particle pooling**: Single emitter for all merge effects
- **Container optimization**: Use Phaser containers for tile grouping
- **Mobile**: Target 60fps on iPhone 8+ equivalent

---

## PRD Summary

**Diamond Merge: Rig Builder** adapts the addictive 2048 formula into an educational journey through DMI's product ecosystem. Players start with raw diamond grit and progressively merge components to build increasingly sophisticated core drilling systems, culminating in the ultimate professional drill rig at the 2048 tile.

The game's genius lies in its simplicity—swipe, merge, repeat—while subtly teaching product relationships and manufacturing progression. Each tile merge represents a step in DMI's product development: from raw materials to segments, from segments to complete bits, from bits to blades, and from individual tools to complete drilling systems. The visual evolution keeps players engaged as they watch their basic components transform into premium equipment.

Built on Phaser 3 with smooth physics-based sliding and satisfying merge animations (complete with welding sparks and camera shake for high-value merges), the game offers multiple modes from quick 3x3 games to endless 5x5 endurance runs. The educational overlay system provides just-in-time product information when players first create each tier, turning gameplay into passive learning. With score tracking, achievement systems, and the inherent "one more game" replayability of 2048, Diamond Merge provides hundreds of replays while embedding DMI's product hierarchy into players' minds through pure pattern recognition and repetition.

---

## Development Checklist

### Phase 1: Core Mechanics (Week 1)
- [ ] Implement GridManager with movement and merge logic
- [ ] Build Tile class with animations
- [ ] Input handling (keyboard + swipe)
- [ ] Score tracking system

### Phase 2: Content & Visuals (Week 2)
- [ ] Design and create 12 product tier images
- [ ] Implement tile color/design system
- [ ] Particle effects for merges
- [ ] Background and UI chrome

### Phase 3: Game Modes & Features (Week 3)
- [ ] Multiple grid sizes (3x3, 4x4, 5x5)
- [ ] Game mode selection (Classic, Time Attack, Limited Moves)
- [ ] Educational tooltips on first tier unlock
- [ ] Product catalog view (pause menu)

### Phase 4: Polish & Launch (Week 4)
- [ ] Sound design and implementation
- [ ] Victory/game over screens with product showcase
- [ ] Achievement system
- [ ] High score leaderboard
- [ ] Analytics and balance tuning

---

**Target Launch**: 4 weeks from kickoff
**Team Size**: 1 developer, 1 designer (part-time)
**Estimated Playtime**: Infinite replayability, average session 10-15 minutes
