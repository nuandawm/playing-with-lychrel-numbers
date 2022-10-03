const asciichart = require('asciichart')

const {computeMaxCallStackSize} = require("./performance-tools");
const {
  computeOneNineSixAlgoCycleFrequencies, oneNineSixAlgorithm, reverseDigitsAlgorithm
} = require('./palindrome-stuff')

// TODO figure out why the algo is stopping way before the max call stack limit
// const maxCallStackSize = computeMaxCallStackSize()
// console.log('max call stack size is', maxCallStackSize)
// const maxCycle = oneNineSixAlgorithm(reverseDigitsAlgorithm)(196).cycleCount
// console.log('max cycle count for 196', maxCycle)

const { resultCycleFrequencies, lychrelCandidates } = computeOneNineSixAlgoCycleFrequencies(oneNineSixAlgorithm(reverseDigitsAlgorithm))(1, 100, 1000)

const maxCycleCount = Object.keys(resultCycleFrequencies)
  .map(valueStr => parseInt(valueStr))
  .reduce((previousValue, currentValue) => currentValue > previousValue ? currentValue : previousValue, 0)

const maxFrequency = Object.values(resultCycleFrequencies)
  .reduce((previousValue, currentValue) => currentValue > previousValue ? currentValue : previousValue, 0)

console.log('result cycle frequencies', resultCycleFrequencies)
console.log('lychrel candidates-ish', lychrelCandidates)
console.log('max cycle count', maxCycleCount)
console.log('max frequency', maxFrequency)

console.log('\n')
const ENABLE_LOGARITHMIC_SCALE = false
let chartData = new Array(maxCycleCount)
for (let i=0; i<chartData.length; i++) {
  chartData[i] = i in resultCycleFrequencies
    ? (ENABLE_LOGARITHMIC_SCALE ? Math.log(resultCycleFrequencies[i]) : resultCycleFrequencies[i])
    : 0
}
console.log(asciichart.plot(chartData))
