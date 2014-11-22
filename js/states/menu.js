Game.States.Menu = function(game){
};

Game.States.Menu.prototype = {
	create: function(){
		// เพิ่ม ฉากหลัง
		this.background = this.game.add.sprite(0, 0, 'background');
		this.background.width = 320;

		// เพิ่มกลุ่ม
		this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
		// ทำ autoScroll( x , y);
		this.ground.autoScroll(-200, 0);

		// สร้างกลุ่มชื่อ titleGroup เอาไว้ทำ title และ bird เคลื่อไหว
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'title');
		this.titleGroup.add(this.title);

		this.bird = this.game.add.sprite(200, 5, 'bird');
		this.titleGroup.add(this.bird);

		// ทำ animations ให้นก
		this.bird.animations.add('flap');
		this.bird.animations.play('flap', 12, true);

		// เซ็ตตำแหน่ง กลุ่ม titleGroup
		this.titleGroup.x = 40;
		this.titleGroup.y = 100;

		// สร้าง การเคลื่อนที่ให้กลุ่ม titleGroup
		// .add.tween(object ที่จะทำ).to({ตำแหน่งที่จะไป}, ความเร็ว, รูปแบบ, ใช้งานหรือไม่, ตั้งแต่, ให้ทำ.ครั้ง, วน);
		this.game.add.tween(this.titleGroup).to({y: 115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

		// เพิ่ม ปุ่ม start
		this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	},

	startClick: function(){
		this.game.state.start('Play');
	},
};