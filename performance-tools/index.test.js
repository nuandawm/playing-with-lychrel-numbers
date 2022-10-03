const { computeSimpleBenchmark } = require('./index')

describe('simple benchmark', () => {
  it('should return 0 given an asynchronous function', () => {
    expect(computeSimpleBenchmark(() => setTimeout(() => null)).milliseconds).toBe(0)
  })

  it('should return 0 given an empty callback', () => {
    expect(computeSimpleBenchmark(() => null).milliseconds).toBe(0)
  })

  it('should not return a value greater than 0 given a function that takes more than 1 ms to be executed', () => {
    expect(computeSimpleBenchmark(() => {
      const seconds = new Date().getTime() / 1000
      while(true) {
        if((new Date().getTime() / 1000) - seconds > 0) {
          break;
        }
      }
    }).milliseconds).toBeGreaterThan(0)
  })
})
