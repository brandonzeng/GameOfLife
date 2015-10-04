// Model for Game of Life
(function() {
	var Game = function (size) {
		// Cell component of the game
		var LifeCell = function () {
			var nextState;

			var that = Object.create(LifeCell.prototype);

			// Stores the state of the cell
			that.alive = false;

			// Toggles the state of the cell if clicked
			that.click = function() {
				that.alive = !that.alive;
			}

			// Stores the neighbors of the cell
			that.neighbors = [];

			// Uses the reduce functional to count number of live neighbors
			that.liveNeighbors = function() {
				return that.neighbors.reduce(function(a, b) {
					return a + b.alive;
				}, 0);
			}

			// Updates the state of the cell
			that.updateCell = function() {
				if (nextState === undefined) {
					that.getNextState();
				}
				that.alive = nextState;
				nextState = undefined;
			}

			// Determines the state of the cell depending on its neighbors
			that.getNextState = function() {
				if (nextState === undefined) {
					var liveCount = that.liveNeighbors();
					nextState = liveCount === 3 || (that.alive && liveCount === 2);
				}
				return nextState;
			}

			// Prevents extensions and makes all properties unconfigurable, as neighbors is modified
			Object.seal(that);

			return that;
		};

		// Uses the map functional to create arrays of indices
		var rows = Array.apply(null, {length: size}).map(Number.call, Number)
		var cols = Array.apply(null, {length: size}).map(Number.call, Number)
		
		// Private function that Wraps indices around the grid at edges
		var getNeighborIndices = function(i) {
			if (i === 0) {
				return [size - 1, i, 1];
			}
			else if (i === size - 1) {
				return [size - 2, i,  0];
			}
			else {
				return [i - 1, i, i + 1];
			}
		}

		// Private function that identifies the neighbors of all the cells
		var setNeighbors = function() {
			// Adds LifeCells to newCells defined below
			rows.forEach(function(r) {
				that.newCells[r] = [];
				cols.forEach(function(c) {
					that.newCells[r][c] = LifeCell();
				})
			})
			// Adds to the neighbors lists of all cells
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					horizontal = getNeighborIndices(r)
					vertical = getNeighborIndices(c)
					horizontal.forEach(function(h) {
						vertical.forEach(function(v) {
							that.newCells[r][c].neighbors.push(that.newCells[h][v]);
						})
					})
					// Removes the cell itself from its neighbors array
					that.newCells[r][c].neighbors.splice(4, 1);
				})
			})
		}

		var that = Object.create(Game.prototype);

		// Stores the game cells
		that.newCells = []

		// Toggles the state of the cell if clicked
		that.click = function(r, c) {
			that.newCells[r][c].click();
		}

		// Updates the state of all cells
		that.update = function() {
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					that.newCells[r][c].getNextState();
				})
			})
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					that.newCells[r][c].updateCell();
				})
			})
		}

		// Clears the model
		that.clear = function() {
			// Turns all cells off
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					that.newCells[r][c].alive = false;
				})
			})
		}

		// Creates a random model
		that.randomize = function() {
			that.clear();

			// Turns cells on with probability 1/4
			rows.forEach(function(r) {
				cols.forEach(function(c) {
					that.newCells[r][c].alive = (Math.random() < 0.25);
				});
			});
		};
		
		// Creates a preset model
		that.preset1 = function() {
			that.clear();

			rows.forEach(function(r) {
				cols.forEach(function(c) {
					// Selects the cells along the diagonals of the game 
					if (r === c || (r + c === size - 1)) {
						that.newCells[r][c].alive = true;
					}
				})
			})
		}

		// Creates a preset model
		that.preset2 = function(game) {
			that.clear();

			rows.forEach(function(r) {
				cols.forEach(function(c) {
					// Selects the middle rows and columns of the game
					if (r === size / 2 || c === size / 2) {
						that.newCells[r][c].alive = true;
					}
				})
			})
		}

		// Creates the list of neighbors for all cells
		setNeighbors();
		
		// Prevents extensions and makes all properties unconfigurable, as newCells is modified
		Object.seal(that);

		return that;
	};

	// Adds to the global object
	gameOfLife.Game = Game;
})();