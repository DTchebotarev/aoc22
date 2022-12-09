const fs = require('fs');

const data = fs.readFileSync('./inputs/day8/input', 'utf8');
let datalines = data.split('\n');

if  (datalines.slice(-1) == '') {
	datalines = datalines.slice(0, datalines.length-1);
};


datalines = datalines.map(x => x.split('').map(x => parseInt(x)));

//sensible solution for part 1

visibility_mask = Array(datalines.length).fill(undefined).map(x => new Array(datalines[0].length).fill(0));

let max_height;
function check (line, column) {
	if (datalines[line][column] > max_height) {
		max_height = datalines[line][column];
		visibility_mask[line][column] = 1;
	};
};

for (line in datalines) {
	max_height = -1;
	for (let column = 0; column < datalines[0].length; column++) {
		check (line, column);
	};
	max_height = -1;
	for (let column = datalines[0].length - 1; column >= 0; column--) {
		check (line, column);
	};
}

for (column in datalines[0]) {
	max_height = -1
	for (let line = 0; line < datalines.length; line++) {
		check (line, column);
	};
	max_height = -1;
	for (let line = datalines.length - 1; line >= 0; line--) {
		check (line, column);
	};
}
console.log(visibility_mask.flat().reduce((a, b) => a+b));

//refactor for parts 1 and 2

function get_trees( direction, row, column) {
	if (direction == 'up'){
		if (row == 0) { 
			return [];
		} else {
			return [datalines[row - 1][column]].concat(get_trees( direction , row - 1, column));
		};
	} else if (direction == 'down') {
		if (row == datalines.length - 1) { 
			return [];
		} else {
			return [datalines[row + 1][column]].concat(get_trees( direction , row + 1, column));
		};

	} else if (direction == 'left') {
		if (column == 0) { 
			return [];
		} else {
			return [datalines[row][column - 1]].concat(get_trees( direction , row, column - 1));
		};

	} else if (direction == 'right') {
		if (column == datalines[0].length - 1) { 
			return [];
		} else {
			return [datalines[row][column + 1]].concat(get_trees( direction , row, column + 1));
		};

	};

};


total = 0;

for (let r = 0; r < datalines.length; r++) {
	for (let c = 0; c < datalines[0].length; c++) {
		let own_height = datalines[r][c]
		let visible = false;
		for (direction of ['up', 'down', 'left', 'right']) {
			if (get_trees(direction, r, c).filter(x => x >= own_height).length == 0) {
				visible = true;
			};
		};
		if (visible) {total++};
	};
};

//confirm part 1 was correct
console.log(total);

let max_score = 0

for (let r = 0; r < datalines.length; r++) {
	for (let c = 0; c < datalines[0].length; c++) {
		let own_height = datalines[r][c]
		score = 1
		for (direction of ['up', 'down', 'left', 'right']) {
			const trees = get_trees(direction, r, c);
			const i = trees.findIndex(x => x >= own_height);
			if (trees.length == 0) {
				score *= 0;
			} else if (i == -1) {
				score *= trees.length;
			} else {
				score *= (i + 1);
			};
		};
		max_score = Math.max(score, max_score);
	};
};

console.log(max_score);
