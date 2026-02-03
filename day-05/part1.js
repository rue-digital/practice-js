import { readFile } from "node:fs/promises";

function parseInput(text) {
  const lines = text.split("\n");
  const ranges = [];
  const ids = [];

  // parse ranges
  let index = 0;
  while (lines[index].includes("-")) {
    const range = lines[index].split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    ranges.push([start, end]);
    index++;
  }

  index++;

  // parse ids
  while (index < lines.length - 1) {
    ids.push(Number(lines[index]));
    index++;
  }

  ranges.sort((a, b) => a[0] - b[0]);
  ids.sort((a, b) => a - b);

  return { ids, ranges };
}

function countIdsInRange(ids, ranges) {
  let numberOfInRangeIds = 0;

  for (let i = 0; i < ids.length; i++) {
    for (let r = 0; r < ranges.length; r++) {
      const [start, end] = ranges[r];
      if (start <= ids[i] && ids[i] <= end) {
        numberOfInRangeIds++;
        break; // move onto next id
      }
    }
  }

  return numberOfInRangeIds;
}

export async function part1(filepath) {
  const content = await readFile(filepath, "utf-8");
  const { ids, ranges } = parseInput(content);
  const numberOfInRangeIds = countIdsInRange(ids, ranges);
  return numberOfInRangeIds;
}

const filepath = process.argv[2];
const numberOfIds = await part1(filepath);
console.log(numberOfIds);
