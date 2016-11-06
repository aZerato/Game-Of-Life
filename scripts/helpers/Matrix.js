var Matrix = (function() {
	
	var Matrix = function(x, y, ctx) {
		this.arr = [];

		for (var i = 0; i < x; i++)
		{
			this.arr.push([]);

			this.arr[i].push(new Array(y));

			for(var j = 0; j < y; j++)
			{
				this.arr[i][j] = new Cellule(i, j, 0, this.arr, ctx);
			}
		}
		return this.arr;
	};

	return Matrix;

})();