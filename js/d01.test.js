import fs from "fs"
import readline from "readline"

import FuelMemoizer from "./d01p01"
import { recursiveFuelCalculator, calculateFuelFor } from "./d01p02"

describe("recursiveFuelCalculator", () => {
  test("1969", () => {
    const expected = 966
    const actual = recursiveFuelCalculator(1969)
    expect(actual).toBe(expected)
  })

  test("100756", () => {
    const expected = 50346
    const actual = recursiveFuelCalculator(100756)
    expect(actual).toBe(expected)
  })

  test("actual input", (done) => {
    const inputList = []
    const stream = fs.createReadStream("./d01input")
    const reader = readline.createInterface(stream)

    reader.on("line", (line) => inputList.push(line))
    reader.on("close", () => {
      const expected = 5132379
      const actual = calculateFuelFor(inputList)
      expect(actual).toBe(expected)
      done()
    })
  })
})

describe("FuelMemoizer", () => {
  test("summed actual input", (done) => { // gotta love async tests
    const inputList = []
    const stream = fs.createReadStream("./d01input")
    const reader = readline.createInterface(stream)

    reader.on("line", (line) => inputList.push(line))
    reader.on("close", () => {
      const expected = 3423511
      const memoizer = new FuelMemoizer(inputList)
      const actual = memoizer.sum()

      expect(actual).toBe(expected)
      done()
    })
  })

  test("individual example tests", () => {
    const results = {
      12: 2,
      14: 2,
      1969: 654,
      100756: 33583
    }

    Object.entries(results).forEach(([keyString, expected]) => {
      const memoizer = new FuelMemoizer([keyString])
      const actual = memoizer.sum()
      expect(actual).toBe(expected)
    })
  })

  test("summed example tests", () => {
    const inputList = [12, 14, 1969, 100756]
    const expected = 2 + 2 + 654 + 33583

    const memoizer = new FuelMemoizer(inputList)
    const actual = memoizer.sum()
    expect(actual).toBe(expected)
  })

  test("summed with repeating example test", () => {
    const inputList = [12, 14, 12, 14]
    const expectedSum = 8
    const expectedKeys = ["12", "14"]

    const memoizer = new FuelMemoizer(inputList)
    const actualSum = memoizer.sum()
    const actualKeys = Object.keys(memoizer.map)

    expect(actualSum).toBe(expectedSum)
    expect(actualKeys).toEqual(expectedKeys)
  })
})
