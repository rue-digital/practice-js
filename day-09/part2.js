import { readFile } from "node:fs/promises";
const filePath = "input.txt";
const content = await readFile(filePath, "utf-8");
const lines = content.trim().split("\n");
const bounds = new Map();

function updateBounds(prev, curr) {
  if (prev[0] === curr[0]) {
    /// x values are the same, y values different

    let max = Math.max(prev[1], curr[1]);
    let min = Math.min(prev[1], curr[1]);
    for (let y = min; y <= max; y++) {
      /// update bounds for each y
      const x = prev[0];
      const bound = bounds.get(y);
      const singleX = x;
      if (bound === undefined) {
        bounds.set(y, [[singleX]]);
      } else if (bound.at(-1).length == 2) {
        bound.push([singleX]);
        bounds.set(y, bound);
      } else {
        // last value is single, combine with it
        const lastVal = Number(bound.at(-1)[0]);
        const newBound = [Math.min(x, lastVal), Math.max(x, lastVal)];
        bound.pop();
        bound.push(newBound);
        bounds.set(y, bound);
      }
    }
  } else {
    /// y values the same, x values different
    const y = prev[1];
    const x = curr[0];
    const bound = bounds.get(y);
    const newBound = [Math.min(prev[0], curr[0]), Math.max(prev[0], curr[0])];
    if (bound === undefined) {
      bounds.set(y, [newBound]);
    } else if (bound.at(-1).length == 2) {
      bound.push(newBound);
      bounds.set(y, bound);
    } else {
      // last value is single, combine with it
      const lastVal = Number(bound.at(-1)[0]);
      const newBound = [Math.min(x, lastVal), Math.max(x, lastVal)];
      bound.pop();
      bound.push(newBound);
      bounds.set(y, bound);
    }
  }
}

const redPoints = [];
let prev = null;
for (const line of lines) {
  const xyz = line.split(",").map((curr) => Number(curr));
  redPoints.push(xyz);
  if (prev) {
    updateBounds(prev, xyz);
  }
  prev = xyz;
}

updateBounds(prev, redPoints[0]);
const update = bounds.get(redPoints[0][1]);
update.pop();
bounds.set(redPoints[0][1], update);

const intBounds = new Map();

for (const [key, list] of bounds) {
  const intList = [];
  for (const val of list) {
    intList.push(val);
  }
  intList.sort((a, b) => {
    return a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0];
  });
  intBounds.set(key, intList);
}

const merged = new Map();
for (const [key, list] of intBounds) {
  if (list.length === 1) {
    merged.set(key, list);
    continue;
  }
  const mergedList = [];
  for (let i = 0; i < list.length; i++) {
    let start = list[i][0];
    let end = list[i][1];

    while (i + 1 < list.length && end >= list[i + 1][0]) {
      end = Math.max(end, list[i + 1][0]);
      if (list[i + 1].length === 2) {
        end = Math.max(end, list[i + 1][1]);
      }
      i++;
    }
    mergedList.push([start, end]);
  }
  merged.set(key, mergedList);
}

let maxArea = 0;
for (let i = 0; i < redPoints.length; i++) {
  for (let j = i + 1; j < redPoints.length; j++) {
    const topRight = redPoints[i];
    const bottomLeft = redPoints[j];
    const xMin = Math.min(topRight[0], bottomLeft[0]);
    const xMax = Math.max(topRight[0], bottomLeft[0]);
    const yMin = Math.min(topRight[1], bottomLeft[1]);
    const yMax = Math.max(topRight[1], bottomLeft[1]);

    let isValid = true;
    let exist = false;

    for (let y = yMin; y <= yMax; y += 1) {
      const bound = merged.get(y);
      if (bound === undefined) {
        isValid = false;
        break;
      }
      exist = false;
      for (const val of bound) {
        if (
          xMin >= val[0] &&
          xMax >= val[0] &&
          xMin <= val[1] &&
          xMax <= val[1]
        ) {
          exist = true;
          break;
        }
      }
      if (exist === false) {
        break;
      }
    }
    if (exist === false || isValid === false) continue;

    const area = (xMax - xMin + 1) * (yMax - yMin + 1);
    maxArea = Math.max(maxArea, area);
  }
}

console.log(maxArea);
