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

function preload(){
    console.log("preload");
}
function create(){
    console.log("create");
    
}
function update() {
    
}