import { ItemBonus } from './itembonus.js';
export class Item {
    constructor(name) {
      this.name = name;
      this.displayname = name;
      this.value = 0;
      this.max = 1;
      this.useMax = false; 
      this.gain = 0;
      this.maxgain = 0;
      this.tempgain = 0;
      this.tempmaxgain = 0;
      this.gainbonus = 0;
      this.maxgainbonus = 0;
      this.holdbonus = [];
      this.tags = [];
    }

    getDisplayNumberText () {
      return `${this.value.toFixed(1)}`;
    }

    displayNumber () {
      document.getElementById("itemnumber" + this.getName()).innerHTML = this.getDisplayNumberText();
    }

    displayText () {
      this.displayNumber();
    }

    setDisplayName (name) {
      this.displayname = name
    }

    getDisplayName () {
      return this.displayname
    }

    getName () {
      return this.name
    }

    addTag(tag) {
      this.tags.push(tag);
    }

    addTagList(tagList) {
      this.tags = this.tags.concat(tagList)
    }

    clearTempValues () {
      this.tempgain = 0;
      this.tempmaxgain = 0;
    }

    setTempGain (value) {
      this.tempgain = value;
    }

    tickGainValue () {
      return (this.gain + this.tempgain) * (1 + this.gainbonus);
    }

    tickMaxGainValue () {
      return this.maxgain + this.tempmaxgain * (1 + this.maxgainbonus);
    }

    getMax () {
      return this.max
    }

    getValue () {
      return this.value
    }

    setUseMax (value) {
      this.useMax = value;
    }

    disableUseMax () {
      this.useMax = false;
    }

    setValue (value) {
      this.value = value
      if (this.useMax) {
        if (this.value > this.getMax()) {
          this.value = this.getMax();
        }
      }
    }

    setMax (value) {
      this.max = value;
    }

    gainValue (value) {
      const gain = this.getValue() + value;
      this.setValue(gain);
    }

    gainMax (value) {
      this.max += value;
    }

    tickGain (time) {
      const gain = this.tickGainValue() * time;
      this.gainValue(gain);
      const maxgain = this.tickMaxGainValue() * time;
      this.gainMax(maxgain);
    }

    getName() {
        return this.name
    }
  }