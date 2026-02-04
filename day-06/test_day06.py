import subprocess
import part2

def test_part1_sample():
    res = subprocess.run(
        ["node", "part1.js", "sample.txt"],
        capture_output=True
    )
    resultSum = int(res.stdout.decode('ascii'))
    assert resultSum == 4277556, f"expected 4277556, got {resultSum}"

def test_part1():
    res = subprocess.run(
        ["node", "part1.js", "input.txt"],
        capture_output=True,
    )
    resultSum = int(res.stdout.decode('ascii'))
    assert resultSum == 6295830249262, f"expected 6295830249262, got {resultSum}"

def test_part2_sample():
    resultSum = part2.part2("sample.txt")
    assert resultSum == 3263827, f"expected 3263827, got {resultSum}"

def test_part2():
    resultSum = part2.part2("input.txt")
    assert resultSum == 9194682052782, f"expected 9194682052782, got {resultSum}"