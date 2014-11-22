Game.Prefabs.PipeGroup = function(game, parent){
	//  เรียกใช้ Phaser.Group ที่สร้างไว้แล้ว
	Phaser.Group.call(this, game, parent);

	// สร้าง 2 ท่อ (บน, ล่าง)
	this.topPipe = new Game.Prefabs.Pipe(this.game, 0, 0, 0);
	this.add(this.topPipe);

	this.bottomPipe = new Game.Prefabs.Pipe(this.game, 0, 440, 1);
	this.add(this.bottomPipe);

	this.width = this.topPipe.width;

	this.hasScored = false;

	// กำหนดให้ทั้งหมดไปทางซ้าย
	this.setAll('body.velocity.x', -200);
}
//เรียกใช้คุณสมบิตเดิม
Game.Prefabs.PipeGroup.prototype = Object.create(Phaser.Group.prototype);
Game.Prefabs.PipeGroup.constructor = Game.Prefabs.PipeGroup;

Game.Prefabs.PipeGroup.prototype.update = function(){
	this.checkWorldBounds();
};
//ใช้งานเมื่อ เลื่อนไปสุดหน้าจอเกมแล้ว ทำการรีเซ้ตค่า
Game.Prefabs.PipeGroup.prototype.reset = function(x, y){
	this.topPipe.reset(0, 0);
	this.bottomPipe.reset(0, 440);

	this.x = x;
	this.y = y;

	this.setAll('body.velocity.x', -200);

	this.exists = true;

	this.hasScored = false;
};

Game.Prefabs.PipeGroup.prototype.checkWorldBounds = function(){
	if(!this.topPipe.inWorld){
		this.exists = false;
	}
};
//หยุดการเคลื่อนที่
Game.Prefabs.PipeGroup.prototype.stop = function(){
	this.setAll('body.velocity.x', 0);
};