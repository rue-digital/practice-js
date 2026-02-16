import { readFile } from "node:fs/promises";

async function parse(filepath) {
  const content = await readFile(filepath, "utf-8");
  const lines = content.trim().split("\n");

  const points = [];

  for (const line of lines) {
    const xyz = line.split(",").map((curr) => Number(curr));
    points.push(xyz);
  }

  return points;
}

function calcDistance(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function makePairs(points) {
  let pairs = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      pairs.push([p1, p2, calcDistance(p1, p2)]);
    }
  }

  pairs.sort((a, b) => a[2] - b[2]);
  return pairs;
}

function makeConnections(points, pairs, connections) {
  let count = 0;
  let circuit = points.map((a) => {
    return new Set([JSON.stringify(a)]);
  });

  let connect;

  while (connections === -1 ? circuit.length !== 1 : count < connections) {
    connect = pairs[count];
    const p1 = JSON.stringify(connect[0]);
    const p2 = JSON.stringify(connect[1]);

    let combineCircuits = [];
    let alreadyConnected = false;
    for (let i = 0; i < circuit.length; i++) {
      if (circuit[i].has(p1) && circuit[i].has(p2)) {
        alreadyConnected = true;
      } else if (circuit[i].has(p1) || circuit[i].has(p2)) {
        combineCircuits.push(i);
      }
    }

    count++;
    if (alreadyConnected) continue;

    const union = new Set(combineCircuits.flatMap((i) => [...circuit[i]]));
    union.add(p1);
    union.add(p2);
    circuit.push(union);
    circuit = circuit.filter((_, i) => {
      return !combineCircuits.includes(i);
    });
  }
  circuit.sort((a, b) => b.size - a.size);
  return [circuit, connect];
}

async function solve(filepath, connections) {
  const points = await parse(filepath);
  const pairs = makePairs(points);
  const [circuit, lastConnection] = makeConnections(points, pairs, connections);
  return connections !== -1
    ? circuit[0].size * circuit[1].size * circuit[2].size
    : lastConnection[0][0] * lastConnection[1][0];
}

export { solve };
