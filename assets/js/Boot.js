let Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
    init:function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },
    preload:function(){
        this.load.image('preloaderBar','');
    },

    create: function(){
        this.state.start('Preloader');
    }
};