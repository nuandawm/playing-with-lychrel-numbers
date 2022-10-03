// reverse a number
function reverseDigitsAlgorithm(natural) {
  const originalStr = String(natural)
  return parseInt(
    [...originalStr]
      .map((_, index) => originalStr[originalStr.length - index - 1])
      .join('')
  )
}

function reverseDigitsAlgorithmAlt(natural) {
  const originalStr = String(natural)
  return parseInt(
    [...originalStr]
      .reduce((prev, curr) => curr + prev, '')
  )
}

/*
 * reverse a number and add it to the original recursively until
 * a palindrome number has been found
 */
function oneNineSixAlgorithm(reverseAlgo) {
  return function(natural, cycleController) {
    let cycleCounter = 0
    function recursiveReverseAndAddUntilPalindrome(natural) {
      const reversed = reverseAlgo(natural)
      const isPalindrome = natural === reversed
      if (!isPalindrome) {
        cycleCounter += 1
        if (cycleController === undefined || cycleCounter < cycleController) {
          return recursiveReverseAndAddUntilPalindrome(natural + reversed)
        } else {
          return null
        }
      }
      return natural
    }

    let palindromeValue = null;
    try {
      palindromeValue = recursiveReverseAndAddUntilPalindrome(natural)
    } catch (e) {
      //console.log('error received', e.message)
    }

    return {
      result: palindromeValue,
      hasError: palindromeValue === null,
      cycleCount: cycleCounter
    }
  }
}

/*
 * reverse a number and add it to the original recursively until
 * a palindrome number has been found
 * (non-recursive version)
 */
function oneNineSixAlgorithmNonRecursive(reverseAlgo) {
  const MAX_CYCLE_COUNT = 1000000
  return function(natural, cycleController) {
    let cycleCounter = 0
    let isPalindrome = false
    let result = natural
    while(!isPalindrome) {
      const reversed = reverseAlgo(result)
      isPalindrome = result === reversed
      if (!isPalindrome) {
        cycleCounter += 1
        if ((cycleController === undefined && cycleCounter < MAX_CYCLE_COUNT)
          || (cycleController !== undefined && cycleCounter < cycleController)) {
          result = result + reversed
        } else {
          result = null
          isPalindrome = true
        }
      }
    }

    return {
      result,
      hasError: result === null,
      cycleCount: cycleCounter
    }
  }
}

function computeOneNineSixAlgoCycleFrequencies(algo) {
  return function(min, max, cycleController) {
    const lychrelCandidates = []
    const resultCycleFrequencies = {}
    for (let i = min; i < max; i++) {
      const result = algo(i, cycleController)
      if (result.hasError) {
        lychrelCandidates.push(i)
        //console.log('error cycle count', result.cycleCount)
      } else {
        if (resultCycleFrequencies[result.cycleCount] === undefined) {
          resultCycleFrequencies[result.cycleCount] = 1
        } else {
          resultCycleFrequencies[result.cycleCount] += 1
        }
      }
    }
    return {
      lychrelCandidates,
      resultCycleFrequencies
    }
  }
}

module.exports = {
  reverseDigitsAlgorithm,
  reverseDigitsAlgorithmAlt,
  oneNineSixAlgorithm,
  oneNineSixAlgorithmNonRecursive,
  computeOneNineSixAlgoCycleFrequencies
}
