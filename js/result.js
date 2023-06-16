export class Result {
    constructor() {
      this.cost = false;
      this.values = [];
      this.mult = 1;
    }

    makeCost () {
      this.setCost(true);
    }

    setCost (set) {
      this.cost = set
    }

    isCost () {
      return this.cost
    }

    getMult () {
      return this.mult;
    }

    setMult (value) {
      this.mult = value;
    }

    getValues () {
      return this.values;
    }

    addItemName(name, type, value) {
      const r = {name, type, value, chance: 1};
      this.values.push(r);
    }

    addItemChance(name, type, value, chance) {
      const r = {name, type, value, chance};
      this.values.push(r);
    }
  }