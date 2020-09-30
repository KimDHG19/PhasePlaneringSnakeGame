let Menu = {

    preload: function () {
        console.log("menu.js create function");
        game.load.image('start-screen', 'assets/image/start-screen.png');
    },

    create: function () {
        console.log("menu.js create function");
        this.add.button(0, 0, 'start-screen', this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game');
    },

};

