import { GameConfig, THEME_COLORS, DMI_PRODUCTS } from '../types';

export function generateGameHTML(config: GameConfig): string {
  const theme = THEME_COLORS[config.theme];
  const products = DMI_PRODUCTS.filter(p => config.products.includes(p.id));
  
  const baseTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>${config.title}</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: ${theme.bg}; 
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #game-container { 
      width: 100vw; 
      height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center;
    }
    canvas { max-width: 100%; max-height: 100%; }
    .cta-button {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${theme.primary};
      color: white;
      padding: 12px 32px;
      border-radius: 25px;
      font-weight: bold;
      text-decoration: none;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      transition: transform 0.2s;
    }
    .cta-button:hover { transform: translateX(-50%) scale(1.05); }
    .branding {
      position: fixed;
      top: 10px;
      left: 10px;
      color: white;
      font-size: 12px;
      opacity: 0.8;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  ${config.showBranding ? '<div class="branding">⚙️ DMI Tools Corp</div>' : ''}
  <a href="${config.ctaUrl}" target="_blank" class="cta-button">${config.ctaText}</a>
  <script>
    const CONFIG = ${JSON.stringify({
      title: config.title,
      products: products.map(p => ({ name: p.name, icon: p.icon })),
      theme: theme,
      difficulty: config.difficulty,
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
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.gameOver = false;
    this.started = false;
  }

  preload() {
    // Create textures programmatically
    this.createTextures();
  }

  createTextures() {
    // Player (tool icon)
    const playerGfx = this.make.graphics({ add: false });
    playerGfx.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16));
    playerGfx.fillCircle(25, 25, 25);
    playerGfx.generateTexture('player', 50, 50);

    // Pipe
    const pipeGfx = this.make.graphics({ add: false });
    pipeGfx.fillStyle(parseInt(CONFIG.theme.secondary.replace('#', ''), 16));
    pipeGfx.fillRect(0, 0, 60, 400);
    pipeGfx.generateTexture('pipe', 60, 400);

    // Collectible
    const collectGfx = this.make.graphics({ add: false });
    collectGfx.fillStyle(0xFFD700);
    collectGfx.fillStar(20, 20, 5, 10, 20);
    collectGfx.generateTexture('collectible', 40, 40);
  }

  create() {
    const { width, height } = this.scale;
    
    // Background gradient effect
    this.add.rectangle(width/2, height/2, width, height, 
      parseInt(CONFIG.theme.bg.replace('#', ''), 16));

    // Pipes group
    this.pipes = this.physics.add.group();
    
    // Player
    this.player = this.physics.add.sprite(width * 0.2, height / 2, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setAllowGravity(false);
    
    // Collectibles
    this.collectibles = this.physics.add.group();
    
    // Score text
    this.scoreText = this.add.text(width/2, 50, 'Tap to Start!', {
      fontSize: '32px',
      fill: '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Product display
    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join(' ');
      this.add.text(width/2, 90, productText, {
        fontSize: '24px'
      }).setOrigin(0.5);
    }

    // Input
    this.input.on('pointerdown', () => this.flap());
    this.input.keyboard.on('keydown-SPACE', () => this.flap());

    // Collisions
    this.physics.add.collider(this.player, this.pipes, () => this.hitPipe());
    this.physics.add.overlap(this.player, this.collectibles, (p, c) => this.collect(c));

    // Pipe spawner
    this.pipeTimer = this.time.addEvent({
      delay: 2000 - (CONFIG.difficulty * 100),
      callback: this.spawnPipes,
      callbackScope: this,
      loop: true,
      paused: true
    });
  }

  flap() {
    if (this.gameOver) {
      this.scene.restart();
      return;
    }
    
    if (!this.started) {
      this.started = true;
      this.player.body.setAllowGravity(true);
      this.pipeTimer.paused = false;
      this.scoreText.setText('0');
    }
    
    this.player.setVelocityY(-350);
  }

  spawnPipes() {
    const { width, height } = this.scale;
    const gap = 180 - (CONFIG.difficulty * 5);
    const minY = 100;
    const maxY = height - 100 - gap;
    const gapY = Phaser.Math.Between(minY, maxY);

    // Top pipe
    const topPipe = this.pipes.create(width + 30, gapY - 200, 'pipe');
    topPipe.body.setAllowGravity(false);
    topPipe.setVelocityX(-200);
    topPipe.setOrigin(0.5, 1);

    // Bottom pipe
    const bottomPipe = this.pipes.create(width + 30, gapY + gap, 'pipe');
    bottomPipe.body.setAllowGravity(false);
    bottomPipe.setVelocityX(-200);
    bottomPipe.setOrigin(0.5, 0);

    // Score zone
    const scoreZone = this.add.zone(width + 30, height/2, 10, height);
    this.physics.world.enable(scoreZone);
    scoreZone.body.setAllowGravity(false);
    scoreZone.body.setVelocityX(-200);
    this.physics.add.overlap(this.player, scoreZone, () => {
      if (!scoreZone.scored) {
        scoreZone.scored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
      }
    });

    // Collectible
    if (Math.random() > 0.5) {
      const collectible = this.collectibles.create(width + 100, gapY + gap/2, 'collectible');
      collectible.body.setAllowGravity(false);
      collectible.setVelocityX(-200);
    }
  }

  collect(collectible) {
    collectible.destroy();
    this.score += 5;
    this.scoreText.setText(this.score.toString());
  }

  hitPipe() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.physics.pause();
    this.pipeTimer.paused = true;
    
    const { width, height } = this.scale;
    this.add.text(width/2, height/2, 'Game Over!\\nScore: ' + this.score + '\\nTap to restart', {
      fontSize: '28px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
  }

  update() {
    if (this.started && !this.gameOver) {
      // Remove off-screen pipes
      this.pipes.getChildren().forEach(pipe => {
        if (pipe.x < -50) pipe.destroy();
      });
      
      // Rotate player based on velocity
      this.player.angle = Phaser.Math.Clamp(this.player.body.velocity.y / 10, -30, 90);
    }
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: GameScene
});
`;

const RUNNER_SCRIPT = `
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.gameOver = false;
    this.started = false;
  }

  preload() {
    this.createTextures();
  }

  createTextures() {
    // Player
    const playerGfx = this.make.graphics({ add: false });
    playerGfx.fillStyle(parseInt(CONFIG.theme.primary.replace('#', ''), 16));
    playerGfx.fillRoundedRect(0, 0, 40, 60, 8);
    playerGfx.generateTexture('player', 40, 60);

    // Ground
    const groundGfx = this.make.graphics({ add: false });
    groundGfx.fillStyle(parseInt(CONFIG.theme.secondary.replace('#', ''), 16));
    groundGfx.fillRect(0, 0, 100, 30);
    groundGfx.generateTexture('ground', 100, 30);

    // Obstacle
    const obstacleGfx = this.make.graphics({ add: false });
    obstacleGfx.fillStyle(0xFF4444);
    obstacleGfx.fillTriangle(25, 0, 0, 50, 50, 50);
    obstacleGfx.generateTexture('obstacle', 50, 50);

    // Coin
    const coinGfx = this.make.graphics({ add: false });
    coinGfx.fillStyle(0xFFD700);
    coinGfx.fillCircle(15, 15, 15);
    coinGfx.generateTexture('coin', 30, 30);
  }

  create() {
    const { width, height } = this.scale;
    
    // Background
    this.add.rectangle(width/2, height/2, width, height, 
      parseInt(CONFIG.theme.bg.replace('#', ''), 16));

    // Ground
    this.ground = this.physics.add.staticGroup();
    for (let x = 0; x < width + 100; x += 100) {
      this.ground.create(x + 50, height - 15, 'ground');
    }

    // Player
    this.player = this.physics.add.sprite(100, height - 80, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);

    // Obstacles
    this.obstacles = this.physics.add.group();
    this.coins = this.physics.add.group();

    // Score
    this.scoreText = this.add.text(width/2, 50, 'Tap to Start!', {
      fontSize: '32px',
      fill: '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Products
    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join(' ');
      this.add.text(width/2, 90, productText, { fontSize: '24px' }).setOrigin(0.5);
    }

    // Input
    this.input.on('pointerdown', () => this.jump());
    this.input.keyboard.on('keydown-SPACE', () => this.jump());

    // Collisions
    this.physics.add.collider(this.player, this.obstacles, () => this.hitObstacle());
    this.physics.add.overlap(this.player, this.coins, (p, c) => this.collectCoin(c));

    // Spawner
    this.spawnTimer = this.time.addEvent({
      delay: 1500 - (CONFIG.difficulty * 80),
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
      paused: true
    });

    // Score increment
    this.scoreTimer = this.time.addEvent({
      delay: 100,
      callback: () => { if (this.started && !this.gameOver) this.score++; },
      loop: true,
      paused: true
    });
  }

  jump() {
    if (this.gameOver) {
      this.scene.restart();
      return;
    }

    if (!this.started) {
      this.started = true;
      this.spawnTimer.paused = false;
      this.scoreTimer.paused = false;
    }

    if (this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    
    // Obstacle
    const obstacle = this.obstacles.create(width + 25, height - 65, 'obstacle');
    obstacle.body.setAllowGravity(false);
    obstacle.setVelocityX(-300 - (CONFIG.difficulty * 20));
    obstacle.setImmovable(true);

    // Coin (sometimes)
    if (Math.random() > 0.4) {
      const coinY = height - 150 - Math.random() * 100;
      const coin = this.coins.create(width + 100, coinY, 'coin');
      coin.body.setAllowGravity(false);
      coin.setVelocityX(-300 - (CONFIG.difficulty * 20));
    }
  }

  collectCoin(coin) {
    coin.destroy();
    this.score += 50;
  }

  hitObstacle() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.physics.pause();
    this.spawnTimer.paused = true;
    this.scoreTimer.paused = true;

    const { width, height } = this.scale;
    this.add.text(width/2, height/2, 'Game Over!\\nScore: ' + this.score + '\\nTap to restart', {
      fontSize: '28px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
  }

  update() {
    if (this.started && !this.gameOver) {
      this.scoreText.setText(this.score.toString());
      
      // Cleanup
      this.obstacles.getChildren().forEach(o => { if (o.x < -50) o.destroy(); });
      this.coins.getChildren().forEach(c => { if (c.x < -50) c.destroy(); });
    }
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false }
  },
  scene: GameScene
});
`;

const MATCH3_SCRIPT = `
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.moves = 30;
    this.gridSize = 6;
    this.tileSize = 55;
    this.tiles = [];
    this.selected = null;
    this.canMove = true;
  }

  preload() {
    this.createTextures();
  }

  createTextures() {
    const colors = [
      parseInt(CONFIG.theme.primary.replace('#', ''), 16),
      parseInt(CONFIG.theme.secondary.replace('#', ''), 16),
      0xFF6B6B,
      0x4ECDC4,
      0xFFE66D,
      0x95E1D3
    ];

    colors.forEach((color, i) => {
      const gfx = this.make.graphics({ add: false });
      gfx.fillStyle(color);
      gfx.fillRoundedRect(2, 2, 46, 46, 8);
      gfx.generateTexture('tile' + i, 50, 50);
    });

    // Selection indicator
    const selGfx = this.make.graphics({ add: false });
    selGfx.lineStyle(4, 0xFFFFFF);
    selGfx.strokeRoundedRect(2, 2, 46, 46, 8);
    selGfx.generateTexture('selection', 50, 50);
  }

  create() {
    const { width, height } = this.scale;
    
    // Background
    this.add.rectangle(width/2, height/2, width, height, 
      parseInt(CONFIG.theme.bg.replace('#', ''), 16));

    // Title
    this.add.text(width/2, 30, CONFIG.title, {
      fontSize: '24px',
      fill: '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Products
    if (CONFIG.products.length > 0) {
      const productText = CONFIG.products.map(p => p.icon).join(' ');
      this.add.text(width/2, 60, productText, { fontSize: '20px' }).setOrigin(0.5);
    }

    // Score and moves
    this.scoreText = this.add.text(20, 90, 'Score: 0', {
      fontSize: '18px',
      fill: '#fff'
    });

    this.movesText = this.add.text(width - 20, 90, 'Moves: ' + this.moves, {
      fontSize: '18px',
      fill: '#fff'
    }).setOrigin(1, 0);

    // Create grid
    this.gridOffsetX = (width - this.gridSize * this.tileSize) / 2;
    this.gridOffsetY = 130;

    // Grid background
    this.add.rectangle(
      width/2, this.gridOffsetY + (this.gridSize * this.tileSize) / 2,
      this.gridSize * this.tileSize + 10, this.gridSize * this.tileSize + 10,
      0x000000, 0.3
    );

    this.initGrid();

    // Selection indicator
    this.selectionSprite = this.add.sprite(0, 0, 'selection').setVisible(false);
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
    while (this.findMatches().length > 0) {
      this.removeMatches(this.findMatches());
      this.refillGrid();
    }
  }

  createTile(row, col, drop = false) {
    let type;
    do {
      type = Phaser.Math.Between(0, 5);
    } while (this.wouldMatch(row, col, type));

    const x = this.gridOffsetX + col * this.tileSize + this.tileSize/2;
    const startY = drop ? this.gridOffsetY - this.tileSize : this.gridOffsetY + row * this.tileSize + this.tileSize/2;
    const endY = this.gridOffsetY + row * this.tileSize + this.tileSize/2;

    const tile = this.add.sprite(x, startY, 'tile' + type);
    tile.setInteractive();
    tile.tileType = type;
    tile.gridRow = row;
    tile.gridCol = col;

    if (drop) {
      this.tweens.add({
        targets: tile,
        y: endY,
        duration: 200,
        ease: 'Bounce.easeOut'
      });
    }

    tile.on('pointerdown', () => this.selectTile(tile));

    this.tiles[row][col] = tile;
    return tile;
  }

  wouldMatch(row, col, type) {
    // Check horizontal
    if (col >= 2 && 
        this.tiles[row][col-1]?.tileType === type && 
        this.tiles[row][col-2]?.tileType === type) return true;
    // Check vertical
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

    // Animate
    this.tweens.add({
      targets: tile1,
      x: this.gridOffsetX + col2 * this.tileSize + this.tileSize/2,
      y: this.gridOffsetY + row2 * this.tileSize + this.tileSize/2,
      duration: 150
    });

    this.tweens.add({
      targets: tile2,
      x: this.gridOffsetX + col1 * this.tileSize + this.tileSize/2,
      y: this.gridOffsetY + row1 * this.tileSize + this.tileSize/2,
      duration: 150,
      onComplete: () => {
        const matches = this.findMatches();
        if (matches.length > 0) {
          this.moves--;
          this.movesText.setText('Moves: ' + this.moves);
          this.processMatches();
        } else {
          // Swap back
          this.tiles[row1][col1] = tile1;
          this.tiles[row2][col2] = tile2;
          tile1.gridRow = row1; tile1.gridCol = col1;
          tile2.gridRow = row2; tile2.gridCol = col2;

          this.tweens.add({
            targets: tile1,
            x: this.gridOffsetX + col1 * this.tileSize + this.tileSize/2,
            y: this.gridOffsetY + row1 * this.tileSize + this.tileSize/2,
            duration: 150
          });
          this.tweens.add({
            targets: tile2,
            x: this.gridOffsetX + col2 * this.tileSize + this.tileSize/2,
            y: this.gridOffsetY + row2 * this.tileSize + this.tileSize/2,
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
        const type = this.tiles[row][col]?.tileType;
        if (type !== undefined &&
            this.tiles[row][col+1]?.tileType === type &&
            this.tiles[row][col+2]?.tileType === type) {
          matches.add(this.tiles[row][col]);
          matches.add(this.tiles[row][col+1]);
          matches.add(this.tiles[row][col+2]);
        }
      }
    }

    // Vertical
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        const type = this.tiles[row][col]?.tileType;
        if (type !== undefined &&
            this.tiles[row+1]?.[col]?.tileType === type &&
            this.tiles[row+2]?.[col]?.tileType === type) {
          matches.add(this.tiles[row][col]);
          matches.add(this.tiles[row+1][col]);
          matches.add(this.tiles[row+2][col]);
        }
      }
    }

    return Array.from(matches);
  }

  processMatches() {
    const matches = this.findMatches();
    if (matches.length > 0) {
      this.score += matches.length * 10;
      this.scoreText.setText('Score: ' + this.score);
      this.removeMatches(matches);
      
      this.time.delayedCall(200, () => {
        this.dropTiles();
        this.time.delayedCall(300, () => {
          this.refillGrid();
          this.time.delayedCall(300, () => {
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
        this.tweens.add({
          targets: tile,
          scale: 0,
          duration: 150,
          onComplete: () => tile.destroy()
        });
      }
    });
  }

  dropTiles() {
    for (let col = 0; col < this.gridSize; col++) {
      let emptyRow = this.gridSize - 1;
      for (let row = this.gridSize - 1; row >= 0; row--) {
        if (this.tiles[row][col]) {
          if (row !== emptyRow) {
            const tile = this.tiles[row][col];
            this.tiles[emptyRow][col] = tile;
            this.tiles[row][col] = null;
            tile.gridRow = emptyRow;
            
            this.tweens.add({
              targets: tile,
              y: this.gridOffsetY + emptyRow * this.tileSize + this.tileSize/2,
              duration: 150
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
        if (!this.tiles[row][col]) {
          this.createTile(row, col, true);
        }
      }
    }
  }

  gameOver() {
    const { width, height } = this.scale;
    this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7);
    this.add.text(width/2, height/2, 'Game Over!\\nFinal Score: ' + this.score + '\\nTap to restart', {
      fontSize: '28px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => this.scene.restart());
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 400,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: GameScene
});
`;
