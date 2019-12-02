export default class FuelMemoizer {
  constructor (list) {
    this.list = list
    this.map = {} // values we've seen before
    this.total = null
  }

  sum () {
    if (this.total) return this.total // let's not do the math twice

    this.total = this.list.reduce((sum, item) => {
      if (!this.map[item]) this.map[item] = this.calculate(item)
      return sum + this.map[item]
    }, 0)

    return this.total
  }

  calculate (input) {
    return Math.floor(input / 3) - 2
  }
}
