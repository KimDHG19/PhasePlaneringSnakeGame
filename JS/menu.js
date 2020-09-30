let Menu = {

    preload: function () {
        console.log("menu.js create function");
        game.load.image('start-screen', 'assets/image/start-screen.png');
        console.log("menu.js create function");
        game.load.audio('background', './assets/sound/background.mp3');
    },

    create: function () {
        console.log("menu.js create function");
        this.add.button(0, 0, 'start-screen', this.startGame, this);
        this.backgroundSound = game.add.sound('background', true);

    },

    update: function () {
        this.backgroundSound.loopFull();
    },

    startGame: function () {
        this.state.start('Game');
    },

};

