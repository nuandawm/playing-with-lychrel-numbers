const { oneNineSixAlgorithm, reverseDigitsAlgorithm, oneNineSixAlgorithmNonRecursive, reverseDigitsAlgorithmAlt} = require('./index')

describe('reverse number', () => {
  it('should reverse a non-palindrome odd-digits number', () => {
    expect(reverseDigitsAlgorithm(123)).toBe(321)
    expect(reverseDigitsAlgorithm(4338791)).toBe(1978334)
  })

  it('should reverse a non-palindrome even-digits number', () => {
    expect(reverseDigitsAlgorithm(1234)).toBe(4321)
    expect(reverseDigitsAlgorithm(43387912)).toBe(21978334)
  })

  it('should keep unchanged a palindrome number', () => {
    expect(reverseDigitsAlgorithm(505)).toBe(505)
    expect(reverseDigitsAlgorithm(446780087644)).toBe(446780087644)
  })

  it('should keep unchanged every one digit number', () => {
    expect(reverseDigitsAlgorithm(4)).toBe(4)
    expect(reverseDigitsAlgorithm(9)).toBe(9)
  })

  it('should loose trailing zeroes', () => {
    expect(reverseDigitsAlgorithm(123000)).toBe(321)
  })
})

describe('reverse number (alternative algo)', () => {
  it('should reverse a non-palindrome odd-digits number', () => {
    expect(reverseDigitsAlgorithmAlt(123)).toBe(321)
    expect(reverseDigitsAlgorithmAlt(4338791)).toBe(1978334)
  })

  it('should reverse a non-palindrome even-digits number', () => {
    expect(reverseDigitsAlgorithmAlt(1234)).toBe(4321)
    expect(reverseDigitsAlgorithmAlt(43387912)).toBe(21978334)
  })

  it('should keep unchanged a palindrome number', () => {
    expect(reverseDigitsAlgorithmAlt(505)).toBe(505)
    expect(reverseDigitsAlgorithmAlt(446780087644)).toBe(446780087644)
  })

  it('should keep unchanged every one digit number', () => {
    expect(reverseDigitsAlgorithmAlt(4)).toBe(4)
    expect(reverseDigitsAlgorithmAlt(9)).toBe(9)
  })

  it('should loose trailing zeroes', () => {
    expect(reverseDigitsAlgorithmAlt(123000)).toBe(321)
  })
})

describe('196 algorithm (recursive version)', () => {
  it('should keep unchanged every palindrome number in 0 cycles', () => {
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo.mockReturnValue(556909655)
    const { result, cycleCount } = oneNineSixAlgorithm(mockReverseAlgo)(556909655)
    expect(result).toBe(556909655)
    expect(cycleCount).toBe(0)
    expect(mockReverseAlgo).toBeCalledTimes(1)
    expect(mockReverseAlgo).toBeCalledWith(556909655)
  })

  // Wikipedia tests
  it('should return 121 in 1 cycle given 56', () => {
    const reverseResults = {
      56: 65,
      121: 121
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithm(mockReverseAlgo)(56)
    expect(result).toBe(121)
    expect(cycleCount).toBe(1)
    expect(mockReverseAlgo).toBeCalledTimes(2)
  })

  it('should return 363 in 2 cycle given 57', () => {
    const reverseResults = {
      57: 75,
      132: 231,
      363: 363
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithm(mockReverseAlgo)(57)
    expect(result).toBe(363)
    expect(cycleCount).toBe(2)
    expect(mockReverseAlgo).toBeCalledTimes(3)
  })

  it('should return 1111 in 3 cycles given 59', () => {
    const reverseResults = {
      59: 95,
      154: 451,
      605: 506,
      1111: 1111
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithm(mockReverseAlgo)(59)
    expect(result).toBe(1111)
    expect(cycleCount).toBe(3)
    expect(mockReverseAlgo).toBeCalledTimes(4)
  })

  it('should return 8813200023188 in 24 cycles given 89', () => {
    const { result, cycleCount } = oneNineSixAlgorithm(reverseDigitsAlgorithm)(89)
    expect(result).toBe(8813200023188)
    expect(cycleCount).toBe(24)
  })

  // 4668731596684224866951378664 exceeds Number.MAX_SAFE_INTEGER
  it.skip('should return 4668731596684224866951378664 in 55 cycles given 10911', () => {
    const { result, cycleCount } = oneNineSixAlgorithm(reverseDigitsAlgorithm)(10911)
    expect(result).toBe(4668731596684224866951378664)
    expect(cycleCount).toBe(55)
  })

  it('should fail given 196', () => {
    const { result, hasError } = oneNineSixAlgorithm(reverseDigitsAlgorithm)(196)
    expect(result).toBe(null)
    expect(hasError).toBe(true)
  })

  it('should fail given 394', () => {
    const { result, hasError } = oneNineSixAlgorithm(reverseDigitsAlgorithm)(394)
    expect(result).toBe(null)
    expect(hasError).toBe(true)
  })

  it('should stop at the nth cycle given a cycleController of n when the specified number needs a greater number of cycles', () => {
    const { result, cycleCount } = oneNineSixAlgorithm(reverseDigitsAlgorithm)(89, 3)
    expect(result).toBe(null)
    expect(cycleCount).toBe(3)
  })
})

describe('196 algorithm (non recursive version)', () => {
  it('should keep unchanged every palindrome number in 0 cycles', () => {
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo.mockReturnValue(556909655)
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(mockReverseAlgo)(556909655)
    expect(result).toBe(556909655)
    expect(cycleCount).toBe(0)
    expect(mockReverseAlgo).toBeCalledTimes(1)
    expect(mockReverseAlgo).toBeCalledWith(556909655)
  })

  // Wikipedia tests
  it('should return 121 in 1 cycle given 56', () => {
    const reverseResults = {
      56: 65,
      121: 121
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(mockReverseAlgo)(56)
    expect(result).toBe(121)
    expect(cycleCount).toBe(1)
    expect(mockReverseAlgo).toBeCalledTimes(2)
  })

  it('should return 363 in 2 cycle given 57', () => {
    const reverseResults = {
      57: 75,
      132: 231,
      363: 363
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(mockReverseAlgo)(57)
    expect(result).toBe(363)
    expect(cycleCount).toBe(2)
    expect(mockReverseAlgo).toBeCalledTimes(3)
  })

  it('should return 1111 in 3 cycles given 59', () => {
    const reverseResults = {
      59: 95,
      154: 451,
      605: 506,
      1111: 1111
    }
    const mockReverseAlgo = jest.fn()
    mockReverseAlgo
      .mockImplementation(value => reverseResults[value])
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(mockReverseAlgo)(59)
    expect(result).toBe(1111)
    expect(cycleCount).toBe(3)
    expect(mockReverseAlgo).toBeCalledTimes(4)
  })

  it('should return 8813200023188 in 24 cycles given 89', () => {
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(reverseDigitsAlgorithm)(89)
    expect(result).toBe(8813200023188)
    expect(cycleCount).toBe(24)
  })

  it('should fail given 196', () => {
    const { result, hasError } = oneNineSixAlgorithmNonRecursive(reverseDigitsAlgorithm)(196, 100000)
    expect(result).toBe(null)
    expect(hasError).toBe(true)
  })

  it('should fail given 394', () => {
    const { result, hasError } = oneNineSixAlgorithmNonRecursive(reverseDigitsAlgorithm)(394, 100000)
    expect(result).toBe(null)
    expect(hasError).toBe(true)
  })

  it('should stop at the nth cycle given a cycleController of n when the specified number needs a greater number of cycles', () => {
    const { result, cycleCount } = oneNineSixAlgorithmNonRecursive(reverseDigitsAlgorithm)(89, 3)
    expect(result).toBe(null)
    expect(cycleCount).toBe(3)
  })
})
