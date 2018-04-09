//here comes all objects


let ShapeDimension = function(xPos,yPos){
    this.x=xPos;
    this.y=yPos;
};

let Player = function(xPos,yPos){
    ShapeDimension.call(xPos,yPos);
    this.width=0;
    this.height=0;
    this.moveLeft = function(){
        this.x--;
    };
    this.moveRight = function(){
        this.x++;
    };
    this.jump=function(){

    };
    this.cover=function(){

    };
    this.draw=function(){

    };
};

Player.prototype = Object.create(ShapeDimension.prototype);
Player.prototype.constructor = ShapeDimension;
let Level = function(){

};