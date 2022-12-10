#/bin/zsh
if [ -z ${SESSION_COOKIE+x} ]
then
	echo "SESSION_COOKIE is unset, set it plz"
	exit 1
fi
mkdir ./inputs/day$1
mkdir day$1
curl --user-agent "https://github.com/DTchebotarev/aoc22/blob/main/setup.sh by dmitri@tchebotarev.com" --cookie session=$SESSION_COOKIE https://adventofcode.com/2022/day/$1/input > ./inputs/day$1/input
touch ./day$1/solve.js
cat << EOF >> ./day$1/solve.js
const fs = require('fs');

const data = fs.readFileSync('./inputs/day$1/input', 'utf8');
let datalines = data.split('\n');
datalines = datalines.filter(x => x!= '');
EOF
