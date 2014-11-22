window.onload = function(){

	// Create phaser game
	var phaser = new Phaser.Game(Game.Dimensions.PORTRAIT_WIDTH, Game.Dimensions.PORTRAIT_HEIGHT, Phaser.AUTO, Game.domID);

	// Load states
	phaser.state.add('Boot', Game.States.Boot);
	phaser.state.add('Preloader', Game.States.Preloader);
	phaser.state.add('Menu', Game.States.Menu);
	phaser.state.add('Play', Game.States.Play);

	// Load game
	phaser.state.start('Boot');
};