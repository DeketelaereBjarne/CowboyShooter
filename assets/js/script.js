
$(document).ready(function(){
    let config = {
        type: Phaser.AUTO,
        width:800,
        height:600,
        physics:{
            default:'arcade',
            arcade: {
                gravity: {y:300},
                debug:false
            }
        },
        scene: {
            preload:preload,
            create:create,
            update:update
        }
    };
    let game = new Phaser.Game(config);

});

let platform;

function preload(){
    console.log("preload called");
    this.load.image('sky','assets/media/pvpbackground.jpg');
    this.load.image('ground','assets/media/ground.png');
}
function create(){
    console.log("create called");
    let background = this.add.sprite(400,300,'sky');
    background.scaleX = 1.2;
    background.scaleY = 1.25;
    platform = this.physics.add.staticGroup();
    platform.create(400,580,'ground').setScale(1).refreshBody();
}
function update() {
    
}