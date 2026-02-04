import { readFile } from "node:fs/promises";

function parseInput(text) {
  let lines = text.split("\n");
  lines = lines.filter((a) => a != "");
  let grid = lines.map((line) => line.split(" "));
  grid = grid.map((line) => line.filter((a) => a != ""));
  return grid;
}

export async function part1(filepath) {
  const content = await readFile(filepath, "utf-8");
  const grid = parseInput(content);

  let result = 0;
  for (let col = 0; col < grid[0].length; col++) {
    const operation = grid[grid.length - 1][col];
    let acc = operation === "+" ? 0 : 1;
    for (let row = 0; row < grid.length - 1; row++) {
      if (operation === "+") {
        acc += Number(grid[row][col]);
      } else {
        acc *= Number(grid[row][col]);
      }
    }
    result += acc;
  }
  return result;
}

const filepath = process.argv[2];
const totalSum = await part1(filepath);
console.log(totalSum);
