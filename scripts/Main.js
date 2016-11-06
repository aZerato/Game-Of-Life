var Main = (function() {
	
	var Main = function($canvas, sizeX, sizeY)
	{
		this.$canvas = $canvas;

		this.sizeX = sizeX / 10;

		this.sizeY = sizeY / 10;

		// canvas creation
		this.ctx = $canvas.getContext('2d');

		this.cellules = new Matrix(this.sizeX, this.sizeY, this.ctx);
	};

	Main.prototype.init = function() {
		var self = this;

        for(var i = 0; i < 10; i++) {
            self.initCellules();
            i++;
        }

		console.log(self.cellules);
	};

    Main.prototype.initCellules = function() {
        var self = this;

        var celluleX = Math.floor((Math.random() * (self.sizeX - 1)) + 1);
        var celluleY = Math.floor((Math.random() * (self.sizeY - 1)) + 1);

        self.cellules[celluleX][celluleY] = new Cellule(celluleX, celluleY, 0, self.cellules, self.ctx);
    };

	Main.prototype.NextStep = function() {
		var self = this;
		
		for (var i = 0; i < self.sizeX; i++)
		{
			for(var j = 0; j < self.sizeY; j++) 
			{
				self.cellules[i][j].evolution();
			}
		}
	};

	return Main;

})();