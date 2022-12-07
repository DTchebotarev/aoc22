const fs = require('fs');

const data = fs.readFileSync('./inputs/day1/input', 'utf8');

let elfs = [];

for (const row of data.split('\n')) {
	if (row == '') {
		elfs.push(0);
	} else {
		elfs[elfs.length - 1] += parseInt(row)
	}
};

elfs.sort(function(a, b){return b - a});

let total = 0

for (const el of elfs.slice(0,3)) {
	total+= el
	console.log(total);
};

