const fs = require('fs');

const data = fs.readFileSync('./inputs/day3/input', 'ascii');
//const data = fs.readFileSync('./day3/test_input', 'ascii');
datalines = data.split('\n')
datalines = datalines.slice(0, datalines.length-1)

function half(str) {
	return [str.slice(0, str.length/2), str.slice(str.length/2, str.length)]
}

function match(str1, str2) {
	for (c of str1.split('')) {
		if (str2.includes(c)) {return c}
	}
}

function match3(str1, str2, str3) {
	for (c of str1.split('')) {
		if (str2.includes(c) & str3.includes(c)) {return c}
	}
}

function score(c) {
	let s
	try {
		if (c.toLowerCase() == c) {
		s = (c.toLowerCase().charCodeAt(0) + 7) % 26 + 1;
		}
		else {
		s = (c.toLowerCase().charCodeAt(0) + 7) % 26 + 27;
		}
	}
	catch (err) {
		console.log('error',c);
	}

	return s
}

total = 0
for (l of datalines) {
//	if (l == '') {continue};
	total += score(match(...half(l)))
	//console.log(l, score(match(...half(l))));
};

console.log(total);

total = 0;

let s1, s2, s3;
while (datalines.length) {
	s1 = datalines.pop();
	s2 = datalines.pop();
	s3 = datalines.pop();
	
	total += score(match3(s1,s2,s3));
}

console.log(total);
