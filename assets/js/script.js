let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    player1: {
        name: "Player 1",
    },
    player2: {
        name: "Player 2",
    },
    p2Name: "Player 2",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
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
    let game = new Phaser.Game(config);
});

let platform;
let player1;
let player2;
let keyboard;

function preload() {
    console.log("preload called");
    this.load.image('sky', 'assets/media/pvpbackground.jpg');
    this.load.image('ground', 'assets/media/ground.png');
    this.load.image('dude', 'assets/media/player.jpg');
}

function create() {
    console.log("create called");

    let background = this.add.sprite(400, 300, 'sky');
    background.scaleX = 1.2;
    background.scaleY = 1.25;
    platform = this.physics.add.staticGroup();
    platform.create(400, 580, 'ground').setScale(1).refreshBody();


    player1 = new Player(150,450,config.player1,this);
    player2 = new Player(350,450,config.player2,this);
    player1.setCollisionWith(platform);
    player1.setCollisionWith(player2.playerSprite);
    player2.setCollisionWith(platform);
    player2.setCollisionWith(player1.playerSprite);

    //TODO anims
    this.anims.create({
        key: 'left',
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'shoot',
        frameRate: 10,
        repeat: -1
    });

    keyboard = this.input.keyboard;

}

let handlePlayer1Keys = function(e){

    if (e.which==113) {
        player1.moveLeft();

        //player.anims.play('left', true);
    } else if (e.which==100) {
        player1.moveRight();

        //player.anims.play('right', true);
    } else {
        player1.playerSprite.setVelocityX(0);

    }
    if (e.which==122 && player1.playerSprite.body.touching.down)
    {
        player1.jump();
    }
};

let handlePlayer2Keys = function(){
    let cursors = keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player2.moveLeft();

        //player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player2.moveRight();

        //player.anims.play('right', true);
    } else {
        player2.playerSprite.setVelocityX(0);

    }
    if (cursors.up.isDown && player1.playerSprite.body.touching.down)
    {
        player2.jump();
    }
};

function update() {
    //console.log("update called");
    handlePlayer2Keys();
    $("body").keypress(handlePlayer1Keys);

}