let Game_Over = {

    preload: function () {
        game.load.image('game-over', 'assets/image/game-over.png');

    },

    create: function () {
        game.stage.backgroundColor = '#06127';
        console.log("menu.js create function");
        this.add.button(0, 0, 'game-over', this.startGame, this);
    },

    update: function () {

    },

    startGame: function () {
        this.state.start('Game');
    },

};