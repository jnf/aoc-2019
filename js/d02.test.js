import fs from "fs"

import runIntcode from "./d02p01"

describe("p1 day input", () => {
  test("reads input file and runs program", (done) => {
    fs.readFile("./d02input", "utf8", (error, contents) => {
      const program = contents.split(",").map(i => i * 1)

      // apply modifications from website
      program[1] = 12
      program[2] = 2

      const expected = 3101878
      const actual = runIntcode(program)[0]

      expect(actual).toEqual(expected)
      done()
    })
  })
})

describe("p1 provided tests", () => {
  test("1,0,0,0,99 becomes 2,0,0,0,99", () => {
    const program = [1,0,0,0,99]
    const actual = runIntcode(program)
    const expected = [2,0,0,0,99]
    expect(actual).toEqual(expected)
  })

  test("2,3,0,3,99 becomes 2,3,0,6,99", () => {
    const program = [2,3,0,3,99]
    const actual = runIntcode(program)
    const expected = [2,3,0,6,99]
    expect(actual).toEqual(expected)
  })

  test("2,4,4,5,99,0 becomes 2,4,4,5,99,9801", () => {
    const program = [2,4,4,5,99,0]
    const actual = runIntcode(program)
    const expected = [2,4,4,5,99,9801]
    expect(actual).toEqual(expected)
  })

  test("1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99", () => {
    const program = [1,1,1,4,99,5,6,0,99]
    const actual = runIntcode(program)
    const expected = [30,1,1,4,2,5,6,0,99]
    expect(actual).toEqual(expected)
  })

  test("1,9,10,3,2,3,11,0,99,30,40,50 becomes 3500,9,10,70,2,3,11,0,99,30,40,50", () => {
    const program = [1,9,10,3,2,3,11,0,99,30,40,50]
    const actual = runIntcode(program)
    const expected = [3500,9,10,70,2,3,11,0,99,30,40,50]
    expect(actual).toEqual(expected)
  })
})
