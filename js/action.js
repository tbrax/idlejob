import { Result } from './result.js';
import { Criteria } from './criteria.js';
export class Action {
    constructor(name, manager) {
      this.name = name;
      this.displayname = name;
      this.unlock = null;
      this.unlocked = false;
      this.isAnUnlockAction = false;
      this.maxUnlocks = 1;
      this.usetime = 1;
      this.time = 0;
      this.cooldown = 0;
      this.desc = '';
      this.cost = null;
      this.result = null;

      this.level = 0;
      this.am = manager;
    }

    setAsUnlock() {
      this.isAnUnlockAction = true;
      this.usetime = 0;
    }

    setMaxUnlocks(val) {
      this.maxUnlocks = val;
    }

    setDesc (desc) {
      this.desc = desc;
    }

    getDesc () {
      if (this.desc == '') {
        return this.getDisplayName();
      }
      return this.desc;
    }

    getCharacter () {
      return this.am.getCharacter();
    }

    isUnlocked () {
      return this.unlocked;
    }

    setUseTime (time) {
      this.usetime = time;
    }

    metUnlock(character) {
      if (this.unlocked == true ) {
        return true
      }
      if (this.unlock == null) {
        return true
      }
      return this.unlock.metCriteria(character)
    }

    doUnlock () {
      this.unlocked = true;
    }

    getUnlocked () {
      return this.unlocked;
    }

    checkUnlock (character) {
      if (!this.getUnlocked()) {
        const wantDoUnlock = this.metUnlock(character)
        if (wantDoUnlock) {
          this.doUnlock()
          return true;
        }
      }
      return false;
    }

    setUnlockValue (name, type, value, compare) {
      if (this.unlock == null) {
        this.unlock = new Criteria();
      }
      this.unlock.addItemName(name, type, value, compare);    
    }
    

    getItemManager () {
      return this.am.getItemManager(this.am)
    }

    checkHaveResult (result) {
      return this.getItemManager().checkHaveResult(result)
    }

    checkHaveResultRow (resultrow) {
      return this.getItemManager().checkHaveResultRow(resultrow)
    }

    checkDoAction () {
      if (this.cost == null) {
        return true;
      }
      return this.checkHaveResult(this.cost);
    }

    hasUseTime () {
      return this.getUseTime() > 0
    }

    getUseTimeBonus () {
      if (this.getResult() == null) {
        return 0;
      }
      const r = this.getResult().getSpeedBonus(this.getCharacter());
      return r;
    }

    calculateSpeedReduction () {
      const b = this.getUseTimeBonus();
      const s = this.getCharacter().getBaseSpeed();
      const total = b + s;
      const calc = 1 / ((100 + total) / 100);
      return calc;
    }

    minUseTime () {
      return 0.1;
    }

    getUseTime () {
      const s = this.calculateSpeedReduction()
      let time = this.usetime * s;
      if (time > 0 && time < this.minUseTime()) {
        time = this.minUseTime()
      }
      return time;
    }

    getCurrentTime () {
      return this.time
    }

    isUseTimeComplete () {
      return this.time >= this.getUseTime()
    }
    
    resetUseTime () {
      this.time = 0
    }

    getUsePercent () {
      const per = this.getCurrentTime() / this.getUseTime()
      return per * 100;
    }

    getActionUseValyeText () {
      return `${this.getUsePercent()}`;
    }

    getActionUseStatusText () {
      return `${this.getDisplayName()}`;
    }

    tickUse (time) {
      this.time += time
    }

    tickCool (time) {

    }

    resultBonus () {
      return 0;
    }
 
    getDisplayName () {
      return this.displayname
    }

    timeText(time) {
      return `${time.toFixed(2)}s`;
    }

    getToolTipName () {
      return `${this.getDisplayName()} ${this.timeText(this.getUseTime())}`
    }

    setDisplayName (name) {
      this.displayname = name
    }

    getResultMult () {
      return 1;
    }

    getCost () {
      if  (this.cost == null) {
        return null
      }
      return this.cost;
    }

    getResult () {
      if  (this.result == null) {
        return null
      }
      this.result.setMult(this.getResultMult());
      return this.result;
    }

    setCostValue (name, type, value) {
      if (this.cost == null) {
        this.cost = new Result();
      }
      this.cost.addItemName(name, type, value);    
    }

    setResultValue (name, type, value) {
      if (this.result == null) {
        this.result = new Result();
      }
      this.result.addItemName(name, type, value);    
    }

    setResultValueChance (name, type, value, chance) {
      if (this.result == null) {
        this.result = new Result();
      }
      this.result.addItemChance(name, type, value, chance);    
    }

    setResultValueSpecial (name, type, value, desc) {
      if (this.result == null) {
        this.result = new Result();
      }
      this.result.addItemSpecial(name, type, value, desc);    
    }

    setResultValueCriteria (name, type, value, criteria) {
      if (this.result == null) {
        this.result = new Result();
      }
      this.result.addItemCriteria(name, type, value, criteria);    
    }

    setResult (result) {
      this.result = result;
    }

    setCost (result) {
      result.makeCost();
      this.cost = result;
    }

    doAction () {

    }
    
    getName () {
        return this.name
    }
  }