const fs = require('fs');

const data = fs.readFileSync('./inputs/day11/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.filter(x => x!= '');

/*
Monkey 0:
  Starting items: 62, 92, 50, 63, 62, 93, 73, 50
  Operation: new = old * 7
  Test: divisible by 2
    If true: throw to monkey 7
    If false: throw to monkey 1

Monkey 1:
  Starting items: 51, 97, 74, 84, 99
  Operation: new = old + 3
  Test: divisible by 7
    If true: throw to monkey 2
    If false: throw to monkey 4

Monkey 2:
  Starting items: 98, 86, 62, 76, 51, 81, 95
  Operation: new = old + 4
  Test: divisible by 13
    If true: throw to monkey 5
    If false: throw to monkey 4

Monkey 3:
  Starting items: 53, 95, 50, 85, 83, 72
  Operation: new = old + 5
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 0

Monkey 4:
  Starting items: 59, 60, 63, 71
  Operation: new = old * 5
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 3

Monkey 5:
  Starting items: 92, 65
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 6
    If false: throw to monkey 3

Monkey 6:
  Starting items: 78
  Operation: new = old + 8
  Test: divisible by 3
    If true: throw to monkey 0
    If false: throw to monkey 7

Monkey 7:
  Starting items: 84, 93, 54
  Operation: new = old + 1
  Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 1


Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
*/


class Monkey {
	constructor (items, operation, test, true_monkey, false_monkey) {
		this.items = items.map(x => x);
		this.operation = operation;
		this.test = test;
		this.true_monkey = true_monkey;
		this.false_monkey = false_monkey;
		this.inspect_counter = 0;
	};

	inspect(part_2 = false, gcm = 0) {
		for (let item of this.items) {
			this.inspect_counter ++;
			item = this.operation(item);
			if (! part_2) {
			item = Math.floor(item/3);
			};
			item = item % gcm;
			if (item % this.test == 0) {
				//console.log('true', item_to_toss, this.test);
				monkeys[this.true_monkey].items.push(item);
			} else {
				//console.log('false', item_to_toss, this.test);
				monkeys[this.false_monkey].items.push(item);
			};
		};
		this.items = [];
	};
};
let m0 = new Monkey ([62, 92, 50, 63, 62, 93, 73, 50], x => x * 7, 2, 7, 1);
let m1 = new Monkey ([51, 97, 74, 84, 99], x => x + 3, 7, 2, 4);
let m2 = new Monkey ([98, 86, 62, 76, 51, 81, 95], x => x + 4, 13, 5, 4);
let m3 = new Monkey ([53, 95, 50, 85, 83, 72], x => x + 5, 19, 6, 0);
let m4 = new Monkey ([59, 60, 63, 71], x => x * 5, 11, 5, 3);
let m5 = new Monkey ([92, 65], x=> x * x, 5, 6, 3);
let m6 = new Monkey ([78], x => x + 8, 3, 0, 7);
let m7 = new Monkey ([84, 93, 54], x => x + 1, 17, 2, 1);

let monkeys = [m0, m1, m2, m3, m4, m5, m6, m7]


const gcm = monkeys.map(x => x.test).reduce((a,b) => a*b)
console.log(gcm);
for (i = 0; i < 20; i++){

	for (monkey of monkeys) { 
		monkey.inspect(part_2 = false, gcm);
	};
};

console.log( monkeys.map(x => x.inspect_counter).sort((a,b) => b - a))
console.log( monkeys.map(x => x.inspect_counter).sort((a,b) => b - a).slice(0,2).reduce((a, b) => a * b) );

m0 = new Monkey ([62, 92, 50, 63, 62, 93, 73, 50], x => x * 7, 2, 7, 1);
m1 = new Monkey ([51, 97, 74, 84, 99], x => x + 3, 7, 2, 4);
m2 = new Monkey ([98, 86, 62, 76, 51, 81, 95], x => x + 4, 13, 5, 4);
m3 = new Monkey ([53, 95, 50, 85, 83, 72], x => x + 5, 19, 6, 0);
m4 = new Monkey ([59, 60, 63, 71], x => x * 5, 11, 5, 3);
m5 = new Monkey ([92, 65], x=> x * x, 5, 6, 3);
m6 = new Monkey ([78], x => x + 8, 3, 0, 7);
m7 = new Monkey ([84, 93, 54], x => x + 1, 17, 2, 1);

monkeys = [m0, m1, m2, m3, m4, m5, m6, m7]

for (i = 0; i < 10000; i++){

	for (monkey of monkeys) { 
		monkey.inspect(part_2 = true, gcm);
	};
	
};

console.log( monkeys.map(x => x.inspect_counter).sort((a,b) => b - a))


console.log( monkeys.map(x => x.inspect_counter).sort((a,b) => b - a).slice(0,2).reduce((a, b) => a * b) );
