import { readFile } from "node:fs/promises";

async function parse(filepath) {
  const content = await readFile(filepath, "utf-8");
  const grid = content.split("\n");
  return grid;
}

export async function part2(filepath) {
  const grid = await parse(filepath);
  const LENGTH = grid[0].length;
  let currRow = new Array(LENGTH).fill(0);
  currRow[grid[0].indexOf("S")] = 1;

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    if (!row.includes("^")) {
      continue;
    }
    let nextRow = new Array(LENGTH).fill(0);
    for (let col = 0; col < LENGTH; col++) {
      if (row[col] === "^" && currRow[col] !== 0) {
        if (col - 1 > -1) {
          nextRow[col - 1] += currRow[col];
        }
        if (col + 1 < LENGTH) {
          nextRow[col + 1] += currRow[col];
        }
      }
      if (row[col] === "." && currRow[col] !== 0) {
        nextRow[col] += currRow[col];
      }
    }
    currRow = nextRow;
  }
  return currRow.reduce((acc, val) => acc + val, 0);
}

const filepath = process.argv[2];
const totalTimelines = await part2(filepath);
console.log(totalTimelines);
