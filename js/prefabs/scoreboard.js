Game.Prefabs.Scoreboard = function(game, parent){
	var gameover;

	// เรียกใช้ Phaser.Group ที่สร้างไว้แล้ว
	Phaser.Group.call(this, game, parent);

	// Gameover
	gameover = this.create(this.game.width/2, 100, 'gameover');
	gameover.anchor.setTo(0.5, 0.5);

	this.scoreboard = this.create(this.game.width/2, 200, 'scoreboard');
	this.scoreboard.anchor.setTo(0.5, 0.5);

	this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyFont', '', 18);
	this.add(this.scoreText);

	this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyFont', '', 18);
	this.add(this.bestScoreText);

	// Start button
	this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
	this.startButton.anchor.setTo(0.5, 0.5);
	this.add(this.startButton);

	this.y = this.game.height;
	this.x = 0;
}

Game.Prefabs.Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Game.Prefabs.Scoreboard.constructor = Game.Prefabs.Scoreboard;

Game.Prefabs.Scoreboard.prototype.update = function(){
};

Game.Prefabs.Scoreboard.prototype.show = function(score){
	var medal, bestScore;

	this.scoreText.setText(score.toString());
	//ถ้ามีข้อมูลใน localStorage (เป็นหน่วยความจำชั่วคราว Html5)
	if(!!localStorage){
		//ทำการดึง bestScore จาก localStorage มาใส่ในตัวแปร bestScore
		bestScore = parseInt(localStorage.getItem('bestScore'), 10);
		//ถ้าไม่มี bestScore หรือ bestScore น้อยกว่า คะแนนล่าสุด
		if(!bestScore || bestScore < score){
			//ให้เปลี่ยน คะแนนปัจจุบันเป็น bestScore
			bestScore = score;
			//นำไปบันทึกไว้บน localStorage
			localStorage.setItem('bestScore', bestScore);
		}
	}else{
		bestScore = 'N/A';
	}
	//แสดง bestScore
	this.bestScoreText.setText(bestScore.toString());
	//ถ้า คะแนน มากกว่าหรือเท่ากับ 10 แต่น้อยกว่า 20 (10ถึง19)
	if(score >= 10 && score < 20){
		//แสดงเหรียญ เงิน
		medal = this.game.add.sprite(-65, 7, 'medals', 1);
		medal.anchor.setTo(0.5, 0.5);
		this.scoreboard.addChild(medal);
	//ถ้าคะแนนมากกว่าหรือเท่ากับ 20 (20++)
	}else if(score >= 20){
		//แสดงเหรียญ ทอง
		medal = this.game.add.sprite(-65, 7, 'medals', 0);
		medal.anchor.setTo(0.5, 0.5);
		this.scoreboard.addChild(medal);
	}
/*
	// Particles
	if(medal){
		var emitter = this.game.add.emitter(medal.x, medal.y, 400);
		this.scoreboard.addChild(emitter);
		emitter.width = medal.width;
		emitter.height = medal.height;

		emitter.makeParticles('particle');

		emitter.setRotation(-100, 100);
		emitter.setXSpeed(0, 0);
		emitter.setYSpeed(0, 0);
		emitter.minParticleScale = 0.25;
		emitter.maxParticleScale = 0.25;
		emitter.setAll('body.allowGravity', false);

		emitter.start(false, 1000, 1000);
	}
*/
	// Show scoreboard
	this.game.add.tween(this).to({y:0}, 1000, Phaser.Easing.Bounce.Out, true);
};

Game.Prefabs.Scoreboard.prototype.startClick = function(){
	this.game.state.start('Play');
};