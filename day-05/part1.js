import { readFile } from "node:fs/promises";

function parseInput(text) {
  const lines = text.split("\n");
  const ranges = [];
  const ids = [];

  let index = 0;
  while (lines[index].includes("-")) {
    const range = lines[index].split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    ranges.push([start, end]);
    index++;
  }

  index++;

  while (index < lines.length - 1) {
    ids.push(Number(lines[index]));
    index++;
  }

  ranges.sort((a, b) => a[0] - b[0]);
  ids.sort((a, b) => a - b);

  return { ids, ranges };
}

function countIdsInRange(ids, ranges) {
  let freshcount = 0;
  let idsIndex = 0;
  let rangeIndex = 0;

  while (idsIndex < ids.length && rangeIndex < ranges.length) {
    if (ids[idsIndex] > ranges[rangeIndex][1]) {
      rangeIndex++;
      continue;
    }
    if (
      ranges[rangeIndex][0] <= ids[idsIndex] &&
      ids[idsIndex] <= ranges[rangeIndex][1]
    ) {
      freshcount++;
    }
    idsIndex++;
  }

  return freshcount;
}

export async function part1(filepath) {
  const content = await readFile(filepath, "utf-8");
  const { ids, ranges } = parseInput(content);
  const freshcount = countIdsInRange(ids, ranges);
  return freshcount;
}
