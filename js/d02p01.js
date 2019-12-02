const add = ([v1, v2, dest], program) => {
  program[dest] = program[v1] + program[v2]
  return program
}

const multiply = ([v1, v2, dest], program) => {
  program[dest] = program[v1] * program[v2]
  return program
}

const operations = {
  1: [add, 4],
  2: [multiply, 4],
  99: [n => n, 1]
}

const runIntcode = (program) => {
  let pointer = 0
  while (pointer < program.length) {
    const opcode = program[pointer]
    const [op, opSize] = operations[opcode]
    const parameters = program.slice(pointer + 1, pointer + 1 + opSize)

    if (opcode === 99) break
    program = op(parameters, program)
    pointer += opSize
  }

  return program
}

export default runIntcode
