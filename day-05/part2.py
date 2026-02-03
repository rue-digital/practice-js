def parseRanges(filepath):
    ranges = []
    with open(filepath, "r") as file:
        for line in file:

            if "-" in line:
                start = int(line.split("-")[0])
                end = int(line.split("-")[1])
                ranges.append([start, end])

    ranges.sort(key=lambda a: a[0])
    return ranges

def mergeRanges(ranges):
    merged_ranges = []

    i = 0
    while i < len(ranges):
        start = ranges[i][0]
        end = ranges[i][1]
        # if ranges overlap, update end value
        while i+1 < len(ranges) and end >= ranges[i+1][0]:
            end = max(end, ranges[i+1][1])
            i+=1
        merged_ranges.append([start, end])
        i+=1
    
    return merged_ranges

def part2(filepath):
    ranges = parseRanges(filepath)
    merged_ranges = mergeRanges(ranges)

    numberOfIds = 0
    for r in merged_ranges:
        numberOfIds += (r[1] - r[0] + 1)
    
    return numberOfIds
