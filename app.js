var cnv = document.getElementById("cnv-main");
var width = cnv.width = 900;
var height = cnv.height = 600;
var ctx = cnv.getContext("2d");

var map = [width / 10];
for (var i = 0; i < width / 10; i++)
	map[i] = [height / 10];

for (var i = 0; i < width / 10; i++) {
	for (var j = 0; j < height / 10; j++) {
		map[i][j] = parseInt(Math.random() * 3) + 1;
	}
}

var World = function() {
	this.time = 0;
	this.tick = function() {

		this.time++;

		document.getElementById("health").innerHTML = e.health;
		document.getElementById("time").innerHTML = this.time;

		if (e.health > 0) {
			if (map[e.x][e.y] == 1) {
				e.die();
			}
			if (this.time % 4 == 0) {
				e.health--;
			}
		}

		if (map[e.x][e.y] == 2) {
			map[e.x][e.y] = 3;
			e.health++;
		}

	};
}

var Entity = function() {
	
	this.health = 10;
	this.x = parseInt(Math.random() * width / 10) + 1;
	this.y = parseInt(Math.random() * height / 10) + 1;

	this.move = function() {
		var eat = {}, normal = {};
		for (var i = this.x - 1; i <= this.x + 1; i++) {
			for (var j = this.y - 1; j <= this.y + 1; j++) {
				if ((i != this.x || j != this.y) && i < width / 10 && i >= 0 && j < height / 10 && j >= 0) {
					console.log(map[i][j], i, j);
					if (map[i][j] == 2) {
						eat.x = i;
						eat.y = j;
					} 
					else if(map[i][j] == 3) {
						normal.x = i;
						normal.y = j;
					}
				}
			}
		}
		if (eat.x != null && e.y != null) {
			this.x = eat.x;
			this.y = eat.y;
		}
		else if(normal.x != null && normal.y != null) {
			this.x = normal.x;
			this.y = normal.y;
		}
	};

	this.die = function() {
		this.health = 0;
		console.log("die :(")
	};

}

var e = new Entity();
var w = new World();

function draw() {
	
	ctx.clearRect(0, 0, width, height);

	w.tick();

	for (var i = 0; i < width / 10; i++) {
		for (var j = 0; j < height / 10; j++) {
			switch(map[i][j]) {
				case 1: 
					ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
					break;
				case 2:
					ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
					break;
				case 3:
					ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
					break;
			}
			ctx.fillRect(i*10, j*10, 10, 10);
		}
	}

	if (e.health > 0) {
		ctx.fillStyle = "black";
		e.move();
	}
	else {
		ctx.fillStyle = "rgba(30, 30, 30, 0.6)";
	}
	ctx.fillRect(e.x*10, e.y*10, 10, 10);

	setTimeout(draw, 500);

}

draw();