const fs = require('fs');
const filePath = 'input.txt';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);


let position = 50;
let hitsZero = 0;

for (const line of lines){
    const direction = line[0];
    const turns = Number(line.substring(1));

    if(direction == 'L'){
        let offset = turns % 100;
        position = (position - offset + 100) % 100;
    } else{
        position = (position + turns) % 100;
    }

    console.log(position);
    if (position === 0){
        hitsZero++;
    }
}

console.log(hitsZero);