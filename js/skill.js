import { Criteria } from './criteria.js';
import { Result } from './result.js';
export class Skill {
    constructor(name, type) {
      this.name = name;
      this.displayname = name;
      this.level = 0;
      this.exp = 0;
      this.type = type;
      this.isActive = false;
      this.activeBonus = null;
      this.unlocked = false;
      this.unlock = null;
      this.desc = '';
    }

    addActiveBonusValue (name, type, value) {
        if (this.activeBonus == null) {
            this.activeBonus = new Result();
        }
        this.activeBonus.addItemName(name, type, value);    
    }

    addActiveBonus(mult, character) {
        if (this.activeBonus == null) {
            return
        }
        this.activeBonus.setMult(mult);
        this.activeBonus.performResultList(character);
    }

    getElementName () {
        return 'jobnamebutton' + this.getName();
    }

    changeButtonStyle (on) {
        const btn = document.getElementById(this.getElementName());
        if (on) {
            btn.classList.add("activejobbutton");
        } else {
            btn.classList.remove("activejobbutton");
        }
    }

    toggleActive (character) {
        if (this.isActive) {
            this.isActive = false;
            this.addActiveBonus(-1, character);
            this.changeButtonStyle(false);
        } else {
            this.isActive = true;
            this.addActiveBonus(1, character);
            this.changeButtonStyle(true);
        }
    }

    setDesc(d) {
        this.desc = d;
    }

    metUnlock(character) {
        if (this.level == 0) {
            return false;
        }
        if (this.unlocked == true ) {
            return true;
        }
        if (this.unlock == null) {
            return true;
        }
        return this.unlock.metCriteria(character)
    }

    isUnlocked () {
        return this.unlocked;
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

    getType () {
        return this.type;
    }

    displayText () {
        if (this.isUnlocked()) {
            document.getElementById(this.getType() + 'name' + this.getName()).innerHTML = this.getDisplayText();
        }
    }

    getDisplayName () {
        return this.displayname
    }

    setDisplayName (name) {
        this.displayname = name
    }

    isSkillActive () {
        return this.isActive;
    }

    getDisplayText () {
        if (this.isSkillActive()) {
            return `${this.getDisplayName()} ${this.getLevel().toFixed(0)} (${this.exp.toFixed(0)}/${this.getMaxExp().toFixed(0)})`; 
        }
        return `${this.getDisplayName()} ${this.getLevel().toFixed(0)} (${this.exp.toFixed(0)}/${this.getMaxExp().toFixed(0)})`;
    }

    getMaxExp () {
        return 10 + ((this.level - 1) * 10);
    }

    getName () {
        return this.name
    }

    setLevel (set) {
        this.level = set;
    }

    getLevel () {
        return this.level
    }

    levelUp () {
        this.level += 1;
    }

    checkFirstLevel () {
        if (this.level == 0) {
            this.level = 1;
        }
    }

    gainExp (value) {
        this.checkFirstLevel();
        this.exp += value;
        this.checkExp();
    }

    checkExp () {
        while (this.exp >= this.getMaxExp()) {
            this.exp -= this.getMaxExp();
            this.levelUp();
        }
    }
}