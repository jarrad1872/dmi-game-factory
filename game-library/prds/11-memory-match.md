# PRD: Diamond Match - Memory Match Game

## Game Type
**Memory Match / Pairs Matching Puzzle**

## Reference Games

### Primary References
1. **Memory Game Classic** - https://apps.apple.com/us/app/memory-classic/id502626661
   - Screenshot: https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/8f/3d/1e/8f3d1e8c-8f0f-9c0e-3d0a-7e8f9c0d1e2f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp
   - Classic card flip mechanics with theme variations
   
2. **Memory Matches 2** - https://apps.apple.com/us/app/memory-matches-2/id500028364
   - Grid-based layout with timed challenges
   - Progressive difficulty levels
   
3. **Memorize: Picture Match** - https://apps.apple.com/us/app/memorize-picture-match-pair/id1506068682
   - Category-based matching (animals, objects, etc.)
   - Clean visual design with smooth animations

### Key Screenshots
- Card flip animation examples: https://i.ytimg.com/vi/bbb-XziV2gI/maxresdefault.jpg
- Grid layouts: https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd8emSGM40aQN3UNTn5zEbjlN2-qjEXfGH0K-lJPmx2V6Q
- Match celebration effects: https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/screenshots/memory-game-match.png

## Core Mechanics

### Primary Action
- **Tap to flip**: Player taps face-down cards to reveal them temporarily
- **Match pairs**: Find two identical cards to permanently reveal them
- **Memory challenge**: Cards flip back face-down if they don't match

### Win Conditions
- Match all pairs on the board
- Complete within time limit (optional difficulty mode)
- Achieve minimum star rating based on moves/time

### Fail Conditions
- Time runs out (timed mode)
- Exceed maximum allowed moves (challenge mode)
- Optional: 3-strike system for mismatches

### Progression System
- **Levels**: Increase grid size (4x3 → 4x4 → 5x4 → 6x5 → 6x6)
- **Difficulty Modes**: 
  - Casual: No time limit, unlimited moves
  - Standard: Generous time limit
  - Expert: Strict time, move limits, similar-looking cards
- **Stars**: 3-star system based on moves and time
  - 3 stars: Perfect/near-perfect completion
  - 2 stars: Good performance
  - 1 star: Completion (any)

### Game Loop
1. Grid of face-down cards presented
2. Player flips first card (stays visible)
3. Player flips second card
4. **Match**: Both cards stay revealed, particle effect, score +10
5. **No Match**: Both cards flip back after 1 second
6. Repeat until all pairs found
7. Victory screen with stats, stars, next level unlock

---

## DMI THEME CONCEPT: "Diamond Match - Tool Spec Memory"

### Creative Title
**"Diamond Match: Core Drill Master"**

### Theme Context
**Setting**: DMI Tools warehouse inventory management system

**Story Hook**: You're a new warehouse manager at DMI Tools, learning to quickly identify products, match tools to their specifications, and memorize the extensive catalog. Each level represents a different section of the warehouse or product category.

### Puzzle Elements

#### Card Content Types
**Set 1: Tool-to-Specification Matching**
- Match tool image to its key specification
  - Example: Core drill bit image ↔ "4.5\" diameter, wet cutting"
  - Example: Diamond blade image ↔ "14\" concrete blade, 1\" arbor"

**Set 2: Product-to-Application Matching**
- Match tool to its primary use case
  - Example: Vacuum brazed bit ↔ "Dry drilling granite countertops"
  - Example: Turbo blade ↔ "Fast cutting reinforced concrete"

**Set 3: Part Number Matching**
- Match product image to DMI part number
  - Example: Bit image ↔ "CB45000"
  - Example: Blade image ↔ "TB14125"

**Set 4: Tool Pairing (Complementary Products)**
- Match tools that work together
  - Example: Core bit ↔ Compatible drill rig
  - Example: Blade ↔ Appropriate saw type

**Set 5: Industry Terminology**
- Match technical terms to definitions
  - Example: "Vacuum Brazed" ↔ "Diamond bonding method for dry cutting"
  - Example: "Kerf Width" ↔ "Width of material removed by blade"

#### Visual Card Design
**Face-Down State**: 
- DMI logo with diamond pattern
- Metallic silver/blue gradient
- Subtle shimmer animation

**Face-Up State**:
- **Image cards**: High-quality product photography on white background
- **Text cards**: Clean typography on gradient background with icon
- Color coding by category:
  - Core bits: Blue border
  - Blades: Red border
  - Specifications: Green border
  - Applications: Orange border

### Progression & Educational Value

#### Level Structure
- **Levels 1-5**: Basic tools (6-8 pairs) - Common core bits and blades
- **Levels 6-10**: Specifications (8-12 pairs) - Match tools to specs
- **Levels 11-15**: Applications (10-14 pairs) - Match tools to jobs
- **Levels 16-20**: Part numbers (12-16 pairs) - Memorize catalog
- **Levels 21+**: Mixed categories, lookalike challenges

#### Educational Goals
1. **Product Recognition**: Learn to quickly identify DMI products visually
2. **Specification Retention**: Memorize key specs for common tools
3. **Application Knowledge**: Understand which tool for which job
4. **Catalog Familiarity**: Learn part numbering system
5. **Technical Vocabulary**: Master industry terminology

#### Progression Mechanics
- **Unlocks**: New product categories unlock every 5 levels
- **Daily Challenges**: Special themed sets (e.g., "Wet Cutting Week")
- **Achievements**: 
  - "Catalog Master" - Complete all part number levels
  - "Speed Demon" - Complete level in under 30 seconds
  - "Perfect Memory" - 3-star all levels in category
  - "Product Expert" - Match 100 specifications correctly

### Difficulty Scaling
- **Early levels**: Distinctly different tools (blade vs. bit)
- **Mid levels**: Similar categories (different blade types)
- **Late levels**: Subtle differences (same tool, different sizes)
- **Expert mode**: Similar-looking specs, part numbers with 1-digit differences

---

## Visual Style Recommendations

### Art Direction
**Industrial Professional with Game Polish**

#### Color Palette
- **Primary**: DMI Blue (#0047AB), Steel Gray (#71797E)
- **Accents**: Diamond Shimmer (silver/white), Safety Orange (#FF6600)
- **Backgrounds**: Warehouse concrete texture, subtle grid lines
- **UI**: Clean, modern with industrial metal textures

#### Typography
- **Headers**: Bold sans-serif (Montserrat Bold or similar)
- **Body**: Clean readable sans (Open Sans, Roboto)
- **Specs**: Monospace for technical details (Courier or Consolas)

#### Visual Elements
- **Card backs**: Brushed metal texture with DMI logo emboss
- **Card fronts**: White/light gray with subtle shadow, product-focused
- **Grid background**: Warehouse floor texture (concrete, subtle safety lines)
- **Particles**: Sparkling diamond dust effect on matches
- **UI chrome**: Industrial steel bezels, bolt accents

#### Animation Style
- **Card flips**: Smooth 3D rotation (0.3s duration)
- **Matches**: Quick scale pulse + diamond sparkle burst
- **Mismatches**: Subtle shake before flip back
- **Level complete**: Cards fly off screen, warehouse door opens to next level

### Reference Visual Style
- **UI**: Clean like "Monument Valley" but industrial
- **Product photos**: Crisp like Apple product pages
- **Background**: Subtle like "Mini Metro" warehouse aesthetic

---

## Technical Specifications (Phaser 3)

### Core Systems

#### 1. Card System
```javascript
class Card {
  constructor(scene, x, y, cardData, pairId) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, 'card_back');
    this.cardData = cardData; // {type: 'image|text', content: 'url|string', category: '...'}
    this.pairId = pairId; // Matching cards share same pairId
    this.isFlipped = false;
    this.isMatched = false;
    this.isLocked = false; // Prevent clicking during animations
  }
  
  flip(showFront) {
    if (this.isLocked || this.isMatched) return;
    this.isLocked = true;
    
    // 3D flip animation using scale tween
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: 0,
      duration: 150,
      onComplete: () => {
        this.sprite.setTexture(showFront ? this.cardData.content : 'card_back');
        this.scene.tweens.add({
          targets: this.sprite,
          scaleX: 1,
          duration: 150,
          onComplete: () => {
            this.isFlipped = showFront;
            this.isLocked = false;
          }
        });
      }
    });
  }
  
  setMatched() {
    this.isMatched = true;
    // Pulse and sparkle effect
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.1,
      duration: 200,
      yoyo: true,
      onComplete: () => {
        this.sprite.setAlpha(0.7); // Dim matched cards
      }
    });
    this.scene.playParticleEffect(this.sprite.x, this.sprite.y, 'diamond_sparkle');
  }
}
```

#### 2. Game Board Manager
```javascript
class MemoryBoard {
  constructor(scene, level) {
    this.scene = scene;
    this.level = level;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.startTime = Date.now();
    
    // Grid configuration based on level
    this.gridConfig = this.getGridConfig(level);
  }
  
  getGridConfig(level) {
    if (level <= 3) return {cols: 4, rows: 3, pairs: 6};
    if (level <= 7) return {cols: 4, rows: 4, pairs: 8};
    if (level <= 12) return {cols: 5, rows: 4, pairs: 10};
    if (level <= 18) return {cols: 6, rows: 4, pairs: 12};
    return {cols: 6, rows: 5, pairs: 15};
  }
  
  createBoard() {
    const {cols, rows, pairs} = this.gridConfig;
    const cardWidth = 120;
    const cardHeight = 160;
    const spacing = 20;
    const startX = (800 - (cols * (cardWidth + spacing))) / 2;
    const startY = 150;
    
    // Get card data for this level
    const cardData = this.getCardDataForLevel(this.level, pairs);
    
    // Create shuffled positions
    const positions = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push({
          x: startX + col * (cardWidth + spacing),
          y: startY + row * (cardHeight + spacing)
        });
      }
    }
    Phaser.Utils.Array.Shuffle(positions);
    
    // Create card pairs
    cardData.forEach((data, index) => {
      // Create two cards for each pair
      for (let i = 0; i < 2; i++) {
        const pos = positions.pop();
        const card = new Card(this.scene, pos.x, pos.y, data, index);
        card.sprite.setInteractive();
        card.sprite.on('pointerdown', () => this.onCardClick(card));
        this.cards.push(card);
      }
    });
  }
  
  onCardClick(card) {
    if (card.isFlipped || this.flippedCards.length >= 2) return;
    
    card.flip(true);
    this.flippedCards.push(card);
    
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.scene.updateMoveCounter(this.moves);
      this.checkMatch();
    }
  }
  
  checkMatch() {
    const [card1, card2] = this.flippedCards;
    
    this.scene.time.delayedCall(500, () => {
      if (card1.pairId === card2.pairId) {
        // Match!
        card1.setMatched();
        card2.setMatched();
        this.matchedPairs++;
        this.scene.sound.play('match_sound');
        
        if (this.matchedPairs === this.gridConfig.pairs) {
          this.scene.time.delayedCall(800, () => this.onLevelComplete());
        }
      } else {
        // No match
        card1.flip(false);
        card2.flip(false);
        this.scene.sound.play('mismatch_sound');
      }
      
      this.flippedCards = [];
    });
  }
  
  onLevelComplete() {
    const timeElapsed = Date.now() - this.startTime;
    const stars = this.calculateStars(this.moves, timeElapsed);
    this.scene.showVictoryScreen(this.moves, timeElapsed, stars);
  }
  
  calculateStars(moves, timeMs) {
    const timeSec = timeMs / 1000;
    const pairs = this.gridConfig.pairs;
    const perfectMoves = pairs; // Minimum possible moves
    const goodMoves = pairs * 1.5;
    const maxTime = pairs * 15; // 15 seconds per pair
    const goodTime = pairs * 10;
    
    // 3 stars: Great moves AND good time
    if (moves <= goodMoves && timeSec <= goodTime) return 3;
    // 2 stars: Decent performance
    if (moves <= perfectMoves * 2 && timeSec <= maxTime) return 2;
    // 1 star: Completed
    return 1;
  }
  
  getCardDataForLevel(level, pairs) {
    // Load appropriate card content based on level category
    const category = Math.floor((level - 1) / 5);
    return this.scene.cardDatabase.getRandomCards(category, pairs);
  }
}
```

#### 3. Card Database System
```javascript
class CardDatabase {
  constructor() {
    this.categories = {
      0: 'basic_tools',      // Levels 1-5: Visual tool recognition
      1: 'specifications',   // Levels 6-10: Tool-to-spec matching
      2: 'applications',     // Levels 11-15: Tool-to-use matching
      3: 'part_numbers',     // Levels 16-20: Catalog memorization
      4: 'mixed_challenge'   // Levels 21+: Everything mixed
    };
    
    this.cardSets = {
      basic_tools: [
        {type: 'image', content: 'core_bit_4_5', category: 'core_bits'},
        {type: 'image', content: 'diamond_blade_14', category: 'blades'},
        {type: 'image', content: 'hole_saw_6', category: 'hole_saws'},
        // ... load from JSON asset file
      ],
      specifications: [
        {type: 'image', content: 'core_bit_4_5', category: 'core_bits'},
        {type: 'text', content: '4.5" Wet Core Bit\n1.25" Arbor', category: 'specs'},
        // ... pairs of tools and their specs
      ],
      // ... other categories
    };
  }
  
  getRandomCards(category, count) {
    const categoryName = this.categories[category];
    const pool = this.cardSets[categoryName];
    return Phaser.Utils.Array.Shuffle([...pool]).slice(0, count);
  }
}
```

#### 4. Asset Requirements
```javascript
// Preload in boot scene
preload() {
  // Card textures
  this.load.image('card_back', 'assets/cards/card_back.png');
  
  // Product images (generated from DMI catalog)
  this.load.image('core_bit_4_5', 'assets/products/core_bit_4_5.png');
  this.load.image('diamond_blade_14', 'assets/products/blade_14.png');
  // ... ~50-100 product images
  
  // UI elements
  this.load.image('star_empty', 'assets/ui/star_empty.png');
  this.load.image('star_filled', 'assets/ui/star_filled.png');
  this.load.image('warehouse_bg', 'assets/backgrounds/warehouse.jpg');
  
  // Particle effects
  this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
  
  // Audio
  this.load.audio('card_flip', 'assets/audio/card_flip.mp3');
  this.load.audio('match_sound', 'assets/audio/match_chime.mp3');
  this.load.audio('mismatch_sound', 'assets/audio/mismatch_buzz.mp3');
  this.load.audio('victory', 'assets/audio/level_complete.mp3');
  
  // Data
  this.load.json('card_database', 'assets/data/card_database.json');
}
```

### Performance Considerations
- **Memory**: Preload only cards for current level category (5-10 levels worth)
- **Lazy loading**: Load next category when player reaches level X-2
- **Texture atlases**: Combine small UI elements into single atlas
- **Card generation**: Use canvas to generate text cards dynamically
- **Particle pooling**: Reuse particle emitters for match effects

### Mobile Optimization
- **Touch targets**: Minimum 100x100px tap area
- **Responsive grid**: Adjust card size and spacing based on screen size
- **Orientation**: Support both portrait and landscape
- **Performance**: Target 60fps on mid-range devices (iPhone 8+, Android equivalent)

---

## PRD Summary

**Diamond Match: Core Drill Master** is a memory matching game that transforms DMI Tools' product catalog into an engaging educational experience. Players take on the role of a warehouse manager learning to quickly identify and memorize hundreds of diamond tools, their specifications, and applications.

The game leverages the proven addictive loop of memory match games—flip, match, win—while integrating real product knowledge. Each level introduces players to different aspects of DMI's catalog: from visual tool recognition in early levels, to specification matching in mid-game, to part number memorization in advanced stages. The progression is carefully designed to reinforce learning through repetition while keeping gameplay fresh with new categories and increasing difficulty.

Built on Phaser 3, the game features smooth card-flip animations, satisfying match effects, and an industrial-polished visual style that reflects DMI's brand. The modular card database system allows for easy content updates and the addition of new product lines. With 30+ levels, daily challenges, and achievement systems, Diamond Match provides dozens of hours of gameplay while turning employees and customers into product experts. The 3-star rating system and timed challenges add competitive elements that encourage replay and mastery, making product training feel less like work and more like an engaging puzzle challenge.

---

## Development Checklist

### Phase 1: Core Mechanics (Week 1-2)
- [ ] Implement Card class with flip animations
- [ ] Build MemoryBoard grid system
- [ ] Match detection logic
- [ ] Basic UI (moves counter, timer)
- [ ] Victory condition and basic completion screen

### Phase 2: Content & Progression (Week 3)
- [ ] Create CardDatabase system
- [ ] Design and export 50+ product card images
- [ ] Build level progression system
- [ ] Implement star rating calculation
- [ ] Level selection screen

### Phase 3: Polish & Features (Week 4)
- [ ] Particle effects for matches
- [ ] Sound design and audio implementation
- [ ] Daily challenge system
- [ ] Achievement tracking
- [ ] Settings (sound, difficulty modes)

### Phase 4: Testing & Balance (Week 5)
- [ ] Difficulty balancing (star thresholds, time limits)
- [ ] Performance optimization
- [ ] Educational effectiveness testing
- [ ] Bug fixes and edge cases
- [ ] Analytics integration

---

**Target Launch**: 5 weeks from kickoff
**Team Size**: 1 developer, 1 designer (part-time)
**Estimated Playtime**: 8-12 hours to complete all levels, infinite replayability with daily challenges
