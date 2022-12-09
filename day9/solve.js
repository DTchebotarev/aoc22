const fs = require('fs');

const data = fs.readFileSync('./inputs/day9/input', 'utf8');
let datalines = data.split('\n');
if (datalines.slice(-1) == '') {
	datalines = datalines.slice(0, datalines.length-1);
};

let expanded = [];

for (line of datalines) {
	[motion, number] = line.split(' ');
	for (i = 0; i < number; i++) {
	expanded.push(motion);
	}
}

function clamp (x) {
	return Math.min(1,Math.max(-1,x))
}

class Knot {
	constructor (num_tails, order = 1) {
		this.x = 0;
		this.y = 0;
		this.order = order
		if (num_tails > 1) {
		this.next_knot = new Knot(num_tails - 1, order + 1);
		};
		this.visited = []
	};

	move_head(direction) {
		if (motion == 'R') {
			this.x ++
		} else if (motion == 'L') {
			this.x --
		} else if (motion == 'U') {
			this.y ++
		} else if (motion == 'D') {
			this.y --
		};
		this.next_knot.move_tail(this.x, this.y);
	};

	move_tail (x, y) {
		if (Math.abs(y - this.y) > 1) {
			this.y += clamp(y - this.y)
			this.x += clamp(x - this.x)
		}
		else if (Math.abs(x - this.x) > 1) {
			this.x += clamp(x - this.x)
			this.y += clamp(y - this.y)
		}
		this.visited.push([this.x, this.y])
		if (this.next_knot){
			this.next_knot.move_tail(this.x, this.y);
		}

	}

	visited_spots(order) {
		if (this.order == order) {
			return new Set(this.visited.map(x => JSON.stringify(x))).size
		} else {
			return this.next_knot.visited_spots(order)
		};
	};
}

head = new Knot(10);

for (motion of expanded) {
	head.move_head(motion);
}

console.log(head.visited_spots(2));
console.log(head.visited_spots(10));

