var Cellule = (function() {
	
	var Cellule = function(
		posX, 
		posY,
        state,
        cellules,
		ctx)
	{
		this.typeOf = 'Cellule';

		this.posX = posX;

		this.posY = posY;
		
		// state level : 0 : birth / 1 : life / 2 : unhealthy / 3 : onelife
		this.state = 0;

        this.cellules = cellules;

		// canvas context
		this.ctx = ctx;

		this.changeState(state, this.ctx);
	};

	Cellule.prototype.changeState = function(state, ctx) {
		var self = this;

		if(state == 1)
		{
			self.state = state;
			self.ctx.fillStyle = "blue";
			self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
            self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
        else if(state == 0)
		{
			self.state = state;
            self.ctx.fillStyle = "white";
            self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
			self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
	};

    Cellule.prototype.evolution = function() {
        var self = this;

        // get rounded cells.
        var arr = [];
        
        var cellCornerTopLeft = self.cellules.tryGet(self.posX - 1, self.posY + 1, undefined);
        if (cellCornerTopLeft != undefined && cellCornerTopLeft.state != 0) arr.push(cellCornerTopLeft);
        var cellCornerTopMiddle = self.cellules.tryGet(self.posX, self.posY + 1, undefined);
        if (cellCornerTopMiddle != undefined && cellCornerTopMiddle.state != 0) arr.push(cellCornerTopMiddle);
        var cellCornerTopRight = self.cellules.tryGet(self.posX + 1, self.posY + 1, undefined);
        if (cellCornerTopRight != undefined && cellCornerTopRight.state != 0) arr.push(cellCornerTopRight);

        var cellCornerLeft = self.cellules.tryGet(self.posX - 1, self.posY, undefined);
        if (cellCornerLeft != undefined && cellCornerLeft.state != 0) arr.push(cellCornerLeft);
        var cellCornerRight = self.cellules.tryGet(self.posX + 1, self.posY, undefined);
        if (cellCornerRight != undefined && cellCornerRight.state != 0) arr.push(cellCornerRight);

        var cellCornerBottomLeft = self.cellules.tryGet(self.posX - 1, self.posY - 1, undefined);
        if (cellCornerBottomLeft != undefined && cellCornerBottomLeft.state != 0) arr.push(cellCornerBottomLeft);
        var cellCornerBottomMiddle = self.cellules.tryGet(self.posX, self.posY - 1, undefined);
        if (cellCornerBottomMiddle != undefined && cellCornerBottomMiddle.state != 0) arr.push(cellCornerBottomMiddle);
        var cellCornerBottomRight = self.cellules.tryGet(self.posX + 1, self.posY - 1, undefined);
        if (cellCornerBottomRight != undefined && cellCornerBottomRight.state != 0) arr.push(cellCornerBottomRight);

        if(arr.length == 2)
        {
            //stay.
        }
        if ( arr.length == 3) 
        {
            self.changeState(1);
        }
        else if (arr.length < 2 || arr.length > 3)
        {
            self.changeState(0);
        }
    };

	return Cellule;
})();