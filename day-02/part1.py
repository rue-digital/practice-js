filepath = 'input.txt'

with open(filepath, 'r') as file:

    input = f.read()
    ranges = input.split(',')

    total = 0

    for r in ranges:
        start, end = r.split('-')

        for val in range(int(start), int(end)+1):

            string = str(val)
            if len(string) % 2 == 0:
                midpoint = len(str_val)//2
                firstHalf = str_val[:midpoint]
                secondHalf = str_val[midpoint:]

                if firstHalf == secondHalf:
                    total += val

    print(total)






