import fs from "fs"
import {
  traceWire,
  findIntersections
} from "./d03p01"

fs.readFile("./d03input", "utf8", (error, contents) => {
  const [wire1, wire2] = contents.split("\n").map(s => s.split(","))

  const grid1 = traceWire(wire1)
  const grid2 = traceWire(wire2)
  const intersections = findIntersections(grid1, grid2)


  const stepCounts = intersections.reduce((a, i) => {
    const grid1Steps = grid1.findIndex(([a,b]) => a === i[0] && b === i[1])
    const grid2Steps = grid2.findIndex(([a,b]) => a === i[0] && b === i[1])

    if (!a[i] || a[i] > grid1Steps + grid2Steps) a[i] = grid1Steps + grid2Steps
    return a
  }, {})

  console.log(Object.entries(stepCounts).sort(([c1, s1], [c2, s2]) => s1 <= s2 ? -1 : 1)[0])
})
