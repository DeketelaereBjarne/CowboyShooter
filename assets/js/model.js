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
let HealthBar = function(xPos,yPos,scene){
    this.healthBarSprite = scene.add.sprite(xPos,yPos,'healthbar').setScale(0.35);
    this.healthBarSprite.setFrame(16);
    this.incrValue = 5;
    this.maxHealth = 160;
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
    };
    this.updateHealthbar = function(){
        this.healthBarSprite.setFrame(parseInt(this.currentHealth/10));
    };
};


let Player = function(xPos,yPos,healthbarXPos,config,scene){
    console.log(this);
    this.healthBar = new HealthBar(healthbarXPos,70,scene);
    this.name=config.name;
    this.config=config;
    this.playerSprite=scene.physics.add.sprite(xPos,yPos,'cowboy').setScale(0.2).setBounce(0.2).setCollideWorldBounds(true);
    this.width=0;
    this.height=0;
    this.setCollisionWith=function(sprite){
        scene.physics.add.collider(this.playerSprite, sprite);
    };
    this.playDead =function(){
        console.log("dead");
    };
    this.takeDamage = function(damage){
        if(!this.healthBar.decrease(damage)){
            console.log("you died");
        }
    };
    this.moveLeft = function(){
        this.playerSprite.flipX = true;
        this.playerSprite.anims.play('left',true);
        this.playerSprite.setVelocityX(-160);
    };
    this.moveRight = function(){
        this.playerSprite.flipX = false;
        this.playerSprite.anims.play('right',true);
        this.playerSprite.setVelocityX(160);
    };
    this.jump=function(){
        this.playerSprite.anims.play('jump');
        this.playerSprite.setVelocityY(-330);
    };
    this.shoot=function(){
        let cursors = keyboard.createCursorKeys();
        this.playerSprite.anims.play('shoot');
        if(cursors.up.isDown){
            let bullet =scene.physics.add.sprite(this.playerSprite.x,this.playerSprite.y-65,'bullet').setScale(0.2);
            bullet.body.allowGravity=false;
            bullet.setVelocityY(-260);
            bullets.push(bullet);
        } else if(cursors.left.isDown){
            let bullet =scene.physics.add.sprite(this.playerSprite.x-37,this.playerSprite.y,'bullet').setScale(0.2);
            bullet.body.allowGravity=false;
            bullet.body.checkCollision=true;
            bullet.setVelocityX(-260);
            bullets.push(bullet);
        } else if(cursors.right.isDown){
            let bullet =scene.physics.add.sprite(this.playerSprite.x+37,this.playerSprite.y,'bullet').setScale(0.2);
            bullet.body.allowGravity=false;
            bullet.setVelocityX(260);
            bullets.push(bullet);
        }


    };
};

let Bullet = function(bullet){
    this.bulletSprite=bullet;
    this.damage=10;
    bullets.push(bullet);
};