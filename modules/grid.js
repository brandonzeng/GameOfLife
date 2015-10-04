// View for Game of Life
(function() {
	var Grid = function() {
		var game, rows, cols, newCells;

		// Updates the state of a given cell
		var setState = function(r, c) {
			var cell = newCells[c + r * game.newCells.length];
			cell.className = (game.newCells[r][c].alive) ? "cell alive" : "cell dead"; 
		};

		var that = Object.create(Grid.prototype);

		// Creates the board
		that.setup = function(newGame, elementID) {
			game = newGame;
			// Using the map functional to create arrays of indices
			rows = Array.apply(null, {length: game.newCells.length}).map(Number.call, Number);
			cols = Array.apply(null, {length: game.newCells[0].length}).map(Number.call, Number);
			
			// Selects the grid div in our document
			var element = document.getElementById(elementID === undefined ? 'grid' : elementID);
			
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					// Creates a cell with attached event listener
					var cell = document.createElement("cell");
					cell.addEventListener("click", that.click(r, c), false); 

					// Adds the cell to the document
					element.appendChild(cell);
				});
				// Adds a break between rows in the document
				element.appendChild(document.createElement("br"));
			});
			
			// Handle for all the cells
			newCells = element.getElementsByTagName("cell");
		}

		// Updates the cell states for the view
		that.refresh = function() {
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					setState(r, c);
				})
			})
		}

		// Allows for cell state updates by clicking
		that.click = function(r, c) {
			return function() {
				game.click(r, c);
				that.refresh();
			};
		}

		// Seals and makes all properties non-writable
		Object.freeze(that);
		
		return that;
	};

	// Adds to the global object
	gameOfLife.Grid = Grid;
})();