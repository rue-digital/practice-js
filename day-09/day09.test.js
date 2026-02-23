import { part1 } from "./part1";
test("part 1 sample", async () => {
  expect(await part1("day-09/sample.txt")).toBe(50);
});

test("part 1 input", async () => {
  expect(await part1("day-09/input.txt")).toBe(4748769124);
});

test("part 2 sample", async () => {
  expect(await part1("day-09/sample.txt")).toBe(24);
});

test("part 2 input", async () => {
  expect(await part1("day-09/input.txt")).toBe(1525991432);
});
