const fs = require('fs');

const data = fs.readFileSync('./inputs/day5/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.slice(0, datalines.length-1);

let setup = datalines.slice(0,8);
let instructions = datalines.slice(10,datalines.length);

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

let transposed_array = transpose(setup.reverse().map(x => x.split('')));
// filter junk rows
transposed_array = transposed_array.filter(x => x[0].match(/[A-Z]/));
// filter empty spaces
transposed_array = transposed_array.map(x => x.filter(y => y != ' '));
t2 = structuredClone(transposed_array);

let t;
let iter;

function move (from, to, quantity) {
	iter = quantity
	while (iter > 0) {
		t = transposed_array[from - 1].pop()
		transposed_array[to - 1].push(t);
		iter = iter-1;
	}
};

let from_array, to_array
function move2 (from, to, quantity) {
	from_array = t2[from - 1]
	t = from_array.slice(from_array.length - quantity, from_array.length)
	from_array = from_array.slice(0,from_array.length - quantity);
	t2[from - 1] = from_array;
	t2[to - 1] = t2[to - 1].concat(t);
}

let quantity, from, to;
for (i of instructions) { 
	[quantity, from, to] = i.match(/\d+/g)
	move (from, to, quantity);
	move2 (from, to, quantity);
};

console.log(transposed_array.map(x => x[x.length - 1]).join(''));
console.log(t2.map(x => x[x.length - 1]).join(''));


