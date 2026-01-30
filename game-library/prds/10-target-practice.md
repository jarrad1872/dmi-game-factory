# Game PRD #10: Diamond Target Practice (Shooting Gallery Style)

## Reference Games

**Primary Reference: Duck Hunt (Nintendo)**
- Classic light gun shooting game
- Screenshot: https://en.wikipedia.org/wiki/Duck_Hunt
- Tap-to-shoot moving targets

**Similar Games:**
- Wild Gunman - Western-themed shooter
- Carnival (Sega) - Shooting gallery arcade
- Point Blank series - Minigame shooting challenges
- Angry Birds AR: Isle of Pigs - AR shooting mechanics
- Safari Hunt - Similar animal shooting theme
- Modern mobile: Bottle Shoot, Can Knockdown series

## Core Mechanics

### Primary Action
- **Tap to Shoot**: Tap on screen to fire at target location
- **Aim Cursor**: Crosshair or reticle follows touch/mouse position
- **Ammo System**: Limited shots per round (reload mechanic)
- **Target Tracking**: Targets move across screen in patterns
- **Accuracy Scoring**: Points based on precision and speed

### Win/Fail Conditions
**Win Conditions:**
- Hit minimum target threshold (e.g., 8 of 10 targets)
- Achieve target score within time/ammo limit
- Complete wave/round without missing quota
- Perfect round bonus (100% accuracy)

**Fail Conditions:**
- Miss too many targets (quota not met)
- Run out of ammo without reaching goal
- Time expires before hitting enough targets
- Hit forbidden targets (penalties)

### Progression System
- Round-based progression (10+ rounds)
- Increasing difficulty per round
- Score accumulation across rounds
- Star rating per round (1-3 stars)
- Unlockable weapons with different stats
- Accuracy tracking and statistics
- Achievement system

### Difficulty Curve
- More targets simultaneously
- Faster target movement
- Smaller targets
- Targets appear for shorter duration
- More obstacles blocking shots
- Moving background distractions
- Target patterns become unpredictable

## DMI THEME CONCEPT: "DIAMOND TARGET PRACTICE"

### Creative Title
**"Diamond Target Practice: Precision Drilling Challenge"**

### Player Role
You're a DMI equipment operator training at the company's precision shooting range, testing and demonstrating diamond core drill accuracy on moving targets. Hit material samples, core targets, and equipment markers while avoiding safety hazards and DMI property in this industrial target practice simulation.

### What Are Collectibles/Targets?
**Primary Targets (Shoot These):**
- **Material Samples** - Floating concrete/stone blocks (10 points each)
  - Concrete blocks (gray, medium speed)
  - Brick samples (red, faster movement)
  - Stone slabs (tan, slower but smaller)
  - Asphalt chunks (black, erratic movement)
- **Core Target Bulls-eyes** - Classic circular targets (25 points)
  - Red center (50 bonus for bullseye)
  - Blue ring (25 points)
  - White outer (10 points)
- **Diamond Icons** - Spinning blue gems (50 points + currency)
- **Bonus Markers** - DMI logo targets (100 points)
- **Moving Cans/Bottles** - Knocked off ledges (15 points each)
- **Pop-Up Targets** - Spring-loaded test dummies (20 points)

**Target Types by Behavior:**
- **Linear Movers** - Move left-to-right or right-to-left
- **Arc Flyers** - Tossed in parabolic arcs
- **Pop-ups** - Appear briefly then duck down
- **Spinners** - Rotate on axis while moving
- **Zigzaggers** - Erratic unpredictable movement
- **Cascaders** - Fall from top in columns

**Special Targets:**
- **Bonus Time Target** - Clock icon, adds +10 seconds
- **Multi-Shot Target** - Explodes into 3 smaller targets
- **Point Multiplier** - Golden "2x" icon (20 second boost)
- **Rapid Fire** - Removes reload delay temporarily

### What Are Obstacles/Enemies?
**Forbidden Targets (DO NOT SHOOT):**
- **Safety Inspector** - Person in hard hat and vest (pop-up)
- **DMI Equipment** - Valuable drill rigs, saws (-50 points, lose combo)
- **Fuel Drums** - Red barrels marked "flammable" (-100 points, screen obscured)
- **Safety Signs** - OSHA warning signs (-25 points)
- **Protected Wildlife** - Birds/animals (ethical penalty)

**Physical Obstacles:**
- **Moving Cover** - Walls that slide and block shots
- **Rotating Barriers** - Must time shots through gaps
- **Hanging Chains** - Deflect shots unpredictably
- **Dust Clouds** - Obscure targets temporarily
- **Steam Jets** - Block line of sight intermittently

**Environmental Challenges:**
- **Wind Effects** - Shots drift slightly (harder difficulty)
- **Low Light Rounds** - Reduced visibility, harder to see targets
- **Rain/Weather** - Visual distortion effects
- **Moving Camera** - Slight sway/movement (advanced rounds)

### What Are Power-ups?
**Weapon Modifications (Temporary):**
- **Rapid Fire** - Remove reload delay (10 seconds)
- **Laser Sight** - Red dot shows exact hit point (20 seconds)
- **Explosive Rounds** - Destroy nearby targets in radius (5 shots)
- **Piercing Shots** - Bullet goes through multiple targets (10 shots)
- **Auto-Target** - Slight aim assist toward targets (15 seconds)
- **Slow Motion** - Targets move 50% slower (10 seconds)
- **X-Ray Vision** - See targets through obstacles (10 seconds)

**Score Boosts:**
- **Point Multiplier** - 2x or 3x points (20 seconds)
- **Combo Extender** - Longer combo window (30 seconds)
- **Perfect Streak** - Next 5 hits are critical hits (2x points each)

**Ammo/Utility:**
- **Bonus Ammo** - +10 shots
- **Full Reload** - Instant magazine refill
- **Shield** - Forgives one forbidden target hit

### Visual Style Recommendations

**Art Style:**
- Realistic 3D shooting gallery environment
- Industrial training facility aesthetic
- Clean, professional DMI branding throughout
- Satisfying destruction effects on targets
- Clear visual distinction between targets and hazards

**Color Palette:**
- **Background**: Industrial warehouse (gray walls, concrete floor, blue sky)
- **Targets**: Varied materials (gray concrete, red brick, tan stone)
- **Good Targets**: Blue accents (DMI brand color)
- **Forbidden Targets**: Red warning color, clear danger indicators
- **UI**: DMI Blue (#0066CC), Safety Orange (#FF6600), White text
- **Effects**: Muzzle flash (orange/white), bullet trails (white), explosions (orange/gray)

**Visual Effects:**
- Muzzle flash on each shot
- Bullet trail/tracer effect
- Target destruction: shatter, fragments, dust
- Hit markers (different colors: blue = good, red = forbidden)
- Smoke/debris particles
- Recoil animation on weapon
- Screen shake on explosive targets
- Slow-motion on perfect shots (optional "kill cam" moment)
- Combo meter fill animation

**UI Elements:**
- Ammo counter (bottom right) - bullets remaining
- Score (top left)
- Targets remaining (top center)
- Timer (top right)
- Combo meter (left side)
- Crosshair/reticle (center, follows aim)
- Round info (between rounds)
- Accuracy stats at end (% hit, best streak)

### Technical Specs for Phaser 3 Implementation

#### Core Systems

**Shooting Mechanics:**
```javascript
class ShootingGallery extends Phaser.Scene {
  // Configuration
  MAX_AMMO = 30;
  RELOAD_TIME = 1500;       // ms
  SHOT_COOLDOWN = 200;      // ms between shots
  
  create() {
    // Crosshair that follows pointer
    this.crosshair = this.add.sprite(0, 0, 'crosshair');
    this.crosshair.setDepth(1000);
    
    // Input handling
    this.input.on('pointermove', (pointer) => {
      this.crosshair.setPosition(pointer.x, pointer.y);
    });
    
    this.input.on('pointerdown', (pointer) => {
      this.shoot(pointer.x, pointer.y);
    });
  }
  
  shoot(x, y) {
    // Check ammo and cooldown
    if (this.ammo <= 0) {
      this.playSound('click_empty');
      return;
    }
    
    if (this.time.now < this.nextShotTime) return;
    
    // Consume ammo
    this.ammo--;
    this.updateAmmoDisplay();
    this.nextShotTime = this.time.now + this.SHOT_COOLDOWN;
    
    // Visual effects
    this.playMuzzleFlash();
    this.createBulletTrail(x, y);
    this.playSound('gunshot');
    
    // Check hits
    this.checkHit(x, y);
    
    // Auto-reload when empty
    if (this.ammo === 0) {
      this.reload();
    }
  }
  
  reload() {
    this.isReloading = true;
    this.playSound('reload');
    this.showReloadIndicator();
    
    this.time.delayedCall(this.RELOAD_TIME, () => {
      this.ammo = this.MAX_AMMO;
      this.isReloading = false;
      this.updateAmmoDisplay();
    });
  }
  
  checkHit(x, y) {
    const hitRadius = 20; // Tolerance radius in pixels
    
    // Check all active targets
    this.targets.children.entries.forEach(target => {
      const distance = Phaser.Math.Distance.Between(
        x, y,
        target.x, target.y
      );
      
      if (distance <= target.hitRadius + hitRadius) {
        this.onTargetHit(target, x, y);
      }
    });
    
    // Check forbidden targets
    this.hazards.children.entries.forEach(hazard => {
      const distance = Phaser.Math.Distance.Between(
        x, y,
        hazard.x, hazard.y
      );
      
      if (distance <= hazard.hitRadius + hitRadius) {
        this.onHazardHit(hazard);
      }
    });
  }
}
```

**Target Spawning System:**
```javascript
class TargetManager {
  targetTypes = {
    concrete: {
      sprite: 'concrete_block',
      points: 10,
      hitRadius: 40,
      speed: 150,
      spawnWeight: 40
    },
    brick: {
      sprite: 'brick_sample',
      points: 15,
      hitRadius: 35,
      speed: 200,
      spawnWeight: 30
    },
    diamond: {
      sprite: 'diamond_icon',
      points: 50,
      hitRadius: 25,
      speed: 250,
      spawnWeight: 10,
      dropsCurrency: true
    },
    bullseye: {
      sprite: 'target_bullseye',
      points: 25,
      hitRadius: 50,
      speed: 100,
      spawnWeight: 20,
      hasZones: true  // Center = bonus points
    }
  };
  
  spawnWave(round) {
    const config = this.getWaveConfig(round);
    
    for (let i = 0; i < config.targetCount; i++) {
      this.time.delayedCall(i * config.spawnDelay, () => {
        this.spawnRandomTarget(config);
      });
    }
  }
  
  spawnRandomTarget(config) {
    const type = this.weightedRandomType();
    const pattern = Phaser.Math.RND.pick(config.patterns);
    
    const target = this.targetPool.get();
    target.setup(this.targetTypes[type]);
    
    // Set spawn position and movement
    switch(pattern) {
      case 'linear_left':
        target.setPosition(800, Phaser.Math.Between(100, 500));
        target.body.setVelocityX(-target.speed);
        break;
      case 'arc':
        target.launchArc(400, 600, -300, -500);
        break;
      case 'popup':
        target.setPosition(Phaser.Math.Between(100, 700), 550);
        target.popUp(1500); // Show for 1.5 seconds
        break;
    }
    
    this.activeTargets.add(target);
  }
  
  getWaveConfig(round) {
    if (round <= 3) {
      return {
        targetCount: 5,
        spawnDelay: 1500,
        patterns: ['linear_left', 'linear_right'],
        speed: 1.0
      };
    } else if (round <= 7) {
      return {
        targetCount: 8,
        spawnDelay: 1200,
        patterns: ['linear_left', 'linear_right', 'arc'],
        speed: 1.3
      };
    } else {
      return {
        targetCount: 12,
        spawnDelay: 800,
        patterns: ['linear_left', 'linear_right', 'arc', 'popup', 'zigzag'],
        speed: 1.6,
        hasHazards: true
      };
    }
  }
}
```

**Combo & Scoring System:**
```javascript
class ScoreManager {
  combo = 0;
  comboMultiplier = 1.0;
  lastHitTime = 0;
  COMBO_WINDOW = 2000;      // ms to continue combo
  
  onTargetHit(target, accuracy) {
    // Check combo continuation
    if (this.time.now - this.lastHitTime < this.COMBO_WINDOW) {
      this.combo++;
    } else {
      this.combo = 1;
    }
    
    this.lastHitTime = this.time.now;
    
    // Calculate multiplier
    this.comboMultiplier = 1.0 + (this.combo * 0.1);
    
    // Accuracy bonus (based on distance from center)
    let accuracyMultiplier = 1.0;
    if (accuracy === 'perfect') accuracyMultiplier = 2.0;
    else if (accuracy === 'good') accuracyMultiplier = 1.5;
    
    // Calculate final points
    const basePoints = target.points;
    const finalPoints = Math.floor(
      basePoints * 
      this.comboMultiplier * 
      accuracyMultiplier *
      this.globalMultiplier
    );
    
    this.score += finalPoints;
    
    // Visual feedback
    this.showPointsPopup(target.x, target.y, finalPoints);
    this.updateComboDisplay();
    
    // Sound feedback (pitch increases with combo)
    const pitch = 1.0 + (this.combo * 0.05);
    this.playSound('hit', { rate: pitch });
  }
  
  onMiss() {
    // Reset combo on miss
    if (this.combo > 0) {
      this.combo = 0;
      this.comboMultiplier = 1.0;
      this.showComboBreak();
    }
  }
  
  onHazardHit(hazard) {
    // Penalty
    this.score = Math.max(0, this.score + hazard.penalty);
    this.combo = 0;
    this.comboMultiplier = 1.0;
    
    // Visual feedback
    this.showPenaltyEffect();
    this.playSound('buzzer');
  }
}
```

#### Asset Requirements

**Sprites & Animations:**
- **Targets**: Concrete blocks, bricks, stones, diamonds, bullseyes (64x64 to 128x128)
- **Hazards**: Safety inspector, equipment, barrels, signs (64x64 to 128x128)
- **Crosshair**: Multiple styles (32x32)
- **Weapon**: Optional on-screen weapon sprite (if visible)
- **Background**: Shooting range environment (1920x1080)
  - Warehouse walls, equipment, branding posters
  - Multiple parallax layers for depth
- **UI Elements**: Ammo counter, score display, combo meter
- **Effects**: Muzzle flash, bullet holes, shatter particles

**Animations:**
- Target wobble/idle animations
- Pop-up target spring action
- Target destruction (shatter, explode, break apart)
- Hazard "hit" animation (person falls, barrel explodes)
- Crosshair pulse on hit
- Muzzle flash (3-4 frame)
- Reload animation (if weapon visible)
- Combo meter filling/draining

**Audio:**
- Gunshot sound - satisfying "bang" (pitch variation)
- Reload sound - mechanical click/slide
- Target hit sounds - varying by material (concrete crack, metal clang, glass shatter)
- Hazard hit - buzzer/alarm sound
- Combo continue - rising pitch melody
- Combo break - descending pitch
- Perfect shot - special "critical hit" sound
- Ambient sounds - shooting range atmosphere, distant gunfire
- Background music - tense, energetic tracks (per round)

**Particles:**
- Muzzle flash particles (orange/white)
- Bullet trail/smoke
- Target shatter (material-specific: concrete dust, wood chips)
- Explosion (for explosive rounds)
- Smoke from barrels
- Spark effects (hitting metal)

#### Key Technical Features

**Hit Detection:**
```javascript
// Pixel-perfect hit detection option
function pixelPerfectHit(x, y, target) {
  // Check if within sprite bounds
  const bounds = target.getBounds();
  if (!bounds.contains(x, y)) return false;
  
  // Check alpha threshold (for complex shapes)
  const localX = x - target.x + target.width / 2;
  const localY = y - target.y + target.height / 2;
  
  const alpha = target.texture.getPixelAlpha(localX, localY);
  return alpha > 128; // Hit if not transparent
}
```

**Difficulty Scaling:**
```javascript
const roundConfigs = [
  // Round 1-3: Tutorial
  {
    rounds: [1, 2, 3],
    targetCount: 5,
    targetSpeed: 1.0,
    spawnRate: 1.5,      // seconds between spawns
    patterns: ['linear'],
    hazards: false
  },
  // Round 4-7: Easy
  {
    rounds: [4, 5, 6, 7],
    targetCount: 8,
    targetSpeed: 1.3,
    spawnRate: 1.2,
    patterns: ['linear', 'arc'],
    hazards: true,
    hazardFrequency: 0.2  // 20% of spawns
  },
  // Round 8-12: Medium
  {
    rounds: [8, 9, 10, 11, 12],
    targetCount: 12,
    targetSpeed: 1.6,
    spawnRate: 0.9,
    patterns: ['linear', 'arc', 'popup', 'zigzag'],
    hazards: true,
    hazardFrequency: 0.3,
    obstacles: true       // Moving cover
  },
  // Round 13+: Hard
  {
    rounds: [13, 99],
    targetCount: 15,
    targetSpeed: 2.0,
    spawnRate: 0.6,
    patterns: ['all'],
    hazards: true,
    hazardFrequency: 0.4,
    obstacles: true,
    modifiers: ['wind', 'low_light']  // Environmental challenges
  }
];
```

**Performance Optimizations:**
- Object pooling for targets, bullets, particles
- Texture atlas for all sprites
- Limit active targets (max 10 on screen)
- Efficient hit detection (broad phase → narrow phase)
- Particle emission limits (max 500)
- Destroy off-screen targets immediately
- Preload sounds with sprite sheets

**Save System:**
```javascript
LocalStorage: {
  currentRound: number,
  highScore: number,
  bestAccuracy: number,
  roundStars: { 1: 3, 2: 2, ... },
  totalTargetsHit: number,
  totalShotsFired: number,
  overallAccuracy: number,
  unlockedWeapons: [],
  achievements: [],
  settings: { sound, music, sensitivity, crosshairStyle }
}
```

#### Screen Sizes & Responsive Design
- Landscape primary: 812x375 (iPhone landscape) to 1024x768 (tablet)
- Portrait mode available (targets move up/down instead)
- Scale mode: FIT maintaining aspect ratio
- Touch/mouse input with identical feel
- Crosshair sensitivity adjustment in settings
- Larger hit radius on mobile (compensate for finger size)
- Responsive UI positioning for all device sizes

#### Game Modes
```javascript
const gameModes = {
  campaign: {
    description: "Progress through 20 rounds of increasing difficulty",
    structure: "linear progression",
    lives: 3
  },
  timeAttack: {
    description: "Hit as many targets as possible in 60 seconds",
    structure: "endless spawning",
    timeLimit: 60
  },
  accuracy: {
    description: "50 shots, maximize your score with perfect accuracy",
    structure: "fixed ammo",
    shots: 50
  },
  endurance: {
    description: "Endless waves, survive as long as possible",
    structure: "endless",
    increasingDifficulty: true
  }
};
```

## PRD Summary

**Diamond Target Practice** transforms the classic shooting gallery experience into an engaging industrial training simulation where players test diamond drilling equipment accuracy on a DMI precision range. The core gameplay is pure point-and-shoot satisfaction: tap anywhere on screen to fire, hit moving targets for points, avoid forbidden hazards, and build combos through consistent accuracy. Targets include material samples (concrete blocks, bricks, stone slabs), traditional bullseye targets, spinning diamond icons, and pop-up test markers that move across the screen in varied patterns—linear side-scrolling, parabolic arcs, sudden pop-ups, and erratic zigzags. The shooting feels immediate and responsive, with clear hit detection, satisfying destruction effects, and audio-visual feedback that makes every successful hit rewarding.

The DMI theme integration creates an authentic training environment where players are equipment operators practicing precision on an industrial shooting range. Targets represent materials DMI cuts through (concrete, stone, asphalt), while forbidden targets like safety inspectors, valuable equipment, and fuel drums add risk-penalty gameplay that reinforces real-world safety awareness. Power-ups dropped from special targets provide temporary advantages—rapid fire removes reload delay, laser sight shows exact impact points, explosive rounds destroy multiple targets, slow motion makes fast targets manageable—adding strategic depth without overwhelming the core shooting mechanic. The combo system rewards consistent accuracy with score multipliers that build as you land consecutive hits within a 2-second window, creating a risk-reward tension between speed and precision.

Built on Phaser 3 with robust hit detection and object pooling, Diamond Target Practice offers multiple game modes to suit different play styles: Campaign mode with 20 progressively challenging rounds, Time Attack for maximum targets in 60 seconds, Accuracy mode with limited shots, and Endless Endurance with increasing difficulty. The difficulty scaling introduces faster targets, more simultaneous spawns, smaller hit boxes, moving obstacles, and environmental challenges (wind drift, low light, camera sway) that test player skill. Unlockable weapons with different stats (faster reload, larger ammo capacity, tighter accuracy), achievement tracking, and leaderboards provide long-term progression. With rounds lasting 1-3 minutes, instant-action gameplay, and the pure dopamine hit of landing the perfect shot and watching targets explode, Diamond Target Practice delivers the arcade shooting gallery experience optimized for modern mobile touch controls.

---

**Target Platforms:** iOS, Android, Web (Mobile + Desktop)  
**Session Length:** 1-3 minutes per round  
**Monetization:** F2P with ads, weapon unlocks IAP, remove ads option  
**Development Time:** 6-8 weeks for MVP (20 rounds, 3 game modes)  
**Core Appeal:** Instant gratification shooting, satisfying hits, combo system, precision skill
