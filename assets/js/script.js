
$(document).ready(function(){
    let config = {
        type: Phaser.AUTO,
        width:800,
        height:600,
        scene: {
            preload:preload,
            create:create,
            update:update
        }
    };
    let game = new Phaser.Game(config);

});



function preload(){
    console.log("preload called");
    this.load.image('sky','assets/media/pvpbackground.jpg');
}
function create(){
    console.log("create called");
    let background = this.add.sprite(400,300,'sky');
    background.scaleX = 1.2;
    background.scaleY = 1.25;
}
function update() {
    
}