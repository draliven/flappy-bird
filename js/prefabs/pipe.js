Game.Prefabs.Pipe = function(game, x, y, frame){
	// เรียกใช้ Phaser.TileSprite ที่สร้างไว้แล้ว
	Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
	this.anchor.setTo(0.5, 0.5);

	//ใช้งาน Physics
	this.game.physics.arcade.enableBody(this);

	//ไม่ใช้แรงโน้มถ่วง
	this.body.allowGravity = false;
	//ให้เป็นจุดหยุด
	this.body.immovable = true;
}
//เรียกใช้คุณสมบิตเดิม
Game.Prefabs.Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefabs.Pipe.constructor = Game.Prefabs.Pipe;

Game.Prefabs.Pipe.prototype.update = function(){

};