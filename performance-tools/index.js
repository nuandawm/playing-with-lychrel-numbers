const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

function computeSimpleBenchmark(callback) {
  const startMs = new Date().getTime()
  callback()
  const endMs = new Date().getTime()
  const milliseconds = endMs - startMs
  return {
    milliseconds,
    formattedValueMS: moment.duration(milliseconds, 'milliseconds').format('mm[m] ss[s] SSS[ms]')
  }
}

// return the maximum call stack size
function computeMaxCallStackSize() {
  try {
    return 1 + computeMaxCallStackSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
}

module.exports = {
  computeSimpleBenchmark, computeMaxCallStackSize
}
