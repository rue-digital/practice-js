import { readFile } from "node:fs/promises";

async function parse(filePath) {
  const content = await readFile(filePath, "utf-8");
  const lines = content.trim().split("\n");

  const points = [];

  for (const line of lines) {
    const xyz = line.split(",").map((curr) => Number(curr));
    points.push(xyz);
  }

  return points;
}

async function part1(filePath) {
  const points = await parse(filePath);
  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i; j < points.length; j++) {
      const area =
        (Math.abs(points[i][0] - points[j][0]) + 1) *
        (Math.abs(points[i][1] - points[j][1]) + 1);
      maxArea = Math.max(maxArea, area);
    }
  }
  return maxArea;
}

export { part1 };
