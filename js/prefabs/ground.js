Game.Prefabs.Ground = function(game, x, y, width, height){
	//ดึง Sprite ที่โหลดไว้แล้ว
	Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

	//ทำ auto scroll
	this.autoScroll(-200, 0);

	//เปิดใช้งาน Physics
	this.game.physics.arcade.enableBody(this);

	//ไม่ใช้งานแรงโนมถ่วง
	this.body.allowGravity = false;

	//กำหนดให้เป็นจุดหยุด
	this.body.immovable = true;
}
//ดึงคุณสมบัติเดิมที่เคยใช้
Game.Prefabs.Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Game.Prefabs.Ground.constructor = Game.Prefabs.Ground;

Game.Prefabs.Ground.prototype.update = function(){

};