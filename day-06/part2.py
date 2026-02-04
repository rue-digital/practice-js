import numpy as np 
import sys

WIDTH = 4
filepath='input.txt'
grid = []

## reading file
with open(filepath, "r") as file:
    for line in file:
        line.rstrip()
        chunks = [line[i:i+WIDTH] for i in range(0, len(line), WIDTH+1)]
        grid.append([c.replace(' ', '') for row in chunks for c in row ]) #puts every single integer alone
        # grid.append([row.replace(' ', '0') for row in chunks])
        # grid.append(chunks)
    
    # print(grid)
    numbers = grid[:WIDTH]
    NUM_OPERANDS = len(numbers)
    operations = [x for x in grid[-1] if x != '']
    # print(numbers)
    # print(operations)

# # formatting and transposing grid
numpy_array = np.array(numbers).astype(object)

print("START")
print(numpy_array)
transposed = numpy_array.T
print("TRANS")
print(transposed)
np.set_printoptions(threshold=sys.maxsize)
print("COMBINED")
# # now combine numbers horizontally into string, then convert to int
combined = np.array([''.join(row) for row in transposed], dtype=object)
print(combined)
combined = combined[:-1]

res = 0
for i, operation in enumerate(operations):
    acc = 0 if operation == "+" else 1
    for index in range(0, NUM_OPERANDS):
        if operation == "+":
            acc += int(combined[i*NUM_OPERANDS + index])
        else:
            acc *= int(combined[i*NUM_OPERANDS + index])
    print("NEXT")
    res += acc

print(res)


