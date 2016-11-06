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

		if(state == 0)
		{
			self.state = state;
			self.ctx.fillStyle = "green";
			self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
            self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
		else if(state == 1)
		{
			self.state = state;
			self.ctx.fillStyle = "blue";
			self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
            self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
		else if(state == 2)
		{
			self.state = state;
			self.ctx.fillStyle = "red";
			self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
            self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
		else if(state == 3)
		{
			self.state = state;
			self.ctx.fillStyle = "yellow";
			self.ctx.fillRect(self.posX * 10, self.posY * 10, 10, 10);
            self.ctx.strokeStyle = "black";
			self.ctx.strokeRect(self.posX * 10, self.posY * 10, 10, 10);
		}
        else if(state == 4)
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

        if (self.state == 1 
            || self.state == 4) 
        {
            // get rounded cells.
            var arr = [];
            
            var cellCornerTopLeft = self.cellules.tryGet(self.posX - 1, self.posY + 1, undefined);
            if (cellCornerTopLeft != undefined && cellCornerTopLeft.state != 4) arr.push(cellCornerTopLeft);
            var cellCornerTopMiddle = self.cellules.tryGet(self.posX, self.posY + 1, undefined);
            if (cellCornerTopMiddle != undefined && cellCornerTopMiddle.state != 4) arr.push(cellCornerTopMiddle);
            var cellCornerTopRight = self.cellules.tryGet(self.posX + 1, self.posY + 1, undefined);
            if (cellCornerTopRight != undefined && cellCornerTopRight.state != 4) arr.push(cellCornerTopRight);

            var cellCornerLeft = self.cellules.tryGet(self.posX - 1, self.posY, undefined);
            if (cellCornerLeft != undefined && cellCornerLeft.state != 4) arr.push(cellCornerLeft);
            var cellCornerRight = self.cellules.tryGet(self.posX + 1, self.posY, undefined);
            if (cellCornerRight != undefined && cellCornerRight.state != 4) arr.push(cellCornerRight);

            var cellCornerBottomLeft = self.cellules.tryGet(self.posX - 1, self.posY - 1, undefined);
            if (cellCornerBottomLeft != undefined && cellCornerBottomLeft.state != 4) arr.push(cellCornerBottomLeft);
            var cellCornerBottomMiddle = self.cellules.tryGet(self.posX, self.posY - 1, undefined);
            if (cellCornerBottomMiddle != undefined && cellCornerBottomMiddle.state != 4) arr.push(cellCornerBottomMiddle);
            var cellCornerBottomRight = self.cellules.tryGet(self.posX + 1, self.posY - 1, undefined);
            if (cellCornerBottomRight != undefined && cellCornerBottomRight.state != 4) arr.push(cellCornerBottomRight);

            if(arr.length == 2 && cellCornerTopMiddle != undefined && cellCornerBottomMiddle != undefined && cellCornerLeft != undefined && cellCornerRight != undefined)
            {
                if(cellCornerTopMiddle != undefined && cellCornerBottomMiddle != undefined)
                {
                    cellCornerTopMiddle.changeState(4);
                    cellCornerBottomMiddle.changeState(4);
                    cellCornerLeft.changeState(0);
                    cellCornerRight.changeState(0);
                }
                if(cellCornerLeft != undefined && cellCornerRight != undefined)
                {
                    cellCornerTopMiddle.changeState(0);
                    cellCornerBottomMiddle.changeState(0);
                    cellCornerLeft.changeState(4);
                    cellCornerRight.changeState(4);
                }
            }
            if (arr.length == 3 && self.state == 4) 
            {
                self.changeState(0);
            }
            else if ((arr.length < 2 || arr.length > 3) && (self.state == 0 || self.state == 1))
            {
                self.changeState(2);
            }
        }
        else if (self.state == 0)
        {
            self.changeState(1);
        }
        else if (self.state == 2)
        {
            self.changeState(4);
        }
    };

	return Cellule;
})();