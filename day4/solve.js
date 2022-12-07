const fs = require('fs');

const data = fs.readFileSync('./inputs/day4/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.slice(0, datalines.length-1);


let elf1_low, elf1_high, elf2_low, elf2_high;
let total = 0;
let total2 = 0;
for (row of datalines) {
	[elf1_low, elf1_high, elf2_low, elf2_high] = row.split(/[,-]/).map(Number);
	if (
		(elf1_low >= elf2_low && elf1_high <= elf2_high) ||
		(elf2_low >= elf1_low && elf2_high <= elf1_high)
	) {
		total += 1;
	};


	if (
		(elf1_low >= elf2_low && elf2_high >= elf1_low)  ||
		(elf1_high >= elf2_low && elf2_high >= elf1_high) ||
		(elf2_low >= elf1_low && elf1_high >= elf2_low)  ||
		(elf2_high >= elf1_low && elf1_high >= elf2_high)

	) {
		total2 += 1;
	};
};

console.log(total, total2);
