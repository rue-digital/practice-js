filepath = "example.txt"

with open(filepath, "r") as file:
    grid = [line.strip("\n") for line in file]

directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

rows = len(grid)
cols = len(grid[0])

totalAccessible = 0

for row in range(rows):
    for col in range(cols):

        adjacentCount = 0

        if grid[row][col] == ".":
            continue

        for d in directions:
            neighborX = row + d[0]
            neighborY = col + d[1]

            if (
                0 <= neighborX < rows
                and 0 <= neighborY < cols
                and grid[neighborX][neighborY] == "@"
            ):
                adjacentCount += 1

        if adjacentCount < 4:
            totalAccessible += 1

assert totalAccessible == 13, f"expected 13, got {totalAccessible}"
print(f"total: {totalAccessible}")
