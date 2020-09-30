let Menu = {

    preload: function () {
        console.log("menu.js create function");
        game.load.image('start-screen', 'assets/image/start-screen.png');
        console.log("menu.js create function");
    },

    create: function () {
        console.log("menu.js create function");
        this.add.button(0, 0, 'start-screen', this.startGame, this);

    },

    update: function () {

    },

    startGame: function () {
        this.state.start('Game');
    },

};

