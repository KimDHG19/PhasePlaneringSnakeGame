let boot = {

	preload: function () {


	},

	create: function () {
		if (!game.device.desktop) {
			game.scale.scaleMode = Phaser.Scale.Manager.SHOW_ALL;
			document.body.style.backgroundColor = '#3498db'

			game.scale.minWidth = 250;
			game.scale.minHeaight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxWidth = 680;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;

			game.scale.setScreenSize(true)
		}
	},

	update: function () {

	},

	startGame: function () {
		game.state.start('load');
	},

};