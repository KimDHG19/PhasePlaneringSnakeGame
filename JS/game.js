let Game = {
	apple: {},
	squareSize: 20,
	updateDelay: 0,
	direction: 'right',
	new_direction: null,
	addNew: false,
	rez: 20,
	score: 0,
	counter: 0,
	frames: 0,

	food: null,

	snake: {
		snake: [],
		xDir: 1,
		yDir: 0,
	},


	preload: function () {
		game.load.image('snake', 'assets/image/snake.png');
		game.load.image('food', 'assets/image/apple.png');

		game.load.audio('eat', './assets/eat.m4a');
		game.load.audio('die', './assets/die.m4a');
	},

	create: function () {
		game.stage.backgroundColor = '#c1c7ff';
		this.cursors = game.input.keyboard.createCursorKeys();
		this.frames = 4;
		this.text = game.add.text(0, 0, this.score);
		let tmp_sprite = game.add.sprite(0, 0, 'snake');
		this.snake.snake = [tmp_sprite];
		tmp_sprite.height = this.rez;
		tmp_sprite.width = this.rez;

		this.eatSound = game.add.sound('eat');
		this.dieSound = game.add.sound('die');

		this.food = game.add.sprite(0, 0, 'food');
		this.food.height = this.rez;
		this.food.width = this.rez;

		this.snake.xDir = 1;
		this.snake.yDir = 0;

		this.placeFood();

		if (!game.device.desktop){
			this.addMobileInputs()

			this.button.events.onInputOver.add(this.addMobileInputs, this);
			this.button.events.onInputOut.add(this.addMobileInputs, this);
			this.button.events.onInputDown.add(this.addMobileInputs, this);
			this.button.events.onInputUp.add(this.addMobileInputs, this);

		}
	},

	addMobileInputs: function () {
		this.rightButton = game.add.sprite(50, 50, 'rightButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.events.onInputOver.add(function (){this.moveRight=true;}, this);
		this.rightButton.events.onInputOut.add(function (){this.moveRight=true;}, this);
		this.rightButton.events.onInputDown.add(function (){this.moveRight=true;}, this);
		this.rightButton.events.onInputUp.add(function (){this.moveRight=true;}, this);
		this.rightButton.alpha = 0.5;

		this.leftButton = game.add.sprite(300, 247, 'leftButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.events.onInputOver.add(function (){this.moveRight=true;}, this);
		this.leftButton.events.onInputOut.add(function (){this.moveRight=true;}, this);
		this.leftButton.events.onInputDown.add(function (){this.moveRight=true;}, this);
		this.leftButton.events.onInputUp.add(function (){this.moveRight=true;}, this);
		this.leftButton.alpha = 0.5;


		this.upButton = game.add.sprite(325, 267, 'upButton');
		this.upButton.inputEnabled = true;
		this.upButton.events.onInputOver.add(function (){this.moveRight=true;}, this);
		this.upButton.events.onInputOut.add(function (){this.moveRight=true;}, this);
		this.upButton.events.onInputDown.add(function (){this.moveRight=true;}, this);
		this.upButton.events.onInputUp.add(function (){this.moveRight=true;}, this);
		this.upButton.alpha = 0.5;


		this.downButton = game.add.sprite(300, 247, 'downButton');
		this.downButton.inputEnabled = true;
		this.downButton.events.onInputOver.add(function (){this.moveRight=true;}, this);
		this.downButton.events.onInputOut.add(function (){this.moveRight=true;}, this);
		this.downButton.events.onInputDown.add(function (){this.moveRight=true;}, this);
		this.downButton.events.onInputUp.add(function (){this.moveRight=true;}, this);
		this.downButton.alpha = 0.5;

	},


	update: function () {
		if (this.cursors.down.isDown) {
			this.snake.xDir = 0;
			this.snake.yDir = 1;
		} else if (this.cursors.up.isDown) {
			this.snake.xDir = 0;
			this.snake.yDir = -1;
		} else if (this.cursors.right.isDown) {
			this.snake.xDir = 1;
			this.snake.yDir = 0;
		} else if (this.cursors.left.isDown) {
			this.snake.xDir = -1;
			this.snake.yDir = 0;
		}

		this.counter += 0.1;

		if (this.counter > this.frames - 1 && this.counter < this.frames + 1) {
			this.counter = 0;
			if (this.snake.snake[0].x === this.food.x && this.snake.snake[0].y === this.food.y) {
				this.eat();
				this.placeFood();
			}
			this.updateSnake();
		}

		if (this.isDead()) {
			console.log("test")
			this.die();
		}
	},


	eat: function () {
		this.eatSound.play();
		this.score++;
		this.text.text = this.score;

		let tmp_x, tmp_y;

		if (this.snake.yDir) {
			tmp_x = this.snake.snake[this.snake.snake.length-1].x;
			tmp_y = this.snake.snake[this.snake.snake.length-1].y - this.rez;
		} else  {
			tmp_x = this.snake.snake[this.snake.snake.length-1].x - this.rez;
			tmp_y = this.snake.snake[this.snake.snake.length-1].y;
		}

		let tmp_sprite = game.add.sprite(tmp_x, tmp_y, 'body');
		tmp_sprite.height = this.rez;
		tmp_sprite.width = this.rez;

		this.snake.snake.push(
			tmp_sprite
		);

		this.frames -= 0.1;
	},

	updateSnake: function () {
		let last_x = null, last_y = null;

		for (let i = 0; i < this.snake.snake.length; i++) {
			if (last_x !== null && last_y !== null) {
				const tmp_last_x = last_x;
				const tmp_last_y = last_y;

				last_x = this.snake.snake[i].x;
				last_y = this.snake.snake[i].y;

				this.snake.snake[i].x = tmp_last_x;
				this.snake.snake[i].y = tmp_last_y;
			}
			else {
				last_x = this.snake.snake[i].x;
				last_y = this.snake.snake[i].y;

				this.snake.snake[i].x += this.snake.xDir * this.rez;
				this.snake.snake[i].y += this.snake.yDir * this.rez;
			}
		}

	},

	placeFood:function () {
		let cols = Math.floor(game.width / this.rez);
		let rows = Math.floor(game.height / this.rez);

		this.food.x = (Math.floor(Math.random() * cols)) * this.rez;
		this.food.y = (Math.floor(Math.random() * rows)) * this.rez;
	},

	isDead: function () {
		console.log("test")
		let killZones = [];
		const snake_head = this.snake.snake[0];

		if (snake_head.y < 0 || snake_head.y > 400 || snake_head.x < 0 || snake_head.x > 400) {
			this.die();
			return
		}

		for (let i = 1; i < this.snake.snake.length- 2; i++) {
			killZones.push(this.snake.snake[i])
		}

		for (let i = 0; i < killZones.length; i++) {
			if (snake_head.x === killZones[i].x && snake_head.y === killZones[i].y) {
				this.die();
			}
		}

	},

	die: function () {
		this.dieSound.play();
		this.score = 0
		this.text.text = this.score;
		game.state.start('Game_Over');
		},
};


