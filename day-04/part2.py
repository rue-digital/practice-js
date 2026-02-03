filepath = "example.txt"

with open(filepath, "r") as file:
    grid = [list(line.strip("\n")) for line in file]

directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

rows = len(grid)
cols = len(grid[0])

totalAccessible = 0
updateGrid = []


while True:

    for row in range(rows):
        for col in range(cols):

            adjacentCount = 0

            if grid[row][col] == "." or grid[row][col] == "x":
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
                updateGrid.append([row, col])

    if not updateGrid:
        break

    for val in updateGrid:
        grid[val[0]][val[1]] = "x"

    updateGrid = []

assert totalAccessible == 43, f"expected 43, got {totalAccessible}"
print(f"total: {totalAccessible}")
