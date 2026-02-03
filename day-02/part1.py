filepath = "input.txt"

with open(filepath, "r") as file:

    input = file.read()
    ranges = input.split(",")

    symmetricalCount = 0

    for r in ranges:
        start, end = r.split("-")

        for val in range(int(start), int(end) + 1):

            intInRange = str(val)
            if len(intInRange) % 2 == 1:
                continue
            
            midpoint = len(intInRange) // 2
            firstHalf = intInRange[:midpoint]
            secondHalf = intInRange[midpoint:]

            if firstHalf == secondHalf:
                symmetricalCount += val

    print(symmetricalCount)
