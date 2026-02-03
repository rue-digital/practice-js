# Understanding the problem

Given a list of ranges, find and sum all of the invalid IDs.

Invalid IDs contain a sequence of digits that are repeated twice. Examples:
- 55 (5 repeated twice)
- 6464 (64 repeated twice)
- 123123 (123 repeated twice)

note: Numbers with leading zeroes are not IDs (`0101`, for example).

# Observations

- Invalid IDs must have an even number of digits
- the sum of the number of digits in an invalid ID is even
- the first half and second half of the IDs are identical
- Ranges are inclusive
- Numbers can get big (trillions)
- Ranges do not overlap

# Brainstorming

## Brute Force
- go through each number in each range, one by one.
- if the number has an even number of digits, convert to a string.
- split the string in half
- if the first half is equal to the second half, add the number to a list for invalid ids.
- return the sum of the invalid id list.

## Example of a Range
Range: 92856246-93001520

- each number between this range has 8 digits
- the difference between these two numbers is 145274 (6 digits)
- Beginning from 92856246, the first invalid ID should be 92859285
- 92869286, 92879287, 92889288, 92899289, 92909290
- 92919291, 92929292, 92939293, 92949294, 92959295
- 92969296, 92979297, 92989298, 92999299

93009300, while being an invalidID, is outside of the range.

## Finding a Rule
- Assuming an ID is exactly a doubled block, such as `n|n`, one could increment `n` and check if `n|n` is still within the given range.

this would still require some string magic and conversion...

## A Numerical formula
92999299 is an invalid id<br>
let 9299 = n<br>
n * 10^(4) is first half 92990000<br>
n is second half<br>
92999299 = n * 10^(4) + n<br>
let k = number of digits of n<br>
92999299 = n * 10^(k) + n<br>
<br>
Range: 92856246-93001520<br>
<br>
the smallest id is 92859285, (9285 * 10^4 + 9285)<br>
the largest id is 93009300, (9300 * 10^4 + 9300)<br>
<br>
only need to return the sum of all ids :::<br>
Sum all the ids, from n = 9289 to 9300<br>
where an id = n * 10^(k) + n<br>
<br>
Sum(n * 10^k + n) = <br>
Sum(n * 10^k) + Sum(n) = <br>
S(n) * S(10^k) + S(n) = <br>
factor out S(n) <br>
**unsure how to factor the summation** <br>