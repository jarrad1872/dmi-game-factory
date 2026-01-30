import { GameConfig, THEME_COLORS, DMI_PRODUCTS } from '../types';

export function generateGameHTML(config: GameConfig): string {
  const theme = THEME_COLORS[config.theme];
  const products = DMI_PRODUCTS.filter(p => config.products.includes(p.id));
  
  const baseTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${config.title} | DMI Tools</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: ${theme.bg}; 
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    #game-container { 
      width: 100vw; 
      height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      position: relative;
    }
    canvas { 
      max-width: 100%; 
      max-height: 100%;
      border-radius: 0;
    }
    .cta-button {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);
      color: white;
      padding: 14px 36px;
      border-radius: 30px;
      font-weight: 700;
      text-decoration: none;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 0.5px;
    }
    .cta-button:hover { 
      transform: translateX(-50%) translateY(-2px) scale(1.02); 
      box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.2);
    }
    .cta-button:active {
      transform: translateX(-50%) scale(0.98);
    }
    .branding {
      position: fixed;
      top: 12px;
      left: 12px;
      color: white;
      font-size: 13px;
      font-weight: 600;
      opacity: 0.9;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,0,0,0.4);
      padding: 8px 14px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
    .branding-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    @media (max-width: 480px) {
      .cta-button {
        padding: 12px 28px;
        font-size: 14px;
        bottom: 16px;
      }
      .branding {
        font-size: 11px;
        padding: 6px 10px;
      }
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  ${config.showBranding ? `
  <div class="branding">
    <div class="branding-icon">⚙️</div>
    <span>DMI Tools Corp</span>
  </div>` : ''}
  <a href="${config.ctaUrl}" target="_blank" rel="noopener" class="cta-button">${config.ctaText}</a>
  <script>
    const CONFIG = ${JSON.stringify({
      title: config.title,
      products: products.map(p => ({ id: p.id, name: p.name, icon: p.icon })),
      theme: theme,
      difficulty: config.difficulty,
      showBranding: config.showBranding,
    })};
    
    ${getGameScript(config.template)}
  </script>
</body>
</html>`;

  return baseTemplate;
}

function getGameScript(template: string): string {
  switch (template) {
    case 'flappy':
      return FLAPPY_SCRIPT;
    case 'runner':
      return RUNNER_SCRIPT;
    case 'match3':
      return MATCH3_SCRIPT;
    default:
      return FLAPPY_SCRIPT;
  }
}

const FLAPPY_SCRIPT = `
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;
    
    // Loading bar
    const barWidth = 300;
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height / 2;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 10);
    
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16), 1);
      progressBar.fillRoundedRect(barX + 4, barY + 4, (barWidth - 8) * value, barHeight - 8, 6);
    });
  }

  create() {
    this.createTextures();
    this.scene.start('GameScene');
  }

  createTextures() {
    // Player - DMI tool themed circle with glow effect
    const playerGfx = this.make.graphics({ add: false });
    // Glow
    playerGfx.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16), 0.3);
    playerGfx.fillCircle(30, 30, 30);
    // Main circle
    playerGfx.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16));
    playerGfx.fillCircle(30, 30, 22);
    // Inner highlight
    playerGfx.fillStyle(0xffffff, 0.3);
    playerGfx.fillCircle(24, 24, 8);
    // Tool icon in center
    playerGfx.fillStyle(0xffffff);
    playerGfx.fillCircle(30, 30, 6);
    playerGfx.generateTexture('player', 60, 60);

    // Pipe with gradient effect
    const pipeGfx = this.make.graphics({ add: false });
    const pipeColor = parseInt(CONFIG.theme.secondary.replace('#', ''), 16);
    pipeGfx.fillStyle(pipeColor);
    pipeGfx.fillRoundedRect(0, 0, 70, 400, { tl: 8, tr: 8, bl: 0, br: 0 });
    // Highlight
    pipeGfx.fillStyle(0xffffff, 0.2);
    pipeGfx.fillRect(5, 0, 15, 400);
    // Shadow
    pipeGfx.fillStyle(0x000000, 0.2);
    pipeGfx.fillRect(50, 0, 20, 400);
    // Cap
    pipeGfx.fillStyle(pipeColor);
    pipeGfx.fillRoundedRect(-5, 0, 80, 30, 8);
    pipeGfx.generateTexture('pipe', 70, 400);

    // Collectible - Diamond/Star
    const collectGfx = this.make.graphics({ add: false });
    collectGfx.fillStyle(0xFFD700);
    collectGfx.fillStar(25, 25, 5, 12, 25);
    collectGfx.fillStyle(0xffffff, 0.5);
    collectGfx.fillStar(22, 22, 5, 5, 10);
    collectGfx.generateTexture('collectible', 50, 50);

    // Particle
    const particleGfx = this.make.graphics({ add: false });
    particleGfx.fillStyle(0xffffff);
    particleGfx.fillCircle(4, 4, 4);
    particleGfx.generateTexture('particle', 8, 8);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.gameOver = false;
    this.started = false;
    this.highScore = parseInt(localStorage.getItem('dmi-flappy-highscore') || '0');
  }

  create() {
    const { width, height } = this.scale;
    
    // Animated background gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      0x000000,
      0x000000
    );
    bg.fillRect(0, 0, width, height);

    // Floating particles in background
    for (let i = 0; i < 20; i++) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height),
        Phaser.Math.Between(1, 3),
        0xffffff,
        0.2
      );
      this.tweens.add({
        targets: dot,
        y: dot.y - 100,
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        yoyo: true
      });
    }

    // Pipes group
    this.pipes = this.physics.add.group();
    
    // Player
    this.player = this.physics.add.sprite(width * 0.25, height / 2, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setAllowGravity(false);
    this.player.setScale(0.9);
    
    // Collectibles
    this.collectibles = this.physics.add.group();
    
    // UI Container
    const uiY = 60;
    
    // Title with gradient effect
    this.titleText = this.add.text(width/2, uiY, CONFIG.title, {
      fontSize: '36px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Product icons
    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join('  ');
      this.add.text(width/2, uiY + 45, productText, {
        fontSize: '28px'
      }).setOrigin(0.5);
    }

    // Start prompt
    this.startPrompt = this.add.text(width/2, height/2 + 80, '👆 TAP TO START', {
      fontSize: '20px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Pulsing animation
    this.tweens.add({
      targets: this.startPrompt,
      scale: 1.1,
      alpha: 0.7,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Score display (hidden until game starts)
    this.scoreText = this.add.text(width/2, uiY, '0', {
      fontSize: '72px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0);

    // Input
    this.input.on('pointerdown', () => this.flap());
    this.input.keyboard.on('keydown-SPACE', () => this.flap());

    // Collisions
    this.physics.add.collider(this.player, this.pipes, () => this.hitPipe());
    this.physics.add.overlap(this.player, this.collectibles, (p, c) => this.collect(c));

    // Pipe spawner
    this.pipeTimer = this.time.addEvent({
      delay: Math.max(1500, 2200 - (CONFIG.difficulty * 80)),
      callback: this.spawnPipes,
      callbackScope: this,
      loop: true,
      paused: true
    });

    // Player idle animation
    this.tweens.add({
      targets: this.player,
      y: this.player.y + 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  flap() {
    if (this.gameOver) {
      this.score = 0;
      this.scene.restart();
      return;
    }
    
    if (!this.started) {
      this.started = true;
      this.player.body.setAllowGravity(true);
      this.pipeTimer.paused = false;
      this.titleText.setAlpha(0);
      this.startPrompt.setVisible(false);
      this.scoreText.setAlpha(1);
      this.tweens.killTweensOf(this.player);
    }
    
    this.player.setVelocityY(-380);
    
    // Flap effect
    this.tweens.add({
      targets: this.player,
      scaleX: 1.1,
      scaleY: 0.8,
      duration: 100,
      yoyo: true
    });
  }

  spawnPipes() {
    const { width, height } = this.scale;
    const gap = Math.max(140, 200 - (CONFIG.difficulty * 6));
    const minY = 120;
    const maxY = height - 120 - gap;
    const gapY = Phaser.Math.Between(minY, maxY);

    const speed = -220 - (CONFIG.difficulty * 15);

    // Top pipe (flipped)
    const topPipe = this.pipes.create(width + 35, gapY, 'pipe');
    topPipe.body.setAllowGravity(false);
    topPipe.setVelocityX(speed);
    topPipe.setOrigin(0.5, 1);
    topPipe.setFlipY(true);

    // Bottom pipe
    const bottomPipe = this.pipes.create(width + 35, gapY + gap, 'pipe');
    bottomPipe.body.setAllowGravity(false);
    bottomPipe.setVelocityX(speed);
    bottomPipe.setOrigin(0.5, 0);

    // Score zone
    const scoreZone = this.add.zone(width + 35, height/2, 20, height);
    this.physics.world.enable(scoreZone);
    scoreZone.body.setAllowGravity(false);
    scoreZone.body.setVelocityX(speed);
    this.physics.add.overlap(this.player, scoreZone, () => {
      if (!scoreZone.scored) {
        scoreZone.scored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
        
        // Score pop effect
        this.tweens.add({
          targets: this.scoreText,
          scale: 1.2,
          duration: 100,
          yoyo: true
        });
      }
    });

    // Collectible (30% chance)
    if (Math.random() > 0.7) {
      const collectible = this.collectibles.create(width + 120, gapY + gap/2, 'collectible');
      collectible.body.setAllowGravity(false);
      collectible.setVelocityX(speed);
      collectible.setScale(0.8);
      
      // Spinning animation
      this.tweens.add({
        targets: collectible,
        angle: 360,
        duration: 2000,
        repeat: -1
      });
    }
  }

  collect(collectible) {
    // Particle burst
    for (let i = 0; i < 8; i++) {
      const particle = this.add.circle(
        collectible.x, collectible.y, 4, 0xFFD700
      );
      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-50, 50),
        y: particle.y + Phaser.Math.Between(-50, 50),
        alpha: 0,
        scale: 0,
        duration: 400,
        onComplete: () => particle.destroy()
      });
    }
    
    collectible.destroy();
    this.score += 5;
    this.scoreText.setText(this.score.toString());
  }

  hitPipe() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.physics.pause();
    this.pipeTimer.paused = true;
    
    // Screen shake
    this.cameras.main.shake(200, 0.01);
    
    // Flash red
    this.cameras.main.flash(200, 255, 0, 0, false);

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dmi-flappy-highscore', this.highScore.toString());
    }
    
    const { width, height } = this.scale;
    
    // Game over panel
    const panel = this.add.graphics();
    panel.fillStyle(0x000000, 0.85);
    panel.fillRoundedRect(width/2 - 140, height/2 - 100, 280, 200, 20);
    
    this.add.text(width/2, height/2 - 60, 'GAME OVER', {
      fontSize: '32px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width/2, height/2 - 10, 'Score: ' + this.score, {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      fill: CONFIG.theme.primary
    }).setOrigin(0.5);

    this.add.text(width/2, height/2 + 25, 'Best: ' + this.highScore, {
      fontSize: '18px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setOrigin(0.5);

    const restartBtn = this.add.text(width/2, height/2 + 70, '↻ TAP TO RESTART', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartBtn,
      alpha: 0.5,
      duration: 600,
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    if (this.started && !this.gameOver) {
      // Remove off-screen objects
      this.pipes.getChildren().forEach(pipe => {
        if (pipe.x < -50) pipe.destroy();
      });
      
      this.collectibles.getChildren().forEach(c => {
        if (c.x < -50) c.destroy();
      });
      
      // Rotate player based on velocity
      const targetAngle = Phaser.Math.Clamp(this.player.body.velocity.y / 8, -25, 70);
      this.player.angle = Phaser.Math.Linear(this.player.angle, targetAngle, 0.1);
    }
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 700,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false }
  },
  scene: [BootScene, GameScene],
  render: {
    antialias: true,
    roundPixels: true
  }
});
`;

const RUNNER_SCRIPT = `
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;
    const barWidth = 300;
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height / 2;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 10);
    
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16), 1);
      progressBar.fillRoundedRect(barX + 4, barY + 4, (barWidth - 8) * value, barHeight - 8, 6);
    });
  }

  create() {
    this.createTextures();
    this.scene.start('GameScene');
  }

  createTextures() {
    // Player - Running character
    const playerGfx = this.make.graphics({ add: false });
    const primaryColor = parseInt(CONFIG.theme.primary.replace('#', ''), 16);
    // Body
    playerGfx.fillStyle(primaryColor);
    playerGfx.fillRoundedRect(10, 0, 30, 50, 8);
    // Head
    playerGfx.fillCircle(25, -10, 14);
    // Highlight
    playerGfx.fillStyle(0xffffff, 0.3);
    playerGfx.fillRoundedRect(15, 5, 8, 35, 4);
    playerGfx.generateTexture('player', 50, 70);

    // Ground tile
    const groundGfx = this.make.graphics({ add: false });
    const secondaryColor = parseInt(CONFIG.theme.secondary.replace('#', ''), 16);
    groundGfx.fillStyle(secondaryColor);
    groundGfx.fillRect(0, 0, 100, 40);
    groundGfx.fillStyle(0x000000, 0.2);
    groundGfx.fillRect(0, 35, 100, 5);
    groundGfx.fillStyle(0xffffff, 0.1);
    groundGfx.fillRect(0, 0, 100, 8);
    groundGfx.generateTexture('ground', 100, 40);

    // Obstacle - Spike/cone
    const obstacleGfx = this.make.graphics({ add: false });
    obstacleGfx.fillStyle(0xFF3B3B);
    obstacleGfx.fillTriangle(30, 0, 0, 60, 60, 60);
    obstacleGfx.fillStyle(0xffffff, 0.3);
    obstacleGfx.fillTriangle(30, 10, 15, 50, 30, 50);
    obstacleGfx.generateTexture('obstacle', 60, 60);

    // Coin
    const coinGfx = this.make.graphics({ add: false });
    coinGfx.fillStyle(0xFFD700);
    coinGfx.fillCircle(18, 18, 18);
    coinGfx.fillStyle(0xffffff, 0.4);
    coinGfx.fillCircle(14, 14, 6);
    coinGfx.fillStyle(0x000000, 0.2);
    coinGfx.fillCircle(22, 22, 4);
    coinGfx.generateTexture('coin', 36, 36);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.gameOver = false;
    this.started = false;
    this.distance = 0;
    this.highScore = parseInt(localStorage.getItem('dmi-runner-highscore') || '0');
  }

  create() {
    const { width, height } = this.scale;
    
    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      0x000000,
      0x000000
    );
    bg.fillRect(0, 0, width, height);

    // Parallax background dots
    for (let i = 0; i < 30; i++) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height - 100),
        Phaser.Math.Between(1, 2),
        0xffffff,
        0.15
      );
      this.tweens.add({
        targets: dot,
        x: -20,
        duration: Phaser.Math.Between(4000, 8000),
        repeat: -1,
        onRepeat: () => { dot.x = width + 20; }
      });
    }

    // Ground
    this.ground = this.physics.add.staticGroup();
    for (let x = 0; x < width + 200; x += 100) {
      this.ground.create(x + 50, height - 20, 'ground');
    }

    // Player
    this.player = this.physics.add.sprite(120, height - 90, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 1);
    this.physics.add.collider(this.player, this.ground);

    // Obstacles and coins
    this.obstacles = this.physics.add.group();
    this.coins = this.physics.add.group();

    // UI
    const uiY = 50;
    
    this.titleText = this.add.text(width/2, uiY, CONFIG.title, {
      fontSize: '32px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join('  ');
      this.add.text(width/2, uiY + 40, productText, { fontSize: '24px' }).setOrigin(0.5);
    }

    this.startPrompt = this.add.text(width/2, height/2, '👆 TAP TO JUMP', {
      fontSize: '22px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.startPrompt,
      scale: 1.1,
      alpha: 0.7,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Score display
    this.scoreText = this.add.text(width/2, uiY, '0', {
      fontSize: '64px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0);

    // Distance meter
    this.distanceText = this.add.text(20, 100, '0m', {
      fontSize: '18px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setAlpha(0);

    // Input
    this.input.on('pointerdown', () => this.jump());
    this.input.keyboard.on('keydown-SPACE', () => this.jump());

    // Collisions
    this.physics.add.collider(this.player, this.obstacles, () => this.hitObstacle());
    this.physics.add.overlap(this.player, this.coins, (p, c) => this.collectCoin(c));

    // Spawner
    this.spawnTimer = this.time.addEvent({
      delay: Math.max(1000, 1600 - (CONFIG.difficulty * 60)),
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
      paused: true
    });

    // Score/distance timer
    this.scoreTimer = this.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.started && !this.gameOver) {
          this.distance += 5;
          this.score = Math.floor(this.distance / 10);
          this.scoreText.setText(this.score.toString());
          this.distanceText.setText(this.distance + 'm');
        }
      },
      loop: true,
      paused: true
    });

    // Idle bounce
    this.tweens.add({
      targets: this.player,
      y: this.player.y - 5,
      duration: 400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  jump() {
    if (this.gameOver) {
      this.score = 0;
      this.distance = 0;
      this.scene.restart();
      return;
    }

    if (!this.started) {
      this.started = true;
      this.spawnTimer.paused = false;
      this.scoreTimer.paused = false;
      this.titleText.setAlpha(0);
      this.startPrompt.setVisible(false);
      this.scoreText.setAlpha(1);
      this.distanceText.setAlpha(1);
      this.tweens.killTweensOf(this.player);
    }

    if (this.player.body.touching.down) {
      this.player.setVelocityY(-500);
      
      // Jump squash/stretch
      this.tweens.add({
        targets: this.player,
        scaleX: 0.8,
        scaleY: 1.2,
        duration: 100,
        yoyo: true
      });
    }
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    const speed = -350 - (CONFIG.difficulty * 25);
    
    // Obstacle
    const obstacle = this.obstacles.create(width + 30, height - 80, 'obstacle');
    obstacle.body.setAllowGravity(false);
    obstacle.setVelocityX(speed);
    obstacle.setImmovable(true);
    obstacle.setOrigin(0.5, 1);

    // Double obstacle sometimes
    if (CONFIG.difficulty > 5 && Math.random() > 0.7) {
      const obstacle2 = this.obstacles.create(width + 90, height - 80, 'obstacle');
      obstacle2.body.setAllowGravity(false);
      obstacle2.setVelocityX(speed);
      obstacle2.setImmovable(true);
      obstacle2.setOrigin(0.5, 1);
    }

    // Coins (60% chance)
    if (Math.random() > 0.4) {
      const coinY = height - 150 - Math.random() * 120;
      const coin = this.coins.create(width + 150, coinY, 'coin');
      coin.body.setAllowGravity(false);
      coin.setVelocityX(speed);
      coin.setScale(0.9);
      
      // Floating animation
      this.tweens.add({
        targets: coin,
        y: coin.y - 15,
        duration: 400,
        yoyo: true,
        repeat: -1
      });
    }
  }

  collectCoin(coin) {
    // Particle effect
    for (let i = 0; i < 6; i++) {
      const particle = this.add.circle(coin.x, coin.y, 4, 0xFFD700);
      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-40, 40),
        y: particle.y + Phaser.Math.Between(-40, 40),
        alpha: 0,
        scale: 0,
        duration: 300,
        onComplete: () => particle.destroy()
      });
    }
    
    coin.destroy();
    this.distance += 50;
    
    // Score pop
    const popup = this.add.text(coin.x, coin.y, '+50', {
      fontSize: '20px',
      fontFamily: 'Inter, sans-serif',
      fill: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: popup,
      y: popup.y - 40,
      alpha: 0,
      duration: 600,
      onComplete: () => popup.destroy()
    });
  }

  hitObstacle() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.physics.pause();
    this.spawnTimer.paused = true;
    this.scoreTimer.paused = true;

    this.cameras.main.shake(200, 0.015);
    this.cameras.main.flash(200, 255, 0, 0, false);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dmi-runner-highscore', this.highScore.toString());
    }

    const { width, height } = this.scale;
    
    const panel = this.add.graphics();
    panel.fillStyle(0x000000, 0.85);
    panel.fillRoundedRect(width/2 - 140, height/2 - 110, 280, 220, 20);

    this.add.text(width/2, height/2 - 70, 'GAME OVER', {
      fontSize: '32px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width/2, height/2 - 20, 'Score: ' + this.score, {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      fill: CONFIG.theme.primary
    }).setOrigin(0.5);

    this.add.text(width/2, height/2 + 15, 'Distance: ' + this.distance + 'm', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#aaaaaa'
    }).setOrigin(0.5);

    this.add.text(width/2, height/2 + 45, 'Best: ' + this.highScore, {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setOrigin(0.5);

    const restartBtn = this.add.text(width/2, height/2 + 85, '↻ TAP TO RESTART', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartBtn,
      alpha: 0.5,
      duration: 600,
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    if (this.started && !this.gameOver) {
      // Cleanup
      this.obstacles.getChildren().forEach(o => { if (o.x < -60) o.destroy(); });
      this.coins.getChildren().forEach(c => { if (c.x < -40) c.destroy(); });
      
      // Landing squash
      if (this.player.body.touching.down && this.player.body.velocity.y === 0) {
        if (this.player.scaleY > 1) {
          this.player.setScale(1.1, 0.9);
          this.tweens.add({
            targets: this.player,
            scaleX: 1,
            scaleY: 1,
            duration: 100
          });
        }
      }
    }
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 700,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1200 }, debug: false }
  },
  scene: [BootScene, GameScene],
  render: {
    antialias: true,
    roundPixels: true
  }
});
`;

const MATCH3_SCRIPT = `
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;
    const barWidth = 300;
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height / 2;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 10);
    
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16), 1);
      progressBar.fillRoundedRect(barX + 4, barY + 4, (barWidth - 8) * value, barHeight - 8, 6);
    });
  }

  create() {
    this.createTextures();
    this.scene.start('GameScene');
  }

  createTextures() {
    const colors = [
      parseInt(CONFIG.theme.primary.replace('#', ''), 16),
      parseInt(CONFIG.theme.secondary.replace('#', ''), 16),
      0xFF6B6B,
      0x4ECDC4,
      0xFFE66D,
      0xA78BFA
    ];

    colors.forEach((color, i) => {
      const gfx = this.make.graphics({ add: false });
      // Shadow
      gfx.fillStyle(0x000000, 0.3);
      gfx.fillRoundedRect(4, 4, 48, 48, 10);
      // Main tile
      gfx.fillStyle(color);
      gfx.fillRoundedRect(0, 0, 48, 48, 10);
      // Highlight
      gfx.fillStyle(0xffffff, 0.35);
      gfx.fillRoundedRect(4, 4, 40, 20, { tl: 8, tr: 8, bl: 0, br: 0 });
      gfx.generateTexture('tile' + i, 52, 52);
    });

    // Selection ring
    const selGfx = this.make.graphics({ add: false });
    selGfx.lineStyle(4, 0xFFFFFF);
    selGfx.strokeRoundedRect(0, 0, 52, 52, 12);
    selGfx.generateTexture('selection', 52, 52);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.moves = 30;
    this.gridSize = 6;
    this.tileSize = 58;
    this.tiles = [];
    this.selected = null;
    this.canMove = true;
    this.highScore = parseInt(localStorage.getItem('dmi-match3-highscore') || '0');
  }

  create() {
    const { width, height } = this.scale;
    
    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      parseInt(CONFIG.theme.bg.replace('#', ''), 16),
      0x000000,
      0x000000
    );
    bg.fillRect(0, 0, width, height);

    // Title
    this.add.text(width/2, 35, CONFIG.title, {
      fontSize: '26px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Products
    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join('  ');
      this.add.text(width/2, 65, productText, { fontSize: '20px' }).setOrigin(0.5);
    }

    // Score panel
    const panelY = 95;
    const panelGfx = this.add.graphics();
    panelGfx.fillStyle(0x000000, 0.4);
    panelGfx.fillRoundedRect(20, panelY, width - 40, 50, 12);

    this.add.text(80, panelY + 25, 'SCORE', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setOrigin(0.5);

    this.scoreText = this.add.text(80, panelY + 25 + 18, '0', {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      fill: CONFIG.theme.primary,
      fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    this.add.text(width - 80, panelY + 25, 'MOVES', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setOrigin(0.5);

    this.movesText = this.add.text(width - 80, panelY + 25 + 18, this.moves.toString(), {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    // Grid setup
    this.gridOffsetX = (width - this.gridSize * this.tileSize) / 2;
    this.gridOffsetY = 165;

    // Grid background
    const gridBg = this.add.graphics();
    gridBg.fillStyle(0x000000, 0.4);
    gridBg.fillRoundedRect(
      this.gridOffsetX - 8,
      this.gridOffsetY - 8,
      this.gridSize * this.tileSize + 16,
      this.gridSize * this.tileSize + 16,
      16
    );

    this.initGrid();

    // Selection sprite
    this.selectionSprite = this.add.sprite(0, 0, 'selection').setVisible(false).setDepth(100);
    
    // Pulsing selection animation
    this.tweens.add({
      targets: this.selectionSprite,
      scale: 1.1,
      duration: 400,
      yoyo: true,
      repeat: -1
    });
  }

  initGrid() {
    this.tiles = [];
    for (let row = 0; row < this.gridSize; row++) {
      this.tiles[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        this.createTile(row, col);
      }
    }
    // Remove initial matches
    let iterations = 0;
    while (this.findMatches().length > 0 && iterations < 100) {
      this.removeMatchesInstant(this.findMatches());
      this.refillGridInstant();
      iterations++;
    }
  }

  createTile(row, col, drop = false) {
    let type;
    let attempts = 0;
    do {
      type = Phaser.Math.Between(0, 5);
      attempts++;
    } while (this.wouldMatch(row, col, type) && attempts < 50);

    const x = this.gridOffsetX + col * this.tileSize + this.tileSize/2;
    const startY = drop ? this.gridOffsetY - this.tileSize * 2 : this.gridOffsetY + row * this.tileSize + this.tileSize/2;
    const endY = this.gridOffsetY + row * this.tileSize + this.tileSize/2;

    const tile = this.add.sprite(x, startY, 'tile' + type);
    tile.setInteractive();
    tile.tileType = type;
    tile.gridRow = row;
    tile.gridCol = col;
    tile.setScale(0.95);

    if (drop) {
      this.tweens.add({
        targets: tile,
        y: endY,
        duration: 250 + row * 30,
        ease: 'Bounce.easeOut'
      });
    }

    tile.on('pointerdown', () => this.selectTile(tile));

    this.tiles[row][col] = tile;
    return tile;
  }

  wouldMatch(row, col, type) {
    // Horizontal
    if (col >= 2 && 
        this.tiles[row]?.[col-1]?.tileType === type && 
        this.tiles[row]?.[col-2]?.tileType === type) return true;
    // Vertical
    if (row >= 2 && 
        this.tiles[row-1]?.[col]?.tileType === type && 
        this.tiles[row-2]?.[col]?.tileType === type) return true;
    return false;
  }

  selectTile(tile) {
    if (!this.canMove || this.moves <= 0) return;

    if (!this.selected) {
      this.selected = tile;
      this.selectionSprite.setPosition(tile.x, tile.y).setVisible(true);
      
      // Tile pop
      this.tweens.add({
        targets: tile,
        scale: 1.05,
        duration: 100,
        yoyo: true
      });
    } else {
      const rowDiff = Math.abs(tile.gridRow - this.selected.gridRow);
      const colDiff = Math.abs(tile.gridCol - this.selected.gridCol);

      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        this.swapTiles(this.selected, tile);
      } else {
        this.selected = tile;
        this.selectionSprite.setPosition(tile.x, tile.y);
      }
    }
  }

  swapTiles(tile1, tile2) {
    this.canMove = false;
    this.selectionSprite.setVisible(false);

    const row1 = tile1.gridRow, col1 = tile1.gridCol;
    const row2 = tile2.gridRow, col2 = tile2.gridCol;

    // Swap in array
    this.tiles[row1][col1] = tile2;
    this.tiles[row2][col2] = tile1;
    tile1.gridRow = row2; tile1.gridCol = col2;
    tile2.gridRow = row1; tile2.gridCol = col1;

    const x1 = this.gridOffsetX + col1 * this.tileSize + this.tileSize/2;
    const y1 = this.gridOffsetY + row1 * this.tileSize + this.tileSize/2;
    const x2 = this.gridOffsetX + col2 * this.tileSize + this.tileSize/2;
    const y2 = this.gridOffsetY + row2 * this.tileSize + this.tileSize/2;

    // Animate swap
    this.tweens.add({
      targets: tile1,
      x: x2,
      y: y2,
      duration: 150,
      ease: 'Power2'
    });

    this.tweens.add({
      targets: tile2,
      x: x1,
      y: y1,
      duration: 150,
      ease: 'Power2',
      onComplete: () => {
        const matches = this.findMatches();
        if (matches.length > 0) {
          this.moves--;
          this.movesText.setText(this.moves.toString());
          
          // Flash moves if low
          if (this.moves <= 5) {
            this.movesText.setColor('#FF6B6B');
          }
          
          this.processMatches();
        } else {
          // Swap back
          this.tiles[row1][col1] = tile1;
          this.tiles[row2][col2] = tile2;
          tile1.gridRow = row1; tile1.gridCol = col1;
          tile2.gridRow = row2; tile2.gridCol = col2;

          this.tweens.add({
            targets: tile1,
            x: x1,
            y: y1,
            duration: 150
          });
          this.tweens.add({
            targets: tile2,
            x: x2,
            y: y2,
            duration: 150,
            onComplete: () => { this.canMove = true; }
          });
        }
      }
    });

    this.selected = null;
  }

  findMatches() {
    const matches = new Set();

    // Horizontal
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        const type = this.tiles[row]?.[col]?.tileType;
        if (type !== undefined &&
            this.tiles[row]?.[col+1]?.tileType === type &&
            this.tiles[row]?.[col+2]?.tileType === type) {
          matches.add(this.tiles[row][col]);
          matches.add(this.tiles[row][col+1]);
          matches.add(this.tiles[row][col+2]);
          // Check for 4+ match
          if (this.tiles[row]?.[col+3]?.tileType === type) {
            matches.add(this.tiles[row][col+3]);
          }
        }
      }
    }

    // Vertical
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        const type = this.tiles[row]?.[col]?.tileType;
        if (type !== undefined &&
            this.tiles[row+1]?.[col]?.tileType === type &&
            this.tiles[row+2]?.[col]?.tileType === type) {
          matches.add(this.tiles[row][col]);
          matches.add(this.tiles[row+1][col]);
          matches.add(this.tiles[row+2][col]);
          // Check for 4+ match
          if (this.tiles[row+3]?.[col]?.tileType === type) {
            matches.add(this.tiles[row+3][col]);
          }
        }
      }
    }

    return Array.from(matches).filter(t => t);
  }

  processMatches() {
    const matches = this.findMatches();
    if (matches.length > 0) {
      // Bonus for big matches
      const bonus = matches.length > 3 ? (matches.length - 3) * 5 : 0;
      this.score += matches.length * 10 + bonus;
      this.scoreText.setText(this.score.toString());
      
      // Score pop
      this.tweens.add({
        targets: this.scoreText,
        scale: 1.2,
        duration: 100,
        yoyo: true
      });

      this.removeMatches(matches);
      
      this.time.delayedCall(220, () => {
        this.dropTiles();
        this.time.delayedCall(350, () => {
          this.refillGrid();
          this.time.delayedCall(400, () => {
            this.processMatches();
          });
        });
      });
    } else {
      this.canMove = true;
      if (this.moves <= 0) {
        this.gameOver();
      }
    }
  }

  removeMatches(matches) {
    matches.forEach(tile => {
      if (tile) {
        this.tiles[tile.gridRow][tile.gridCol] = null;
        
        // Pop and particle effect
        for (let i = 0; i < 4; i++) {
          const particle = this.add.circle(tile.x, tile.y, 6, tile.tileType < 2 ? 
            parseInt(CONFIG.theme.primary.replace('#', ''), 16) : 0xffffff);
          this.tweens.add({
            targets: particle,
            x: particle.x + Phaser.Math.Between(-40, 40),
            y: particle.y + Phaser.Math.Between(-40, 40),
            alpha: 0,
            scale: 0,
            duration: 300,
            onComplete: () => particle.destroy()
          });
        }
        
        this.tweens.add({
          targets: tile,
          scale: 0,
          alpha: 0,
          duration: 180,
          ease: 'Back.easeIn',
          onComplete: () => tile.destroy()
        });
      }
    });
  }

  removeMatchesInstant(matches) {
    matches.forEach(tile => {
      if (tile) {
        this.tiles[tile.gridRow][tile.gridCol] = null;
        tile.destroy();
      }
    });
  }

  dropTiles() {
    for (let col = 0; col < this.gridSize; col++) {
      let emptyRow = this.gridSize - 1;
      for (let row = this.gridSize - 1; row >= 0; row--) {
        if (this.tiles[row]?.[col]) {
          if (row !== emptyRow) {
            const tile = this.tiles[row][col];
            this.tiles[emptyRow][col] = tile;
            this.tiles[row][col] = null;
            tile.gridRow = emptyRow;
            
            this.tweens.add({
              targets: tile,
              y: this.gridOffsetY + emptyRow * this.tileSize + this.tileSize/2,
              duration: 180,
              ease: 'Bounce.easeOut'
            });
          }
          emptyRow--;
        }
      }
    }
  }

  refillGrid() {
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize; row++) {
        if (!this.tiles[row]?.[col]) {
          this.createTile(row, col, true);
        }
      }
    }
  }

  refillGridInstant() {
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize; row++) {
        if (!this.tiles[row]?.[col]) {
          this.createTile(row, col, false);
        }
      }
    }
  }

  gameOver() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dmi-match3-highscore', this.highScore.toString());
    }

    const { width, height } = this.scale;
    
    // Overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, width, height);
    overlay.setDepth(200);

    // Panel
    const panel = this.add.graphics();
    panel.fillStyle(0x1a1a2e, 1);
    panel.fillRoundedRect(width/2 - 150, height/2 - 130, 300, 260, 24);
    panel.setDepth(201);

    this.add.text(width/2, height/2 - 85, 'GAME OVER', {
      fontSize: '34px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(202);

    this.add.text(width/2, height/2 - 30, 'Final Score', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#888888'
    }).setOrigin(0.5).setDepth(202);

    this.add.text(width/2, height/2 + 5, this.score.toString(), {
      fontSize: '48px',
      fontFamily: 'Inter, sans-serif',
      fill: CONFIG.theme.primary,
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(202);

    this.add.text(width/2, height/2 + 55, 'Best: ' + this.highScore, {
      fontSize: '18px',
      fontFamily: 'Inter, sans-serif',
      fill: '#666666'
    }).setOrigin(0.5).setDepth(202);

    const restartBtn = this.add.text(width/2, height/2 + 100, '↻ TAP TO PLAY AGAIN', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(202);

    this.tweens.add({
      targets: restartBtn,
      alpha: 0.5,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    this.input.once('pointerdown', () => {
      this.score = 0;
      this.moves = 30;
      this.scene.restart();
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 700,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, GameScene],
  render: {
    antialias: true,
    roundPixels: true
  }
});
`;
