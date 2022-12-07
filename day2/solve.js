const fs = require('fs');

const data = fs.readFileSync('./inputs/day2/input', 'utf8');

let total1 = 0
let total2 = 0

/*
A - Rock
B - Paper
C - Scissors

X - Rock
Y - Paper
Z - Scissors

X - Lose
Y - Draw
Z - Win
*/

const RPS = ["R", "P", "S"]
const map1 = {"A": "R", "B": "P", "C": "S"}
const map2 = {"X": "R", "Y": "P", "Z": "S"}
const map3 = {"X": 2, "Y": 0, "Z": 1}

for (game of data.split('\n')) {
    [opponent, me] = game.split(' ')
    opponent_m = map1[opponent]
    me_m = map2[me]
    total1 += 3*((RPS.indexOf(me_m) - RPS.indexOf(opponent_m) + 4) % 3)
    total1 += RPS.indexOf(me_m) + 1;

    total2 += (RPS.indexOf(opponent_m) + map3[me] + 3) % 3 + 1
    total2 += {"X": 0, "Y": 3, "Z": 6}[me]
};

console.log(total1, total2);
