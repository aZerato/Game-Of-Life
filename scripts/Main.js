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
				if(cell.state == 1)
				{
					if (cell.step == 0)
					{
						cell.changeState(1, self.ctx, "green");
						changed = true;
					}
					else if (cell.step == 1)
					{
						cell.changeState(1, self.ctx);
						changed = true;
					}
					
					// get rounded cells.
					var arr = [];
					
					var cellCornerTopLeft = self.cellules.tryGet(cell.posX - 1, cell.posY + 1, undefined);
					if (cellCornerTopLeft != undefined && cellCornerTopLeft.state != 0) arr.push(cellCornerTopLeft);
					var cellCornerTopMiddle = self.cellules.tryGet(cell.posX, cell.posY + 1, undefined);
					if (cellCornerTopMiddle != undefined && cellCornerTopMiddle.state != 0) arr.push(cellCornerTopMiddle);
					var cellCornerTopRight = self.cellules.tryGet(cell.posX + 1, cell.posY + 1, undefined);
					if (cellCornerTopRight != undefined && cellCornerTopRight.state != 0) arr.push(cellCornerTopRight);

					var cellCornerLeft = self.cellules.tryGet(cell.posX - 1, cell.posY, undefined);
					if (cellCornerLeft != undefined && cellCornerLeft.state != 0) arr.push(cellCornerLeft);
					var cellCornerRight = self.cellules.tryGet(cell.posX + 1, cell.posY, undefined);
					if (cellCornerRight != undefined && cellCornerRight.state != 0) arr.push(cellCornerRight);

					var cellCornerBottomLeft = self.cellules.tryGet(cell.posX - 1, cell.posY - 1, undefined);
					if (cellCornerBottomLeft != undefined && cellCornerBottomLeft.state != 0) arr.push(cellCornerBottomLeft);
					var cellCornerBottomMiddle = self.cellules.tryGet(cell.posX, cell.posY - 1, undefined);
					if (cellCornerBottomMiddle != undefined && cellCornerBottomMiddle.state != 0) arr.push(cellCornerBottomMiddle);
					var cellCornerBottomRight = self.cellules.tryGet(cell.posX + 1, cell.posY - 1, undefined);
					if (cellCornerBottomRight != undefined && cellCornerBottomRight.state != 0) arr.push(cellCornerBottomRight);

					if (cell.step > 0 && (arr.length < 2 || arr.length > 3))
					{
						cell.changeState(1, self.ctx, "red");
						changed = true;
					}

					cell.step++;
				}
				else
				{
					cell.step = 0;
				}
			}
		}

		return changed;
	};

	return Main;

})();