Game.Prefabs.Bird = function(game, x, y, frame){
	// ดึง Sprite ที่โหลดไว้แล้ว
	Phaser.Sprite.call(this, game, x, y, 'bird', frame);

	this.anchor.setTo(0.5, 0.5);

	// เพิ่ม animations
	this.animations.add('flap');
	this.animations.play('flap', 12, true);

	this.alive = false;

	// ใช้งาน Physics
	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false;

	// ป้องกันไม่ให้ bird บินทับ object อื่น
	this.body.collideWorldBounds = true;

	// เสียง
	this.flapSound = this.game.add.audio('flap');
}

Game.Prefabs.Bird.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefabs.Bird.constructor = Game.Prefabs.Bird;

Game.Prefabs.Bird.prototype.update = function(){
	// เช็คองศาถ้าน้องกว่า 90องศาและ bird มีชีวิต ให้เพิ่มทีละ 2.5
	if(this.angle < 90 && this.alive){
		this.angle += 2.5;
	}
};
//ฟังชั่นนี่ทำงานเมื่อกด
Game.Prefabs.Bird.prototype.flap = function(){
	//ถ้านกมีชีวิต
	if(this.alive){
		// ขึ้นไปด้านบน 400
		this.body.velocity.y = -400;

		// องศาการตก
		this.game.add.tween(this).to({angle: -40}, 100).start();

		// เล่นเสียง
		this.flapSound.play();
	}
};
Game.Prefabs.Bird.prototype.die = function(){
	this.alive = false;
	//หยุด animation
	this.animations.stop();
	this.body.velocity.x = 0;
	//ให้เคลื่อนที่ลงด้วย 90 องศา
	var duration = 90 / this.y * 300;
	this.game.add.tween(this).to({angle: 90}, duration).start();
};