const fs = require('fs');

const data = fs.readFileSync('./inputs/day7/input', 'utf8');
let datalines = data.split('$');

class directory {
	constructor (name, par) {
		this.contents = [];
		this.dir_name = name;
		this.parent_dir = par;
	};
	add_contents (content) {
		if (!(this.contents.includes(content))) { 
			this.contents.push(content);
		};
	};
	get parent() {
		return this.parent_dir;
	};
	get name() {
		return this.dir_name;
	};
	get size() {
		let size = 0
		for (const c of this.contents) {
			size += c.size
		};
		return size;
	};

	find (find_name) {
		for (const c of this.contents) {
			if (c.name == find_name) { return c ;};
		};
	};

	tree () {
		return [this].concat(this.contents.filter(x => x.constructor.name == 'directory').map(x => x.tree()).flat())
	};
};

class file {
	constructor (size, name) {
		this.size_value = parseInt(size);
		this.file_name = name;
	};

	get name() {
		return this.file_name;
	}
	get size() {
		return this.size_value;
	}
};

let root_directory = new directory('root_directory', undefined);
let current_dir;

for (const block of datalines) {
	if (block == '') { continue ; } ; 
	command = block.split('\n')[0].trim();
	command_output = block.split('\n').slice(1,block.split('\n').length-1);
	if (command.startsWith('cd')) {
		target_dir = command.split(' ')[1]
		if (target_dir == '/') { current_dir = root_directory ;}
		else if (target_dir == '..') { current_dir = current_dir.parent}
		else { current_dir = current_dir.find(target_dir) ; };
	};

	if (command == 'ls') {
		for (const l of command_output){
			let [type, name] = l.split(' ');
			if (type == 'dir') {
				current_dir.add_contents(new directory(name, current_dir));
			} else {
				current_dir.add_contents(new file(type, name));
			};
		};
	};
	
};

let all_directories = root_directory.tree()

let total = 0;
let candidate_directories = [];
let free_space = 70000000 - root_directory.size;
let target = 30000000 - free_space ;
for (d of all_directories) {
	if (d.constructor.name == 'directory' && d.size <= 100000) {
		total += d.size
	};
	if (d.constructor.name == 'directory' && d.size >= target) {
		candidate_directories.push(d);
	};
};

console.log(total);
console.log(candidate_directories.sort((a, b) => a.size - b.size)[0].size);











