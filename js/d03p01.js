export const traceWire = (path=[]) => {
  const mods = {
    R: ([x, y]) => [x+1, y],
    L: ([x, y]) => [x-1, y],
    U: ([x, y]) => [x, y+1],
    D: ([x, y]) => [x, y-1],
  }

  return path.reduce((acc, code) => {
    const [direction, duration] = [code.slice(0, 1), code.slice(1)]
    for (let i = 0; i < duration; i++) {
      const last = acc[acc.length - 1]
      acc.push(mods[direction](last))
    }
    return acc
  }, [[0, 0]])
}

export const findIntersections = (grid1, grid2) => {
  const makeGridObj = (a, c) => { a[c] = true; return a }
  const makeCoordinate = ([stringPair]) => stringPair.split(",").map(n => n * 1)

  const gridObj1 = grid1.reduce(makeGridObj)
  const gridObj2 = grid2.reduce(makeGridObj)

  return Object.entries(gridObj1) // grab the coordinate (strings now)
    .filter(([c]) => gridObj2[c]) // select the keys that also appear in the other object
    .map(makeCoordinate) // convert back into [x, y] numeric pairs
}

export const findClosest = intersections => {
  return intersections.sort(([x1, y1], [x2, y2]) =>
    Math.abs(x1) + Math.abs(y1) <= Math.abs(x2) + Math.abs(y2) ? -1 : 1
  )[0]
}
