let load = {

	preload: function () {
		game.load.image('rightButton', 'assets/image/rightButton')
		game.load.image('leftButton', 'assets/image/leftButton')
		game.load.image('upButton', 'assets/image/upButton')
		game.load.image('downButton', 'assets/image/downButton')

	},

	create: function () {

	},

	update: function () {

	},

	startGame: function () {
		game.state.start('Menu');
	},

};