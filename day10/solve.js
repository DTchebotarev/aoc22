const fs = require('fs');

const data = fs.readFileSync('./inputs/day10/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.filter(x => x!= '');

let clock = 1;
let register = 1;
let total = 0;
let buffer;

let wait = false;
while (datalines.length) {
	if ( Math.abs((clock-1) % 40 - register)  <= 1 ){
		process.stdout.write('#');
	} else {
		process.stdout.write('.');
	};
	if ( (clock ) % 40 == 0 ) {
		process.stdout.write(' '+ clock+ '\n');
	}


	const [l1, l2] = datalines[0].split(' ');
	if (l1 == 'addx' && wait == false) {
		wait = true;
	} else if (l1 == 'addx'){
		wait = false;
		register += parseInt(l2);
		datalines.shift()
	} else if (l1 == 'noop'){
		datalines.shift()
	};


	clock ++;

	if ([20,60,100,140,180,220].includes(clock)) {
		total += clock * register;
	};
}

console.log('\ntotal:', total);
