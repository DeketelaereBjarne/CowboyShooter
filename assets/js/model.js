//here comes all objects
let Context = {
    canvas : null,
    context : null,
    create: function(canvasid){
        this.canvas = document.getElementById(canvasid);
        this.context = this.canvas.getContext('2d');
        return this.context;
    }
};


let Player = function(xPos,yPos,config,scene){
    console.log(this);
    this.name=config.name;
    this.config=config;
    this.playerSprite=scene.physics.add.sprite(xPos,yPos,'dude').setScale(0.2).setBounce(0.2).setCollideWorldBounds(true);
    this.width=0;
    this.height=0;
    this.setCollisionWith=function(sprite){
        scene.physics.add.collider(this.playerSprite, sprite);
    };

    this.moveLeft = function(){
        this.playerSprite.setVelocityX(-160);
    };
    this.moveRight = function(){
        this.playerSprite.setVelocityX(160);
    };
    this.jump=function(){
        this.playerSprite.setVelocityY(-330);
    };
    this.shoot=function(){

    };
};
