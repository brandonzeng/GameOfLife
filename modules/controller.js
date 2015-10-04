// Controller for Game of Life based on the model and view
(function() {
	var Controller = function(game, grid) {
		// Handle for our window
		var player;
		
		// Sets up the model on the view
		grid.setup(game);

		// Helper function to refresh the view
		var refresh = function() {
			grid.refresh();
		};

		var that = Object.create(Controller.prototype);
		
		// Sets the display rate
		that.play = function() {
			player = window.setInterval(that.step, 100)
		};
		
		// Starts the view
		that.start = function() {
			grid.refresh();
		};
		
		// Updates the view based on the model
		that.step = function() {
			game.update();
			grid.refresh();
		};
		
		// Stops the view from progressing
		that.stop = function() {
			if (player) {
				window.clearInterval(player);
			}
		};

		// Seals and makes all properties non-writable
		Object.freeze(that);
		
		return that;
	};

	// Adds to the global object
	gameOfLife.Controller = Controller;
	
	// Accessing our buttons using Jquery
	var playButton = $("#play");
	var stopButton = $("#stop");
	var clearButton = $("#clear");
	var randomButton = $("#random");
	var preset1Button = $("#preset1");
	var preset2Button = $("#preset2");

	// Runs the game, disabling the play button and enabling the stop button
	playButton.click(function() {
		gameOfLife.newController.play();
		document.getElementById("play").disabled = true;
		document.getElementById("stop").disabled = false;
	});

	// Stops the game, disabling the stop button and enabling the play button
	stopButton.click(function() {
		gameOfLife.newController.stop();
		document.getElementById("play").disabled = false;
		document.getElementById("stop").disabled = true;
	});

	// Clears the view
	clearButton.click(function() {
		gameOfLife.newController.stop(); 
		gameOfLife.newGame.clear(); 
		gameOfLife.newController.step();
		document.getElementById("play").disabled = false;
		document.getElementById("stop").disabled = true;
	});

	// Creates a randomized configuration
	randomButton.click(function() {
		gameOfLife.newController.stop(); 
		gameOfLife.newGame.randomize() 
		gameOfLife.newController.step();
		document.getElementById("play").disabled = false;
		document.getElementById("stop").disabled = true;
	});

	// Loads the first preset configuration
	preset1Button.click(function() {
		gameOfLife.newController.stop(); 
		gameOfLife.newGame.preset1();
		gameOfLife.newController.step();
		document.getElementById("play").disabled = false;
		document.getElementById("stop").disabled = true;
	});

	// Loads the second preset configuration
	preset2Button.click(function() {
		gameOfLife.newController.stop(); 
		gameOfLife.newGame.preset2(); 
		gameOfLife.newController.step();
		document.getElementById("play").disabled = false;
		document.getElementById("stop").disabled = true;
	});
})();


