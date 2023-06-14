export class Action {
    constructor(name) {
      this.name = name;
      this.displayname = name;
      this.unlock = null;
      this.time = 0;

      this.cost = null;
      this.result = null;

      this.level = 0;
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

    setResult (result) {
      this.result = result;
    }

    doAction () {

    }

    checkDoAction () {
      return true;
    }
    
    getName () {
        return this.name
    }
  }