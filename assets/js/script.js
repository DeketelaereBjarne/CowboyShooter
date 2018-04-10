$(document).ready(function () {
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        player1: {
            name: "Player 1",
            left:"Q",
            right:"D",
            jump:"Z",
            shoot:"S"
        },
        player2: {
            name: "Player 2",
            left:"left",
            right:"right",
            jump:"up",
            shoot:"down"
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
    let game = new Phaser.Game(config);

});

let platform;
let player;
let secondplayer;
let cursors;

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

    player = this.physics.add.sprite(150, 450, 'dude').setScale(0.2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);



    secondplayer = this.physics.add.sprite(350, 450, 'dude').setScale(0.2);
    secondplayer.setBounce(0.2);
    secondplayer.setCollideWorldBounds(true);

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

    this.physics.add.collider(player, platform);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    console.log("update called");
    //when actions are performed

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        //player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        //player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

}