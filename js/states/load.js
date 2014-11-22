Game.States.Boot = function(game){
};

Game.States.Boot.prototype = {
	preload: function(){
		this.load.image('preloader', 'assets/preloader.gif');
	},

	create: function(){

	//ทำให้ Canvas อยู่ตรงกลาง
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;

	// เช็คว่า ถ้าไม่ได้ใช้งานบนคอมพิวเตอร์ ให้ทำ
	if(!this.game.device.desktop){
		this.scale.forceOrientation(false, true);
		this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
		this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
	}
	//แสดงเต็มหน้าจอ
	this.scale.setScreenSize(true);

	this.game.state.start('Preloader');

	},
	//	จะหยุดเกมแล้วแสดงรูป บอกให้เล่นในแนวตั้ง
	enterIncorrectOrientation: function(){
		if((window.innerWidth/window.innerHeight) >= 1.2){
			Game.orientated = false;
			this.game.paused = true;
			document.getElementById('orientation').style.display = 'block';
		}
	},
	//	เล่นต่อ
	leaveIncorrectOrientation: function(){
		Game.orientated = true;
		this.game.paused = false;
		this.scale.setScreenSize(true);
		document.getElementById('orientation').style.display = 'none';
	}
};
Game.States.Preloader = function(game){
	this.preloadBar = null;
	this.ready = false;
};

Game.States.Preloader.prototype = {
	preload: function(){
		this.game.stage.backgroundColor = '#666';

		this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		//ทำการ preload
		this.load.setPreloadSprite(this.preloadBar);
		//ถ้าโหลดเสร็จแล้วให้ไปที่ onLoadComplete
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

		// Images
		this.load.image('background', 'assets/background.png');
		this.load.image('ground', 'assets/ground.png');
		this.load.image('title', 'assets/title.png');
		this.load.image('startButton', 'assets/start-button.png');
		this.load.image('instructions', 'assets/instructions.png');
		this.load.image('getReady', 'assets/get-ready.png');
		this.load.image('scoreboard', 'assets/scoreboard.png');
		this.load.image('gameover', 'assets/gameover.png');
		this.load.image('particle', 'assets/particle.png');

		// Spritesheets
		this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
		this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);
		this.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);

		// Fonts
		this.load.bitmapFont('flappyFont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

		// Audio
		this.load.audio('score', 'assets/score.wav');
		this.load.audio('flap', 'assets/flap.wav');
		this.load.audio('hit', 'assets/hit.wav');
	},

	create: function(){
	},

	update: function(){
		//เช็คว่าโหลดเสร็จก็ย้าย state
		if(this.ready){
			this.game.state.start('Menu');
		}
	},

	onLoadComplete: function(){
		//เปลี่ยนค่าตัวแปร
		this.ready = true;
	}
};