export class Item {
    constructor(name) {
      this.name = name;
      this.max = 0;
      this.start = 0;
      this.gain = 0;
      this.maxgain = 0;
    }

    getName() {
        return 'Item name:' + this.name
    }
  }