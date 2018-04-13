//here comes all objects
let Context = {
    canvas: null,
    context: null,
    create: function (canvasid) {
        this.canvas = document.getElementById(canvasid);
        this.context = this.canvas.getContext('2d');
        return this.context;
    }
};
let HealthBar = function (xPos, yPos, scene) {
    this.healthBarSprite = scene.add.sprite(xPos, yPos, 'healthbar').setScale(0.35);
    this.healthBarSprite.setFrame(16);
    this.incrValue = 5;
    this.maxHealth = 160;
    this.currentHealth = this.maxHealth;
    this.getHealth = function () {
        return this.currentHealth + " : " + this.maxHealth;
    };
    this.increase = function () {
        if ((this.currentHealth + this.incrValue) < this.maxHealth)
            this.currentHealth += this.incrValue;
    };
    this.decrease = function (damage) {
        if ((this.currentHealth - this.incrValue) > 0) {
            this.currentHealth -= damage;
            if (this.currentHealth == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };
    this.updateHealthbar = function () {
        this.healthBarSprite.setFrame(parseInt(this.currentHealth / 10));
    };
};


let Player = function (xPos, yPos, healthbarXPos, config, scene, type) {
    console.log(this);
    this.healthBar = new HealthBar(healthbarXPos, 70, scene);
    this.name = config.name;
    this.config = config;
    this.playerSprite = scene.physics.add.sprite(xPos, yPos, type).setScale(0.2).setBounce(0.2).setCollideWorldBounds(true);
    this.width = 0;
    this.height = 0;
    this.floating = false;
    this.draw = false;
    this.recharging = false;
    this.direction = 'right';
    this.setCollisionWith = function (sprite) {
        scene.physics.add.collider(this.playerSprite, sprite);
    };
    this.stand = function () {
        if (!this.draw) {
            this.playerSprite.anims.play('pause', true);
        }
        this.playerSprite.setVelocityX(0);
        this.floating = false;
    };
    this.playDead = function () {
        this.playerSprite.anims.play('dead', true);
        console.log("dead");
    };
    this.takeDamage = function (damage) {
        if (!this.healthBar.decrease(damage)) {
            console.log("you died");
        }
    };
    this.moveLeft = function () {
        this.playerSprite.flipX = true;
        this.playerSprite.anims.play('left', true);
        this.playerSprite.setVelocityX(-160);
        this.direction = 'left';
        this.draw = false;
    };
    this.moveRight = function () {
        this.playerSprite.flipX = false;
        this.playerSprite.anims.play('right', true);
        this.playerSprite.setVelocityX(160);
        this.direction = 'right';
        this.draw = false;

    };
    this.jump = function () {
        this.playerSprite.anims.play('jump');
        this.playerSprite.setVelocityY(-330);
        this.floating = true;
        this.draw = false;

    };
    this.shoot = function (up, left, right) {
        //let cursors = keyboard.createCursorKeys();
        this.playerSprite.anims.play('shoot');
        this.recharging = true;
        this.draw = true;
        if (up.isDown) {
            let bullet = scene.physics.add.sprite(this.playerSprite.x, this.playerSprite.y - 65, 'bullet').setScale(0.2);
            bullet.body.allowGravity = false;
            bullet.setVelocityY(-260);
            bullets.push(bullet);
        } else if (left.isDown || this.direction === 'left') {
            let bullet = scene.physics.add.sprite(this.playerSprite.x - 37, this.playerSprite.y, 'bullet').setScale(0.2);
            bullet.body.allowGravity = false;
            bullet.body.checkCollision = true;
            bullet.setVelocityX(-260);
            bullets.push(bullet);
        } else if (right.isDown || this.direction === 'right') {
            let bullet = scene.physics.add.sprite(this.playerSprite.x + 37, this.playerSprite.y, 'bullet').setScale(0.2);
            bullet.body.allowGravity = false;
            bullet.setVelocityX(260);
            bullets.push(bullet);
        }

    };
};

let Bullet = function (bullet) {
    this.bulletSprite = bullet;
    this.damage = 10;
    bullets.push(bullet);
};