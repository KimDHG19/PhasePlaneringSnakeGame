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

		game.load.audio('eat', './assets/sound/eat.mp3');
		game.load.audio('die', './assets/sound/die.mp3');

		game.load.image('arrow', './assets/image/arrow.png');
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

		this.leftBtn = game.add.sprite(140, 340, 'arrow');
		this.upBtn = game.add.sprite(180, 300, 'arrow');
		this.rightBtn = game.add.sprite(220, 340, 'arrow');
		this.downBtn = game.add.sprite(180, 380, 'arrow');

		[this.leftBtn, this.upBtn, this.rightBtn, this.downBtn].forEach(btn => {
			btn.height = this.rez * 2;
			btn.width = this.rez * 2;
			btn.anchor.setTo(.5, .5);
			btn.inputEnabled = true;
		})

		this.leftBtn.angle -= 90;
		this.rightBtn.angle += 90;
		this.downBtn.angle += 180;

		this.leftBtn.events.onInputDown.add(this.mobileControl, this);
		this.upBtn.events.onInputDown.add(this.mobileControl, this);
		this.rightBtn.events.onInputDown.add(this.mobileControl, this);
		this.downBtn.events.onInputDown.add(this.mobileControl, this);

	},


	mobileControl: function (btn) {
		let x, y;

		switch (btn.angle) {
			case -180:
				// Down
				x = 0;
				y = 1;
				break;
			case 0:
				// Up
				x = 0;
				y = -1;
				break;
			case -90:
				// Left
				x = -1;
				y = 0;
				break;
			default:
				// Right (and other)
				x = 1;
				y = 0;
				break;
		}
		this.snake.xDir = x;
		this.snake.yDir = y;
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


