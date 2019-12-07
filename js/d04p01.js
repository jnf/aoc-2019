export const hasDoubles = list => list.some((v, i) => v === list[i+1])
export const onlyIncreases = list => list.every((v, i) => v <= list[i+1] || i+1 === list.length)

export const onlyDoubles = list => {
  let v = [list[0]]
  const outcomes = {}

  list.forEach((value, index) => {
    if (list[index] === list[index - 1]) {
      v.push(list[index])
      if (v.length === 2) outcomes[list[index]] = true
      if (v.length > 2) outcomes[list[index]] = false
    } else {
      v = [list[index]]
    }
  })

  return Object.values(outcomes).some(outcome => outcome)
}
