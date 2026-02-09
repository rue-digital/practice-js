import subprocess
import part1


def test_part1_sample():
    numberOfSplits = part1.part1("sample.txt")
    assert numberOfSplits == 21, f"expected 21, got {numberOfSplits}"


def test_part1():
    numberOfSplits = part1.part1("input.txt")
    assert numberOfSplits == 1690, f"expected 1690, got {numberOfSplits}"


def test_part2_sample():
    res = subprocess.run(["node", "part2.js", "sample.txt"], capture_output=True)
    totalTimelines = int(res.stdout.decode("ascii"))
    assert totalTimelines == 40, f"expected 40, got {totalTimelines}"


def test_part2():
    res = subprocess.run(
        ["node", "part2.js", "input.txt"],
        capture_output=True,
    )
    totalTimelines = int(res.stdout.decode("ascii"))
    assert (
        totalTimelines == 221371496188107
    ), f"expected 221371496188107, got {totalTimelines}"
