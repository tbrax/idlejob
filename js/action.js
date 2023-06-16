import { Result } from './result.js';
import { Criteria } from './criteria.js';
export class Action {
    constructor(name, manager) {
      this.name = name;
      this.displayname = name;
      this.unlock = null;
      this.unlocked = false;
      this.usetime = 1;
      this.time = 0;
      this.cooldown = 0;

      this.cost = null;
      this.result = null;

      this.level = 0;
      this.am = manager;
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

    checkDoAction () {
      if (this.cost == null) {
        return true;
      }
      return this.checkHaveResult(this.cost);
    }

    hasUseTime () {
      return this.getUseTime() > 0
    }

    getUseTime () {
      return this.usetime
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