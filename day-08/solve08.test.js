import { solve } from "./solve08.js";

test("part 1 sample", async () => {
  expect(await solve("day-08/sample.txt", 10)).toBe(40);
});

test("part 1 input", async () => {
  expect(await solve("day-08/input.txt", 1000)).toBe(164475);
});

test("part 2 sample", async () => {
  expect(await solve("day-08/sample.txt", -1)).toBe(25272);
});

test("part 2 input", async () => {
  expect(await solve("day-08/input.txt", -1)).toBe(169521198);
});
