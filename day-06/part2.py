import numpy as np


def parseInput(filepath):
    grid = []

    with open(filepath, "r") as file:
        for line in file:
            grid.append([l.replace(" ", "") for l in line])

    numbers = grid[: len(grid) - 1]  # excluding last row of operations
    operations = [x for x in grid[-1] if x != ""]
    return numbers, operations


# transpose grid and combine rows horizontally
def formatNumbers(numbers):
    numpy_array = np.array(numbers).astype(object)
    transposed = numpy_array.T
    combined = np.array(["".join(row) for row in transposed], dtype=object)
    return combined


def part2(filepath):
    numbers, operations = parseInput(filepath)
    operands = formatNumbers(numbers)

    opIndex = 0  # expressions can have a variable number of operands, which are separated by an empty string
    result = 0

    for i, operation in enumerate(operations):
        acc = 0 if operation == "+" else 1
        if opIndex >= len(operands):
            break
        while operands[opIndex].strip(): # while string is not empty
            value = int(operands[opIndex])
            if operation == "+":
                acc += value
            else:
                acc *= value
            opIndex += 1
        result += acc
        opIndex += 1

    return result
