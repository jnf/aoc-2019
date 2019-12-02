import fs from "fs"
import runIntcode from "./d02p01"

const desiredOutput = 19690720 // per site instructions
const originalProgram = fs.readFileSync("./d02input", "utf8")
  .split(",")
  .map(i => i * 1)

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) { // i hate this
    const program = [...originalProgram]
    program[1] = noun
    program[2] = verb

    runIntcode(program)
    if (program[0] === desiredOutput) {
      console.log({ noun, verb, answer: 100 * noun + verb })
      break
    }
  }
}
