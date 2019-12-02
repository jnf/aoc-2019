const memo = {}
export const recursiveFuelCalculator = weight => {
  if (!memo[weight]) memo[weight] = Math.floor(weight / 3) - 2
  if (memo[weight] <= 0) return 0 // base case

  return memo[weight] + recursiveFuelCalculator(memo[weight])
}

export const calculateFuelFor = list => list.reduce((sum, weight) => sum + recursiveFuelCalculator(weight), 0)
