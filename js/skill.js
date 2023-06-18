import { Criteria } from './criteria.js';
import { Result } from './result.js';
export class Skill {
    constructor(name, type, character) {
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
      this.character = character;
      this.wantUnlock;
    }

    doWantUnlock () {
        this.wantUnlock = true;
    }

    getWantUnlock () {
        return this.wantUnlock;
    }

    getCharacter () {
        return this.character
    }

    getActiveBonus () {
        return this.activeBonus;
    }

    addActiveBonusValue (name, type, value) {
        if (this.activeBonus == null) {
            this.activeBonus = new Result();
        }
        this.activeBonus.addItemName(name, type, value);    
    }

    addActiveBonusCriteria (name, type, value, criteria) {
        if (this.activeBonus == null) {
            this.activeBonus = new Result();
        }
        this.activeBonus.addItemCriteria(name, type, value, criteria);    
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
        if (btn == null) {
            return;
        }
        if (on) {
            btn.classList.add("activejobbutton");
        } else {
            btn.classList.remove("activejobbutton");
        }
    }

    removeActive (character) {
        this.isActive = false;
        this.addActiveBonus(-1, character);
        this.changeButtonStyle(false);
    }

    addActive (character) {
        this.isActive = true;
        this.addActiveBonus(1, character);
        this.changeButtonStyle(true);
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

    getDesc() {
        if (this.desc == '') {
            return this.getDisplayName();
        }
        return this.desc;
    }

    metUnlock(character) {
        if (this.level == 0) {
            return false;
        }
        if (this.unlocked == true ) {
            return true;
        }
        if (this.unlock == null) {
            return false;
        }
        return this.unlock.metCriteria(character)
    }

    isUnlocked () {
        return this.unlocked;
    }

    doUnlock () {
        this.unlocked = true;
        this.checkFirstLevel();
    }
  
    getUnlocked () {
        return this.unlocked;
    }

    checkUnlock (character) {
        if (!this.getUnlocked()) {
            const wantDoUnlock = this.metUnlock(character)
            if (wantDoUnlock || this.getWantUnlock()) {
                this.doUnlock();
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
            const el = document.getElementById(this.getType() + 'name' + this.getName())
            if (el != null) {
                el.innerHTML = this.getDisplayText();
            }
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

    checkActiveRecalc () {
        if (this.isActive) {

        }
    }

    levelUp () {
        let reactive = false;
        if (this.isActive) {
            reactive = true;
            this.removeActive(this.getCharacter());
        }
        this.level += 1;
        if (reactive) {
            this.addActive(this.getCharacter());
        }
    }

    checkFirstLevel () {
        if (this.level < 1) {
            this.level = 1;
        }
    }

    gainExp (value) {
        // this.checkFirstLevel();
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