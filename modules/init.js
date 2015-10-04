// Sets up the model, view, and controller
(function() {
	function init() {
		gameOfLife.newGame = gameOfLife.Game(50);
		gameOfLife.newController = gameOfLife.Controller(gameOfLife.newGame, gameOfLife.Grid());
		gameOfLife.newController.start();
	}
	window.onload = init;
	document.getElementById("stop").disabled = true;
})();