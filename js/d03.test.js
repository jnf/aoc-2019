import fs from "fs"
import {
  findClosest,
  findIntersections,
  traceWire,
} from "./d03p01"

describe("traceWire", () => {
  test("negative values", () => {
    const actual = traceWire(["L4", "D2", "U3"])
    const expected = [[0, 0], // always start in the center
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], // L4
      [-4, -1], [-4, -2], // D2
      [-4, -1], [-4, 0], [-4, 1] // U3
    ]

    expect(actual).toEqual(expected)
  })

  test("R8,U5,L5,D3", () => {
    const actual = traceWire(["R8","U5","L5","D3"])
    const expected =[[0,0], // always start in the center
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], // R8
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], // U5
      [7, 5], [6, 5], [5, 5], [4, 5], [3, 5], // L5
      [3, 4], [3, 3], [3, 2] // D3
    ]

    expect(actual).toEqual(expected)
  })

  test("U7,R6,D4,L4", () => {
    const actual = traceWire(["U7", "R6", "D4", "L4"])
    const expected = [[ 0, 0 ], // always start in the center
      [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ], // U7
      [ 1, 7 ], [ 2, 7 ], [ 3, 7 ], [ 4, 7 ], [ 5, 7 ], [ 6, 7 ], // R6
      [ 6, 6 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], // D4
      [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ] // L4
    ]

    expect(actual).toEqual(expected)
  })
})

describe("findIntersections", () => {
  test("finds intersections in negative coordinates", () => {
    const grid1 = [[0, 0], // always start in the center
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], // L4
      [-4, -1], [-4, -2], // D2
      [-4, -1], [-4, 0], [-4, 1] // U3
    ]

    const grid2 = [[0, 0], // always start in the center
      [1, 0], // R1,
      [1, -1], // D1,
      [0, -1], [-1, -1], [-2, -1], [-3, -1], [-4, -1] //L5
    ]

    const expected = [[-4, -1]]
    const actual = findIntersections(grid1, grid2)

    expect(actual).toEqual(expected)
  })

  test("R8,U5,L5,D3 and U7,R6,D4,L4", () => {
    const grid1 = [[0,0], // always start in the center
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], // R8
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], // U5
      [7, 5], [6, 5], [5, 5], [4, 5], [3, 5], // L5
      [3, 4], [3, 3], [3, 2] // D3
    ]

    const grid2 = [[0, 0], //always start in the center
      [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ], // U7
      [ 1, 7 ], [ 2, 7 ], [ 3, 7 ], [ 4, 7 ], [ 5, 7 ], [ 6, 7 ], // R6
      [ 6, 6 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], // D4
      [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ] // L4
    ]

    const expected = [[6, 5], [3, 3]]
    const actual = findIntersections(grid1, grid2)
    expect(actual).toEqual(expected)
  })
})

describe("findClosest", () => {
  const intersections = [[6, 5], [3, 3]]
  const expected = [3, 3]
  const actual = findClosest(intersections)

  expect(actual).toEqual(expected)
})

describe("web examples", () => {
  test("R75,D30,R83,U83,L12,D49,R71,U7,L72 and U62,R66,U55,R34,D71,R55,D58,R83", () => {
    const expectedDistance = 159
    const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",")
    const wire2 = "U62,R66,U55,R34,D71,R55,D58,R83".split(",")

    const closestIntersection = findClosest(findIntersections(traceWire(wire1), traceWire(wire2)))
    const manhattenDistance = closestIntersection.reduce((a, v) => a += Math.abs(v), 0)
    expect(manhattenDistance).toBe(expectedDistance)
  })

  test("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51 and U98,R91,D20,R16,D67,R40,U7,R15,U6,R7", () => {
    const expectedDistance = 135
    const wire1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51".split(",")
    const wire2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7".split(",")

    const closestIntersection = findClosest(findIntersections(traceWire(wire1), traceWire(wire2)))
    const manhattenDistance = closestIntersection.reduce((a, v) => a += Math.abs(v), 0)
    expect(manhattenDistance).toBe(expectedDistance)
  })

  test("with test input", (done) => {
    fs.readFile("./d03input", "utf8", (error, contents) => {
      const [wire1, wire2] = contents.split("\n").map(s => s.split(","))
      const expectedDistance = 841 // too high

      const closestIntersection = findClosest(findIntersections(traceWire(wire1), traceWire(wire2)))
      const manhattenDistance = closestIntersection.reduce((a, v) => a += Math.abs(v), 0)
      expect(manhattenDistance).toBe(expectedDistance)

      done()
    })
  })
})
