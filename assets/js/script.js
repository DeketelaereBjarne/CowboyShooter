let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    characterType: 'indian',
    player1: {
        name: "Player 1",
    },
    player2: {
        name: "Player 2",
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
$(document).ready(function () {
    //game = new Phaser.Game(config);
});
let game = new Phaser.Game(config);
let platform;
let player1;
let player2;
let keyboard;
let healthbarPlayer1;
let healthbarPlayer2;
let bullets;
let cursors;
let gameover;

function preload() {
    console.log("preload called");
    this.load.image('sky', 'assets/media/pvpbackground.jpg');
    this.load.image('ground', 'assets/media/ground.png');
    this.load.spritesheet('healthbar', 'assets/media/healthbar.png', {frameWidth: 490, frameHeight: 50});
    this.load.spritesheet('cowboy', 'assets/media/cowboy.png', {frameWidth: 328, frameHeight: 495});
    this.load.spritesheet('indian', 'assets/media/indian.png', {frameWidth: 240, frameHeight: 464});
    this.load.image('bullet', 'assets/media/bullet.png');

}

function create() {
    console.log("create called");

    let background = this.add.sprite(400, 300, 'sky');
    background.scaleX = 1.2;
    background.scaleY = 1.25;

    platform = this.physics.add.staticGroup();
    platform.create(400, 580, 'ground').setScale(1).refreshBody();


    player1 = new Player(150, 450, 90, config.player1, this, config.characterType);
    player2 = new Player(350, 450, 700, config.player2, this, config.characterType);
    player1.setCollisionWith(platform);
    player1.setCollisionWith(player2.playerSprite);
    player2.setCollisionWith(platform);
    player2.setCollisionWith(player1.playerSprite);


    bullets = [];
    bullets.enableBody = true;
    bullets.checkWorldBounds = true;


    bullets.collideWorldBounds = true;


    this.physics.add.overlap(bullets, player1.playerSprite, collisionhandler, null, this);
    this.physics.add.overlap(bullets, player2.playerSprite, collisionhandler, null, this);

    healthbarPlayer1 = this.add.text(10, 10, player1.name + "\nHealth " + player1.healthBar.getHealth(), {
        color: "black",
        font: "22px Impact"
    });

    healthbarPlayer2 = this.add.text(640, 10, player2.name + "\nHealth " + player2.healthBar.getHealth(), {
        color: "black",
        font: "22px Impact"
    });

    let message = "Game Over :( ... has won";
    gameover = this.add.text(220,100,message,{
        color:"black",
        font: "40px Impact"
    });
    gameover.visible=false;


    //TODO anims
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(config.characterType, {start: 2, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'pause',
        frames: [{key: config.characterType, frame: 2}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(config.characterType, {start: 2, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'shoot',
        frames: [{key: config.characterType, frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: [{key: config.characterType, frame: 5}, {key: config.characterType, frame: 2}],
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'dead',
        frames: [{key: config.characterType, frame: 6}],
        frameRate: 10,
        repeat: -1,
    });

    keyboard = this.input.keyboard;
    cursors = keyboard.createCursorKeys();
}

let collisionhandler = function (bullet, player) {
    bullet.destroy();
    if (cursors.space.isDown) {
        player1.takeDamage(10);
    } else {
        player2.takeDamage(10);
    }

};


let handlePlayer1Keys = function () {

    keyboard.on('keydown_Z',function(event){
        if(player1.playerSprite.body.touching.down){
            player1.jump();
        }
    });
    keyboard.on('keydown_Q',function(event){
        player1.moveLeft();
    });
    keyboard.on('keydown_D',function(event){
        player1.moveRight();
    });
    keyboard.on('keydown_S',function(event){
        player1.shoot();
    });

    player1.playerSprite.anims.play('pause');
    player1.playerSprite.setVelocityX(0);

};

let handlePlayer2Keys = function () {

    if (cursors.left.isDown) {
        player2.moveLeft();

    } else if (cursors.right.isDown) {
        player2.moveRight();

    } else {
        player2.playerSprite.setVelocityX(0);
        player2.playerSprite.anims.play('pause');

    }
    if (cursors.up.isDown && player2.playerSprite.body.touching.down) {
        player2.jump();
    }

    let currentTime = new Date();
    //(currentTime-player2.lastShot)/1000>=0.5

    if(cursors.space.isDown){
        player2.shoot(cursors.up,cursors.left,cursors.right);
    }
};


function update() {
    //console.log("update called");
    handlePlayer2Keys();
    handlePlayer1Keys();





    //healthbar
    player1.healthBar.updateHealthbar();
    player2.healthBar.updateHealthbar();
    healthbarPlayer1.setText(player1.name + "\nHealth " + player1.healthBar.getHealth());
    healthbarPlayer2.setText(player2.name + "\nHealth " + player2.healthBar.getHealth());

    //end of game
    //TODO check health and choose a winner.
    if(player1.healthBar.currentHealth==0){
        player1.playDead();
        gameOverMessage(player2);
    } else if(player2.healthBar.currentHealth==0){
        player2.playDead();
        gameOverMessage(player2);
    }

}

let gameOverMessage=function(deadplayer){
    let message = "Game Over :( "+deadplayer.name+" has won";
    gameover.setText(message);
    gameover.visible=true;

};