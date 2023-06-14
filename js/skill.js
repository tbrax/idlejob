export class Skill {
    constructor(name) {
      this.name = name;
      this.displayname = name;
      this.level = 0;
      this.exp = 0;
    }

    displayText () {
        document.getElementById("skillname" + this.getName()).innerHTML = this.getDisplayText();
      }

    getDisplayName () {
        return this.displayname
    }

    setDisplayName (name) {
        this.displayname = name
    }

    getDisplayText () {
        return `${this.getDisplayName()} ${this.exp.toFixed(0)}/${this.getMaxExp().toFixed(0)}`;
    }

    getMaxExp () {
        return 100 + (this.level * 10);
    }

    getName () {
        return this.name
    }

    getLevel () {
        return this.level
    }

    levelUp () {
        this.level += 1;
    }

    gainExp (value) {
        this.exp += value;
        this.checkExp();
    }

    checkExp () {
        if (this.exp >= this.wantedExp()) {
            this.exp -= this.wantedExp();
            this.levelUp();
        }
    }

    wantedExp () {
        return 100 + (this.level * 10);
    }
}