let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10;
let livesText;
let gameOverText;

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '24px',
        fill: '#808080'
    });
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Add click event listener to the ball
    ball.setInteractive();
    ball.on('pointerdown', function () {
        // Reduce size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Increase speed by 10%
        yspeed *= 1.1;
        xspeed *= 1.1;

        // Increase lives by 1
        lives += 1;
        livesText.setText(`Lives: ${lives}`);
    });

    gameOverText = this.add.text(WIDTH / 2, HEIGHT / 2, 'GAME OVER', {
        fontSize: '64px',
        fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);
}

function update() {
    if (lives <= 0) {
        return;
    }

    ball.y += yspeed;
    ball.x += xspeed;

    // The || sign means "or"
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        // Multiplying by -1 will "flip" the direction
        yspeed *= -1;
        reduceLives();
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        reduceLives();
    }
}

function reduceLives() {
    lives -= 1;
    livesText.setText(`Lives: ${lives}`);
    checkGameOver();
}

function checkGameOver() {
    if (lives <= 0) {
        lives = 0;
        livesText.setText('Lives: 0');
        gameOverText.setVisible(true);
        ball.setVisible(false);
    }
}
