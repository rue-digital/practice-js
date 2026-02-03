import subprocess
import part2

def test_part1_sample():
    res = subprocess.run(
        ["node", "part1.js", "example.txt"],
        capture_output=True
    )
    numberOfIds = int(res.stdout.decode('ascii'))
    assert numberOfIds == 3, f"expected 3, got {numberOfIds}"

def test_part1():
    res = subprocess.run(
        ["node", "part1.js", "input.txt"],
        capture_output=True,
    )
    numberOfIds = int(res.stdout.decode('ascii'))
    assert numberOfIds == 505, f"expected 505, got {numberOfIds}"

def test_part2_sample():
    numberOfIds = part2.part2("example.txt")
    assert numberOfIds == 14, f"expected 14, got {numberOfIds}"

def test_part2():
    numberOfIds = part2.part2("input.txt")
    assert numberOfIds == 344423158480189, f"expected 344423158480189, got {numberOfIds}"