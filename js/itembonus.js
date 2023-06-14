export class ItemBonus {
    constructor(name) {
      this.name = name;
      this.gain = 0;
      this.maxgain = 0;
    }

    getName() {
      return this.name
    }
  }