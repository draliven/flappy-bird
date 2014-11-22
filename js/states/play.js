Game.States.Play = function(game){
	//กำหนดตัวแปร play เป็น false
	this.playing = false;
};

Game.States.Play.prototype = {
	create: function(){
		// เปิดใช้งาน Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//กำหนดแรงโน้มถ่วง
		this.game.physics.arcade.gravity.y = 1200;

		// ใส่ ฉากหลัง
		this.background = this.game.add.sprite(0, 0, 'background');
		this.background.width = 320;

		// สร้าง Bird โดนการดึงคุณสมบัติจากฟังชั่น Bird
		this.bird = new Game.Prefabs.Bird(this.game, 100, this.game.height/2);
		this.game.add.existing(this.bird);

		// สร้างกลุ่ม สำหรับท่อ(สิ่งกีดขวาง)
		this.pipes = this.game.add.group();

		// สร้าง Ground โดนการดึงคุณสมบัติจากฟังชั่น Ground
		this.ground = new Game.Prefabs.Ground(this.game, 0, 400, 335, 112);
		this.game.add.existing(this.ground);

		// รับค่า คีย์ Spacebar
		var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//รับค่าครั้งแรกให้ไปฟังชั่น startGame
		flapKey.onDown.addOnce(this.startGame, this);
		//เมื่อกดไปที่ฟังชั่น bird.flap
		flapKey.onDown.add(this.bird.flap, this.bird);

		// รับค่าการ ทัชสกีนหรือคลิ๊กเมาส์
		//รับค่าครั้งแรกให้ไปฟังชั่น startGame
		this.game.input.onDown.addOnce(this.startGame, this);
		//เมื่อกดไปที่ฟังชั่น bird.flap
		this.game.input.onDown.add(this.bird.flap, this.bird);

		// คำแนะนำก่อนเล่น
		this.instructionGroup = this.game.add.group();
		this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100, 'getReady'));
		this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325, 'instructions'));
		this.instructionGroup.setAll('anchor.x', 0.5);
		this.instructionGroup.setAll('anchor.y', 0.5);

		// Gameover
		this.gameover = false;

		// Score
		this.score = 0;
		this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyFont', this.score.toString(), 24);

		// Sounds
		this.scoreSound = this.game.add.audio('score');
		this.hitSound = this.game.add.audio('hit');

	},

	update: function(){

		// กำหนดการชนท่อ ให้ใช้งานฟังชั่น deathHandler
		this.pipes.forEach(function(pipeGroup){
			this.checkScore(pipeGroup);
			this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
		}, this);

		// กำหนดการชนพื้น ให้ใช้งานฟังชั่น deathHandler
		this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

	},
	//สร้าง ท่อ
	generatePipes: function(){
		// สุ่มตัวเลขระหว่าง -100 ถึง 100
		var pipeY = this.game.rnd.integerInRange(-100, 100);
		var pipeGroup = this.pipes.getFirstExists(false);

		//ถ้ายังไม่มีให้สร้าง
		if(!pipeGroup){
			pipeGroup = new Game.Prefabs.PipeGroup(this.game, this.pipes);
		}
		//สร้างเสร็จแล้วมารีเซ็ตค่า
		pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
	},

	deathHandler: function(bird, enemy){
		if(!this.gameover){
			this.gameover = true;
			this.playing = false;

			// Play sound
			this.hitSound.play();

			this.bird.die();

			//หยุด
			this.pipes.callAll('stop');
			this.pipeGenerator.timer.stop();
			this.ground.stopScroll();

			// โชว์ scoreboard
			this.scoreboard = new Game.Prefabs.Scoreboard(this.game);
			this.game.add.existing(this.scoreboard);
			this.scoreboard.show(this.score);

		}
	},

	shutdown: function(){
		//เมื่อปิดเกม
		//ยกเลิกการรับค่าจาก SPACEBAR
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);

		// ลบทุกอย่างเพื่อล้างค่า memory
		this.bird.destroy();
		this.pipes.destroy();
		this.scoreboard.destroy();
	},

	startGame: function(){
		//เช็คค่า ตัวแปร playing ถ้าไม่ใช่ true ให้ทำ ข้างในเงื่อนไข ถ้าเป็น true ก็ข้ามไป
		if(!this.playing){
			//เป็นการเซ้ตค่าให้ bird มีชีวิต
			this.playing = true;
			this.bird.body.allowGravity = true;
			this.bird.alive = true;

			// เมื่อเริ่มเล่นให้ใช้งานฟังชั่น generatePipes ทุกๆ 1.25วินาที
			this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
			this.pipeGenerator.timer.start();

			//เอาคำแนะนำออก
			this.instructionGroup.destroy();
		}
	},

	checkScore: function(pipeGroup){
		if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x){
			//ถ้า ผ่านท่อ และ ท่อนั้นยังไม่มีคะแนน และ ตำแหน่งในแนวนอนของท่อ น้อยกว่าเท่ากับ ของเกม
			//ท่อนี้มีคะแนนแล้ว
			pipeGroup.hasScored = true;
			//แสดงคะแนนบวก1
			this.score++;
			this.scoreText.setText(this.score.toString());
			//เล่นเสียง
			this.scoreSound.play();
		}
	}
};