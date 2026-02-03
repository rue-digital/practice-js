import { readFile } from 'node:fs/promises';
const filePath = 'input.txt';
const content = await readFile(filePath, 'utf-8');
const lines = content.split('\n');


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

    if (position === 0){
        hitsZero++;
    }
}

console.log("final : " + hitsZero);
