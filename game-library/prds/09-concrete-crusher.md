# Game PRD #9: Concrete Crusher (Brick Breaker / Breakout Style)

## Reference Games

**Primary Reference: Breakout (Atari) / Arkanoid (Taito)**
- Classic paddle + ball brick breaking gameplay
- Arkanoid screenshot: https://en.wikipedia.org/wiki/Arkanoid
- Modern reference: Breakout: Recharged

**Similar Games:**
- Arkanoid - Power-ups and enemy obstacles
- Breakout - Original simple formula
- Peggle - Physics-based ball/peg clearing
- Brick Breaker series - Various mobile implementations
- BBtan / Ballz - Modern swipe-to-aim variants

## Core Mechanics

### Primary Action
- **Paddle Control**: Move paddle left/right to keep ball in play
- **Ball Deflection**: Ball bounces off paddle at angles based on hit position
- **Brick Destruction**: Ball destroys bricks on contact
- **Ball Physics**: Ball obeys reflection physics (angle in = angle out)
- **Multi-ball**: Some power-ups add additional balls

### Win/Fail Conditions
**Win Conditions:**
- Clear all destructible bricks from level
- Progress through level sequence (typically 20-50+ levels)
- Achieve high score through combos and bonuses
- Complete level set challenges

**Fail Conditions:**
- Ball falls below paddle (lose life)
- All lives lost (game over)
- Timer runs out (if time-based mode)

### Progression System
- Level-based progression (increasing complexity)
- Lives system (typically 3-5 lives)
- Score accumulation across levels
- Star rating per level (1-3 stars based on performance)
- Unlockable paddles/balls with special abilities
- Power-up upgrades

### Difficulty Curve
- More bricks per level
- Stronger bricks (multi-hit required)
- Indestructible obstacles
- Moving bricks/obstacles
- Faster ball speeds
- Complex brick layouts
- Enemy obstacles that interfere

## DMI THEME CONCEPT: "CONCRETE CRUSHER"

### Creative Title
**"Concrete Crusher: Diamond Blade Breaker"**

### Player Role
You're operating a diamond saw blade (the ball) attached to a cutting platform (the paddle), demolishing layers of concrete, brick, and stone structures. Each level represents a different demolition job, and your goal is to cut through all the material with precision and efficiency using DMI's diamond tools.

### What Are Collectibles/Targets?
**Destructible Materials (Bricks):**
- **Standard Concrete** - Gray blocks, 1 hit to destroy (10 points)
- **Reinforced Concrete** - Dark gray, 2 hits (25 points)
- **Brick Walls** - Red blocks, 1 hit (15 points)
- **Cinder Blocks** - Light gray, 1 hit, spawn dust (10 points)
- **Asphalt** - Black, 2 hits (30 points)
- **Granite** - Speckled stone, 3 hits (50 points)
- **Marble** - White/veined, 3 hits (75 points)
- **Diamond-Embedded Concrete** - Blue-tinted, 1 hit, contains diamond (100 points)

**Special Blocks:**
- **Explosive Blocks** - Red with warning stripes, destroys surrounding 3×3 area
- **Crack-Spreader** - Creates chain reaction in adjacent blocks
- **Time Bonus** - Green, adds +10 seconds
- **Multi-Break** - Destroys all blocks of same type on level

**Indestructible Obstacles:**
- **Steel Girders** - Metal I-beams that deflect but don't break
- **Rebar Frames** - Metal grid patterns

**Collectibles:**
- **Loose Diamonds** - Released from premium blocks (currency)
- **Core Samples** - Cylindrical pieces (bonus points)
- **DMI Tokens** - Unlock new equipment
- **Star Ratings** - Complete level under par time/strokes

### What Are Obstacles/Enemies?
**Static Obstacles:**
- **Steel I-Beams** - Horizontal/vertical indestructible barriers
- **Rebar Grids** - Partial barriers with gaps
- **Safety Barriers** - Reduce ball speed when hit

**Active Obstacles:**
- **Moving Girders** - Slide left/right or up/down
- **Rotating Rebar** - Spinning obstacles that deflect unpredictably
- **Falling Debris** - Rocks that fall and block paddle movement temporarily
- **Dust Clouds** - Obscure visibility when certain blocks break

**Environmental Hazards:**
- **Narrow Gaps** - Tight spaces requiring precision
- **Bumpers** - Curved deflectors that send ball at sharp angles
- **Speed Zones** - Areas that accelerate ball dangerously
- **Portal Pairs** - Ball enters one, exits the other (teleportation)

### What Are Power-ups?
**Ball Enhancements (Dropped by Blocks):**
- **Multi-Ball** - Splits into 3 balls (red icon)
- **Fireball** - Ball cuts through multiple blocks without bouncing (orange flame)
- **Explosive Ball** - Destroys blocks in small radius (bomb icon)
- **Laser Ball** - Shoots straight through everything (blue beam)
- **Magnet Ball** - Attracts to nearest block automatically (purple)
- **Giant Ball** - 2x size, destroys more per hit (yellow large)
- **Steel Ball** - Breaks any block in one hit (silver metallic)

**Paddle Enhancements:**
- **Wide Paddle** - 2x width for easier catching (green)
- **Sticky Paddle** - Catches and holds ball for aim (yellow)
- **Laser Paddle** - Fires laser beams upward with tap (red)
- **Speed Paddle** - Faster movement (blue)
- **Shield** - Barrier below paddle catches missed balls once (cyan)
- **Magnet Paddle** - Ball attracts to paddle (purple)

**Temporary Effects:**
- **Slow Motion** - Ball moves 50% slower (clock icon)
- **Ghost Mode** - Ball phases through indestructible obstacles (ghost icon)
- **Point Multiplier** - 2x or 3x points for 20 seconds (gold "2x")
- **Auto-Catch** - All balls auto-return to paddle (silver net)

### Visual Style Recommendations

**Art Style:**
- Top-down or slight isometric view of demolition site
- Realistic material textures with satisfying break effects
- Industrial construction site aesthetic
- Chunky, readable brick/block designs
- Dynamic particle effects for destruction

**Color Palette:**
- **Background**: Construction site (brown dirt, blue sky, gray concrete base)
- **Blocks**: Material-appropriate colors (gray concrete, red brick, black asphalt)
- **Paddle**: DMI Blue (#0066CC) with metallic silver accents
- **Ball**: Diamond-tipped saw blade (spinning silver with blue diamonds)
- **UI**: Industrial orange (#FF6600), safety yellow, steel gray
- **Power-ups**: Color-coded by type (red, blue, green, yellow, purple)

**Visual Effects:**
- Realistic material fragmentation (blocks shatter appropriately)
- Particle systems: dust clouds, concrete chunks, brick fragments
- Saw blade rotation animation (constant spin)
- Sparks when hitting metal obstacles
- Screen shake on explosive/multi-block hits
- Trail effect behind fast-moving ball
- Glow effects on power-up collection
- Crack animations on multi-hit blocks (show damage state)

**UI Elements:**
- Score counter (top left)
- Lives/balls remaining (top right, saw blade icons)
- Level indicator (top center)
- Power-up status bar (bottom, above paddle)
- Star progress meter (for 3-star rating)
- Level complete celebration screen

### Technical Specs for Phaser 3 Implementation

#### Core Systems

**Physics & Ball Mechanics:**
```javascript
class DiamondBall extends Phaser.Physics.Arcade.Sprite {
  INITIAL_SPEED = 300;
  MAX_SPEED = 600;
  MIN_SPEED = 150;
  SPEED_INCREMENT = 20;      // Speed increase per level
  
  launch(angle) {
    const velocity = this.scene.physics.velocityFromAngle(
      angle,
      this.INITIAL_SPEED
    );
    this.setVelocity(velocity.x, velocity.y);
    this.setCollideWorldBounds(true);
    this.setBounce(1, 1);      // Perfect elastic collision
  }
  
  // Adjust angle based on paddle hit position
  onPaddleHit(paddle) {
    const hitPosition = this.x - paddle.x;
    const normalized = hitPosition / (paddle.width / 2);
    
    // Map to angle: -60° to +60° range
    const angle = normalized * 60;
    
    // Maintain speed but change direction
    const speed = Math.sqrt(
      this.body.velocity.x ** 2 + 
      this.body.velocity.y ** 2
    );
    
    const velocity = this.scene.physics.velocityFromAngle(
      angle - 90,  // -90 for upward direction
      speed
    );
    
    this.setVelocity(velocity.x, velocity.y);
    
    // Play hit sound and effect
    this.scene.playPaddleHitEffect(paddle);
  }
  
  // Prevent ball from getting stuck horizontally
  preventHorizontalTrap() {
    if (Math.abs(this.body.velocity.y) < 50) {
      this.body.velocity.y = this.body.velocity.y > 0 ? 100 : -100;
    }
  }
}
```

**Paddle Control:**
```javascript
class CuttingPaddle extends Phaser.Physics.Arcade.Sprite {
  SPEED = 500;
  
  update() {
    // Mouse/touch control
    if (this.scene.input.activePointer.isDown) {
      const targetX = this.scene.input.activePointer.x;
      
      // Smooth movement toward target
      if (Math.abs(targetX - this.x) > 5) {
        const direction = targetX > this.x ? 1 : -1;
        this.setVelocityX(direction * this.SPEED);
      } else {
        this.setVelocityX(0);
      }
    }
    
    // Keyboard control
    if (this.scene.cursors.left.isDown) {
      this.setVelocityX(-this.SPEED);
    } else if (this.scene.cursors.right.isDown) {
      this.setVelocityX(this.SPEED);
    } else {
      this.setVelocityX(0);
    }
    
    // Keep within bounds
    this.x = Phaser.Math.Clamp(this.x, this.width/2, 800 - this.width/2);
  }
}
```

**Brick/Block System:**
```javascript
class BlockManager {
  blockTypes = {
    concrete: { hits: 1, points: 10, color: 0x888888 },
    reinforced: { hits: 2, points: 25, color: 0x444444 },
    brick: { hits: 1, points: 15, color: 0xCC3333 },
    granite: { hits: 3, points: 50, color: 0xAA8866 },
    marble: { hits: 3, points: 75, color: 0xEEEEDD },
    diamond: { hits: 1, points: 100, color: 0x3399FF, dropsDiamond: true }
  };
  
  createLevel(levelData) {
    levelData.layout.forEach((row, y) => {
      row.forEach((blockType, x) => {
        if (blockType !== 0) {
          this.createBlock(x, y, blockType);
        }
      });
    });
  }
  
  createBlock(gridX, gridY, type) {
    const block = this.blockPool.get();
    block.setData(this.blockTypes[type]);
    block.setPosition(
      gridX * 64 + 32,
      gridY * 32 + 100
    );
    block.currentHits = 0;
    this.blocks.add(block);
    return block;
  }
  
  onBlockHit(ball, block) {
    block.currentHits++;
    
    // Show damage state
    if (block.currentHits < block.getData('hits')) {
      block.showCracks(block.currentHits);
      this.scene.playHitSound(block);
    } else {
      // Destroy block
      this.destroyBlock(block);
    }
  }
  
  destroyBlock(block) {
    // Particles
    this.scene.spawnDebris(block);
    
    // Score
    this.scene.addScore(block.getData('points'));
    
    // Drop power-up chance (15%)
    if (Math.random() < 0.15) {
      this.dropPowerUp(block);
    }
    
    // Drop diamond if special block
    if (block.getData('dropsDiamond')) {
      this.dropDiamond(block);
    }
    
    // Remove block
    block.destroy();
    
    // Check win condition
    if (this.blocks.countActive() === 0) {
      this.scene.levelComplete();
    }
  }
}
```

**Level Data Format:**
```javascript
const levelData = {
  level: 1,
  name: "First Demo",
  parTime: 120,
  parStrokes: 50,
  layout: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 6, 6, 3, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};
// 0 = empty, 1 = concrete, 2 = reinforced, 3 = granite, 6 = diamond
```

#### Asset Requirements

**Sprites & Animations:**
- Paddle sprite (128x32 PNG) - DMI branded cutting platform
- Ball sprite (32x32 PNG) - Spinning saw blade (8-frame rotation)
- Block sprites (64x32 each): concrete, reinforced, brick, granite, marble, diamond
- Block damage states (2 cracked versions per multi-hit block)
- Obstacle sprites: steel beams, rebar grids
- Power-up icons (32x32 each, 15+ types)
- Background layers: demolition site scene

**Animations:**
- Saw blade continuous rotation (8 frames, loop)
- Block destruction (6-frame shatter sequence per type)
- Paddle idle animation (subtle movement)
- Power-up drop animation (float down)
- Power-up activation flash
- Shield bubble effect (when active)

**Audio:**
- Ball bounce sound (varying pitch based on speed)
- Block hit sound (different per material type)
- Block break sound (satisfying crack/shatter)
- Power-up collect chime
- Power-up activation sound (per type)
- Paddle hit sound
- Life lost sound (harsh)
- Level complete fanfare
- Background music: energetic industrial/electronic loops

**Particles:**
- Concrete dust (gray/white particles)
- Brick fragments (red chunks)
- Stone chips (varied colors)
- Sparks (orange/white from metal)
- Diamond shimmer (cyan sparkles)
- Explosion effects (for explosive blocks)

#### Key Technical Features

**Collision System:**
```javascript
// Ball-to-brick collision
this.physics.add.collider(
  ballGroup,
  blockGroup,
  this.onBallHitBlock,
  null,
  this
);

// Ball-to-paddle collision
this.physics.add.collider(
  ballGroup,
  paddle,
  this.onBallHitPaddle,
  null,
  this
);

// Power-up collection
this.physics.add.overlap(
  paddle,
  powerUpGroup,
  this.collectPowerUp,
  null,
  this
);

// Ball below paddle (life lost)
ballGroup.children.each(ball => {
  if (ball.y > paddle.y + 50) {
    this.loseBall(ball);
  }
});
```

**Power-Up Management:**
```javascript
class PowerUpManager {
  activePowerUps = [];
  
  activatePowerUp(type, duration = 10000) {
    switch(type) {
      case 'multiball':
        this.spawnExtraBalls(2);
        break;
      case 'wide_paddle':
        this.paddle.setScale(2, 1);
        this.addTimedEffect('wide_paddle', duration);
        break;
      case 'fireball':
        this.balls.children.each(b => b.setFireball(true));
        this.addTimedEffect('fireball', duration);
        break;
      // etc.
    }
  }
  
  addTimedEffect(type, duration) {
    const effect = {
      type,
      endTime: this.time.now + duration
    };
    this.activePowerUps.push(effect);
    
    // Visual indicator
    this.showPowerUpIcon(type, duration);
  }
  
  update() {
    // Remove expired effects
    this.activePowerUps = this.activePowerUps.filter(effect => {
      if (this.time.now >= effect.endTime) {
        this.removePowerUpEffect(effect.type);
        return false;
      }
      return true;
    });
  }
}
```

**Performance Optimizations:**
- Object pooling for balls, blocks, particles
- Texture atlas for all sprites
- Particle emission limits (200 max)
- Efficient collision detection (group-to-group)
- Destroy off-screen power-ups
- Level data compression (use patterns/symmetry)

**Save System:**
```javascript
LocalStorage: {
  currentLevel: number,
  levelsCompleted: [],
  levelStars: { 1: 3, 2: 2, ... },
  highScores: { 1: 5000, 2: 7500, ... },
  totalScore: number,
  diamonds: number,
  unlockedPaddles: [],
  unlockedBalls: [],
  settings: { sound, music, particles, difficulty }
}
```

#### Screen Sizes & Responsive Design
- Portrait orientation: 375x667 to 428x926
- Tablet landscape: 1024x768
- Scale mode: FIT maintaining aspect ratio
- Play area: 640x960 logical pixels
- Paddle always at bottom (y = 900)
- Blocks fill top 60% of screen
- Responsive grid: 8-12 columns wide based on screen

#### Difficulty Progression
```javascript
const difficultyByLevel = {
  1-5: {
    ballSpeed: 300,
    blockDensity: 0.6,    // 60% filled
    multiHitBlocks: 0.2,  // 20% require multiple hits
    powerUpRate: 0.20     // 20% drop chance
  },
  6-15: {
    ballSpeed: 350,
    blockDensity: 0.75,
    multiHitBlocks: 0.4,
    powerUpRate: 0.15
  },
  16-30: {
    ballSpeed: 400,
    blockDensity: 0.85,
    multiHitBlocks: 0.6,
    powerUpRate: 0.12,
    movingObstacles: true
  },
  31+: {
    ballSpeed: 450,
    blockDensity: 0.95,
    multiHitBlocks: 0.8,
    powerUpRate: 0.10,
    movingObstacles: true,
    enemyObstacles: true
  }
};
```

## PRD Summary

**Concrete Crusher** revitalizes the timeless brick-breaker formula by transforming the paddle and ball into a diamond-blade cutting platform and spinning saw blade, demolishing layers of concrete, brick, and stone in themed demolition jobs. Players control a DMI-branded cutting platform at the bottom of the screen, deflecting a diamond saw blade upward to slice through material blocks arranged in patterns above. The physics-based gameplay rewards precision—hit the paddle's edge for sharp angles, center for straight shots—while the satisfying destruction of varied materials (standard concrete, reinforced blocks, granite, marble, diamond-embedded premium blocks) provides constant visual and audio feedback. Each material type has distinct durability, requiring multiple hits for tougher stones, and shatters with appropriate particle effects and sounds.

The DMI theme integration brings mechanical authenticity and educational value, showcasing how diamond tools cut through different construction materials. Power-ups dropped from destroyed blocks add strategic depth: Multi-Ball splits your saw blade into three for faster clearing, Fireball lets you punch through multiple blocks without bouncing, Laser Ball shoots straight through everything, while paddle enhancements like Wide Platform, Sticky Catch (hold and aim), and Laser Platform (fire upward shots) provide tactical variety. Indestructible steel girders and rebar grids create navigational challenges, while explosive blocks trigger chain reactions and special diamond-embedded blocks drop currency for unlocking upgraded equipment. The game features 50+ progressively challenging levels with 3-star rating systems, achievement unlocks, and varied block layouts that require both quick reflexes and strategic thinking.

Built on Phaser 3's robust physics system, Concrete Crusher delivers precise collision detection, smooth ball deflection mechanics, and satisfying material destruction effects at 60 FPS. The level editor-friendly data format allows for easy content expansion, while the difficulty curve gradually introduces tougher materials, faster ball speeds, moving obstacles, and complex block arrangements. With multiple game modes (campaign progression, endless survival, time attack), unlockable paddles and ball skins with unique abilities, and leaderboards for competitive scoring, Concrete Crusher offers both casual pick-up-and-play appeal and long-term progression hooks. The combination of instant-gratification destruction, skill-based paddle control, and strategic power-up management creates a deeply engaging experience that honors the classic Breakout/Arkanoid legacy while delivering fresh DMI-branded innovation.

---

**Target Platforms:** iOS, Android, Web (Mobile + Desktop)  
**Session Length:** 2-5 minutes per level  
**Monetization:** Premium ($2.99) or F2P with ads, level packs IAP  
**Development Time:** 8-10 weeks for MVP (30 levels)  
**Core Appeal:** Satisfying destruction, precision physics, power-up strategy, progression
