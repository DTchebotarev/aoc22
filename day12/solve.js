const fs = require('fs');

const data = fs.readFileSync('./inputs/day12/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.filter(x => x!= '');


const grid = datalines.map(x => x.split(''))

let valid_paths 
let valid_paths_
let all_visited_coords;


const starting_r = grid.map(x => x.includes('S')).indexOf(true);
const starting_c = grid[starting_r].map(x => x.includes('S')).indexOf(true);
grid[starting_r][starting_c] = 'a'

const potential_starting_positions = []
for (row in grid) {
	for (column in grid[0]) {
		if (grid[row][column] == 'a') {
			potential_starting_positions.push([parseInt(row),parseInt(column)]);
		}
	};
};

function validate_coords (r, c, letter, path) {
	if (all_visited_coords.includes(JSON.stringify([r,c]))){
		return false;
	}
	if (path.includes(JSON.stringify([r,c]))){
		return false;
	}
	if (grid[r] == undefined){
		return false
	}
	if (grid[r][c] == undefined) {
		return false
	}
	if (grid[r][c] == 'E') {
		if ('z'.charCodeAt(0) - letter.charCodeAt(0) > 1) {
			return false
		}
		return true
	}
	if (grid[r][c].charCodeAt(0) - letter.charCodeAt(0) > 1) {
		return false
	}
	return true
};


function check_solution (paths) {
	for (path of paths){
		[r, c] = JSON.parse(path.slice(-1))
		if ( grid[r][c] == 'E' ) {
			return true;
		};
	};
	return false;
	
}

function findShortestPath(r_1, c_1, part_2 = false) {
	let solution_reached = false;
	all_visited_coords = []
	valid_paths = []
	valid_paths.push([JSON.stringify([r_1, c_1])]);
	while (!solution_reached){
		valid_paths_ = []
		for (path of valid_paths) {
			const [r, c] = JSON.parse(path.slice(-1)[0])
			for (const [r_next, c_next] of [[r+1, c], [r-1, c], [r, c+1], [r, c-1]]) {
				if (validate_coords(r_next, c_next, grid[r][c], path)){
					const new_path = structuredClone(path);
					new_path.push(JSON.stringify([r_next, c_next]));
					valid_paths_.push(new_path);
					all_visited_coords.push(JSON.stringify([r_next, c_next]));
				};
			};
		};
		solution_reached = check_solution(valid_paths_);
		if (JSON.stringify(valid_paths) == JSON.stringify(valid_paths_) && !solution_reached) {
			return undefined
		}
		valid_paths = structuredClone(valid_paths_)
	};
	return valid_paths.map(x => x.length).reduce((a, b) => Math.min(a,b)) - 1
}


console.log(findShortestPath(starting_r, starting_c))

console.log(potential_starting_positions.map(x => findShortestPath(x[0], x[1])).filter(x => x != undefined).reduce((a, b) => Math.min(a,b)));
