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
let HealthBar = function(){
    this.healthBarImage = null;
    this.incrValue = 5;
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    this.getHealth = function(){
        return this.currentHealth +" : "+this.maxHealth;
    };
    this.increase = function(){
        if ((this.currentHealth+this.incrValue)<this.maxHealth)
            this.currentHealth+=this.incrValue;
    };
    this.decrease = function(damage){
        if ((this.currentHealth-this.incrValue)>0) {
            this.currentHealth -= damage;
            if(this.currentHealth==0){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
};

let Player = function(xPos,yPos,config,scene){
    //console.log(this);
    this.healthBar = new HealthBar();
    this.name=config.name;
    this.config=config;
    this.playerSprite=scene.physics.add.sprite(xPos,yPos,'dude').setScale(0.2).setBounce(0.2).setCollideWorldBounds(true);
    this.width=0;
    this.height=0;
    this.setCollisionWith=function(sprite){
        scene.physics.add.collider(this.playerSprite, sprite);
    };
    this.takeDamage = function(damage){
        if(!this.healthBar.decrease(damage)){
            console.log("you died");
        }
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
