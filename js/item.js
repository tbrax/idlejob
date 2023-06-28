import { ItemBonus } from './itembonus.js';
import { Result } from './result.js';
export class Item {
    constructor(name, character) {
      this.name = name;
      this.displayname = name;
      this.value = 0;
      this.max = 1;
      this.useMax = false; 
      this.useMin = true; 
      this.gain = 0;
      this.maxgain = 0;
      this.tempgain = 0;
      this.tempmaxgain = 0;
      this.gainbonus = 0;
      this.maxgainbonus = 0;
      this.activeBonus = null;
      this.isActive = false;
      this.tags = [];
      this.unlocked = false;
      this.desc = '';
      this.character = character;
      this.marketValue = 10;
      this.marketable = false;
    }

    isMarketable () {
      if (this.getName() == 'cash') {
        return false;
      }

      if (!this.marketable) {
        return false
      }

      return this.getMarketValue() != 0;
    }

    getSpace () {
      if (!this.useMax) {
        return -1
      }
      return this.getMax() - this.getValue() 
    }

    setMarketValue (value) {
      this.marketValue = value;
      if (value > 0) {
        this.marketable = true;
      }
    }

    getMarketValue () {
      if (this.getName() == 'cash') {
        return 1
      }
      return this.marketValue;
    }

    hasMarketValue () {
      return this.marketValue == null;
    }

    setCanBeNegative () {
      this.useMin = false;
    }

    getCharacter() {
      return this.character
    }

    removeActive (character) {
      if (this.isActive) {
        this.isActive = false;
        this.addActiveBonus(-1, character);
      }
    }

    addActive (character) {
      if (!this.isActive) {
        this.isActive = true;
        this.addActiveBonus(1, character);
      }
    }

    addActiveBonus(mult, character) {    
        if (this.activeBonus == null) {
            return
        }
        this.activeBonus.setMult(mult);
        this.activeBonus.performResultList(character);
    }

    addActiveBonusCriteria (name, type, value, criteria) {
      if (this.activeBonus == null) {
          this.activeBonus = new Result();
      }
      this.activeBonus.addItemCriteria(name, type, value, criteria);    
    }

    addActiveBonusValue (name, type, value) {
      if (this.activeBonus == null) {
          this.activeBonus = new Result();
      }
      this.activeBonus.addItemName(name, type, value);    
    }

    getUseMax () {
      return this.useMax;
    }

    setDesc (d) {
      this.desc = d;
    }

    getDesc () {
      return this.desc;
    }

    isUnlocked () {
      return this.unlocked;
    }

    doUnlock () {
      this.unlocked = true;
    }

    checkUnlock () {
      if (!this.isUnlocked())
      {
        if (this.value != 0) {
          this.doUnlock();
          return true;
        }
      }
      return false;
    }

    numformat(num) {
      return this.getCharacter().numformat(num)
    }

    getDisplayNumberText () {
      let tx = `${this.numformat(this.value)}`;
      if (this.getUseMax()) {
        tx = `${this.numformat(this.value)} / ${this.numformat(this.getMax())}`;
      }
      return tx;
    }

    displayNumber () {
      document.getElementById("itemnumber" + this.getName()).innerHTML = this.getDisplayNumberText();
    }

    displayText () {
      if (this.isUnlocked()) {
        this.displayNumber();
      }
    }

    setDisplayName (name) {
      this.displayname = name
    }

    getDisplayName () {
      return this.displayname;
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

    setMax (val) {
      this.max = val; 
      this.setUseMax(true);
    }

    setUseMax (value) {
      this.useMax = value;
    }

    disableUseMax () {
      this.useMax = false;
    }

    setValue (value) {
      if (value == NaN || value == null || value == undefined) {
        value = 0
      }
      if (isNaN(value)) {
        value = 0
      }
      this.removeActive(this.getCharacter());    
      this.value = value
      if (this.useMax) {
        if (this.value > this.getMax()) {
          this.value = this.getMax();
        }
      }

      if (this.useMin) {
        if (this.value < 0) {
          this.value = 0;
        }
      }

      this.addActive(this.getCharacter());
    }
    
    gainValue (value) {
      if (value == NaN || value == null || value == undefined) {
        value = 0
      }
      if (isNaN(value)) {
        value = 0
      }
      this.removeActive(this.getCharacter());
      const gain = this.getValue() + value;
      this.setValue(gain);
      this.addActive(this.getCharacter());
    }

    getGain () {
      return this.gain;
    }

    getDisplayGain () {
      const g = this.numformat(this.getGain()) + '/s'
      return g
    }

    setGain (value) {
      this.gain = value;
    }

    gainGainValue (value) {
      const gain = this.getGain() + value;
      this.setGain(gain);
    }

    gainMax (value) {
      this.max += value;
    }

    tickGain (time) {
      const gain = this.tickGainValue() * time;
      if (gain != 0) {
        this.gainValue(gain);
      }

      const maxgain = this.tickMaxGainValue() * time;
      this.gainMax(maxgain);
    }

    getName() {
        return this.name
    }
  }