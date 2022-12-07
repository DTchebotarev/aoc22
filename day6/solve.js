const fs = require('fs');

const data = fs.readFileSync('./inputs/day6/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.slice(0, datalines.length-1);

let buf = new Array(4).fill(datalines[0][0]);
let check ;
let total = 0;
for (c of datalines[0].split('')){
	total += 1;
	buf.shift();
	buf.push(c);
	if (new Set(buf).size == 4) {
		break;
	}
};

let total2 = 0;
buf = new Array(14).fill(datalines[0][0]);
for (c of datalines[0].split('')){
	total2 += 1;
	buf.shift();
	buf.push(c);
	if (new Set(buf).size == 14) {
		break;
	}
};
console.log(total, total2);
