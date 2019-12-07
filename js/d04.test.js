import {
  hasDoubles,
  onlyDoubles,
  onlyIncreases,
} from "./d04p01"

describe("day 04, part 01", () => {
  const makeList = str => str.split("").map(n => n * 1)

  describe("hasDoubles", () => {
    test("no doubles", () => {
      expect(hasDoubles([0,1])).toBe(false)
    })

    test("one double", () => {
      expect(hasDoubles([0,0])).toBe(true)
    })

    test("has a double, eventually", () => {
      expect(hasDoubles([1,2,3,4,5,5])).toBe(true)
    })

    test("has to be adjacent to be a double", () => {
      expect(hasDoubles([1,2,1])).toBe(false)
    })
  })

  describe("onlyIncreases", () => {
    test("numbers go up", () => {
      expect(onlyIncreases([0,1])).toBe(true)
    })

    test("numbers go down", () => {
      expect(onlyIncreases([1,0])).toBe(false)
    })

    test("numbers go up, then down", () => {
      expect(onlyIncreases([0,1,2,1])).toBe(false)
    })

    test("numbers are sometimes the same, but go up", () => {
      expect(onlyIncreases([0,1,1,1,3])).toBe(true)
    })
  })

  describe("hasDoubles+onlyIncreases", () => {
    test("111111 is valid", () => {
      const value = makeList("111111")
      expect(hasDoubles(value) && onlyIncreases(value)).toBe(true)
    })

    test("223450 is invalid", () => {
      const value = makeList("223450")
      expect(hasDoubles(value) && onlyIncreases(value)).toBe(false)
    })

    test("123789 is invalid", () => {
      const value = makeList("123789")
      expect(hasDoubles(value) && onlyIncreases(value)).toBe(false)
    })
  })

  describe("onlyDoubles", () => {
    test("112233 is valid", () => {
      const value = makeList("112233")
      expect(onlyDoubles(value)).toBe(true)
    })

    test("123444 is invalid", () => {
      const value = makeList("123444")
      expect(onlyDoubles(value)).toBe(false)
    })

    test("111122 is valid, b/c it does have a double (even tho it has a triple too)", () => {
      const value = makeList("111122")
      expect(onlyDoubles(value)).toBe(true)
    })

    test("277888 is valid, b/c it does have a double (even tho it's followed by a triple)", () => {
      const value = makeList("277888")
      expect(onlyDoubles(value)).toBe(true)
    })
  })

  test("with real input, part 1", () => {
    const min = 273025
    const max = 767253

    let test = min
    let count = 0

    while(max > test) {
      const value = makeList(String(test))
      if (hasDoubles(value) && onlyIncreases(value)) count++
      test++
    }

    expect(count).toEqual(910)
  })

  test("with real input, part 2", () => {
    const min = 273025
    const max = 767253
    const list = new Array(max - min + 1).fill(0).map((_, i) => min + i)

    expect(list[0]).toBe(min)
    expect(list[list.length - 1]).toBe(max)

    const firstSet = list.filter((test, index) => {
      const value = makeList(String(test))
      return hasDoubles(value) && onlyIncreases(value)
    })

    expect(firstSet.length).toEqual(910)

    const secondSet = firstSet.filter((test, index) => {
      const value = makeList(String(test))
      return onlyDoubles(value)
    })

    expect(secondSet.length).toEqual(598)
  })
})
