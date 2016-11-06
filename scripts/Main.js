var Main = (function() {
	
	var Main = function($canvas, sizeX, sizeY)
	{
		this.$canvas = $canvas;

		this.sizeX = sizeX / 10;

		this.sizeY = sizeY / 10;

		this.interval = null;

		// canvas creation
		this.ctx = $canvas.getContext('2d');

		this.cellules = new Matrix(this.sizeX, this.sizeY, this.ctx);
	};

	Main.prototype.init = function() {
		var self = this;

        for(var i = 0; i < 300; i++) {
            self.initCellules();
            i++;
        }

		// create tempory state.
		self.AfterStep();
	};

    Main.prototype.initCellules = function() {
        var self = this;

        var celluleX = Math.floor((Math.random() * (self.sizeX - 1)) + 1);
        var celluleY = Math.floor((Math.random() * (self.sizeY - 1)) + 1);

		if (self.cellules[celluleX][celluleY].state == 0)
		{
        	self.cellules[celluleX][celluleY] = new Cellule(celluleX, celluleY, 1, self.ctx);
		}
    };

	Main.prototype.Play = function() {
		var self = this;

		self.interval = setInterval(function() {
			self.NextStep();
		}, 250);
	};

	Main.prototype.Stop = function() {
		var self = this;

		clearInterval(self.interval);
	};

	Main.prototype.NextStep = function() {
		var self = this;
		
		for (var i = 0; i < self.sizeX; i++)
		{
			for(var j = 0; j < self.sizeY; j++) 
			{
				var cell = self.cellules[i][j];
				cell.evolution(self.cellules);
			}
		}
		// create tempory state.
		var changed = self.AfterStep();
		if(changed == false)
		{
			alert('Evolution Max');
			self.Stop();
		}
	};

	Main.prototype.AfterStep = function()
	{
		var self = this;
		var changed = false;

		for (var i = 0; i < self.sizeX; i++)
		{
			for(var j = 0; j < self.sizeY; j++) 
			{
				var cell = self.cellules[i][j];
				changed = cell.temporaryState(self.cellules, changed);
			}
		}

		return changed;
	};

	return Main;

})();