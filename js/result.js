export class Result {
    constructor() {
      this.isCost = false;
      this.values = [];
      this.mult = 1;
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
      const r = {name, type, value};
      this.values.push(r);
    }
  }