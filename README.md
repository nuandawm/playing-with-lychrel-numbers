# Playing with Lychrel numbers

This is a small NodeJS project I created to play with [Lychrel numbers and the
196-algorithm](https://en.wikipedia.org/wiki/Lychrel_number)

## Getting started

Let's start getting all the dependencies:
```
npm install
```

There are two npm scripts available:
```
npm run start
```
will run a simple analysis of the results of the 196-algorithm for
the first 100 numbers.
The analysis will show the frequencies of the cycles needed to reach
a palindrome for each of the given numbers.
This will also (kind of) find the Lychrel number candidates
(I considered candidates those numbers the algorithm couldn't
find a palindrome in 1000 cycles for).
Finally, it will also show the frequencies in an ASCII chart usinng a
fun library I didn't know of
called [asciichart](https://github.com/kroitor/asciichart)

The second npm script:
```
npm run start-performance-analysis
```
will run a very simple benchmark analysis of two versions of the
196-algorithm (recursive vs non-recursive).

## Tests

I used the Jest library to test the code of the algorithms.
I tested the 196-algorithms (both versions) against some
wikipedia examples.

You can run all the tests with:
```
npm run test
```
or
```
npm run test-watch
```
