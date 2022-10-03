const { oneNineSixAlgorithm, oneNineSixAlgorithmNonRecursive, reverseDigitsAlgorithm } = require('./palindrome-stuff')
const { computeSimpleBenchmark} = require('./performance-tools')

// performance analysis of the two versions of the 196 algorithm
const recursiveBenchmark = []
const nonRecursiveBenchmark = []
const LOOPS = 10
for (let counter = 0; counter < LOOPS; counter++) {
  console.log('analysis in progress...', `${(counter / LOOPS) * 100}%`)
  recursiveBenchmark.push(computeSimpleBenchmark(() => {
    for (let i = 1000; i < 30000; i++) {
      oneNineSixAlgorithm(reverseDigitsAlgorithm)(i, 1000)
    }
  }))

  nonRecursiveBenchmark.push(computeSimpleBenchmark(() => {
    for (let i = 1000; i < 30000; i++) {
      oneNineSixAlgorithmNonRecursive(reverseDigitsAlgorithm)(i, 1000)
    }
  }))
}

console.log('recursive benchmark', recursiveBenchmark
  .map(el => el.milliseconds)
  .reduce((prev, curr) => curr + prev, 0) / LOOPS)
console.log('non-recursive benchmark', nonRecursiveBenchmark
  .map(el => el.milliseconds)
  .reduce((prev, curr) => curr + prev, 0) / LOOPS)
