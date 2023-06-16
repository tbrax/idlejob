import { Skill } from './skill.js';
export class SkillManager {
    constructor(c, type) {
      this.skills = [];
      this.character = c;
      this.type = type;
      this.initialCreate();
    }

    initialJobs () {
      const a0 = this.createSkill('hobo', 'Hobo');
      a0.setUnlockValue("trash", "itemvalue", 1, ">=");
      this.addSkill(a0);
    }

    initialSkills () {
      const a0 = this.createSkill('speech', 'Speech')
      this.addSkill(a0);

      const a1 = this.createSkill('streetsmarts', 'Street Smarts')
      this.addSkill(a1);

      const a2 = this.createSkill('coordination', 'Coordination')
      this.addSkill(a2);
    }

    getCharacter() {
      return this.character;
    }

    checkAllUnlocks (character) {
      let madeUnlock = false;
      for (let i = 0; i < this.skills.length; i++) {
        const unlocked = this.skills[i].checkUnlock(character);
        if (unlocked) {
          madeUnlock = true;
        }
      }
      if (madeUnlock) {
        this.refreshSkills();
      }
    }

    initialCreate() {
      if (this.type == 'skill') {
        this.initialSkills();
      } else if (this.type == 'job') {
        this.initialJobs();
      }
    }

    getSkillLevel (name) {
      const skill = this.findSkillByName(name);
      const level = skill.getLevel();
      return level;
    }

    createSkill (name, display) {
        const a = new Skill(name, this.getType());
        a.setDisplayName(display);
        return a;
    }

    addSkill (skill) {
        this.skills.push(skill);
    }

    findSkillByName (name) {
      for (let i = 0; i < this.skills.length; i++) {
          if (this.skills[i].getName() == name) {
            return this.skills[i]
          }
      } 
      return null
    }

    getDisplayName (name) {
      const i = this.findSkillByName(name)
      if (i == null) {
        return ''
      }
      return i.getDisplayName();
    }

    itemAction (result) {
        const skill = this.findSkillByName(result.name);
        const type = result.type;
        if (skill == null) {
          return
        }
        if (type == "skillexp") {
            skill.gainExp(result.value);
        } else if (type == "jobexp") {
          skill.gainExp(result.value);
      }
    }

    getType () {
      return this.type
    }

    skillElement (skill) {
        const newDivParent = document.createElement("div");
        const nameDiv = document.createElement("div");  
        nameDiv.id = this.getType() + 'name' + skill.getName();
        nameDiv.innerHTML = skill.getDisplayText(); 
  
        newDivParent.appendChild(nameDiv);
        return newDivParent;
    }

    displayText () {
        for (let i = 0; i < this.skills.length; i++) {
          const skill = this.skills[i];
          skill.displayText();
        } 
        this.checkAllUnlocks(this.getCharacter());
    }

    getDisplayLocation () {
      if (this.type == 'skill') {
        return "#skilldisplay";
      } else if (this.type == 'job') {
        return "#jobdisplay";
      }
    }

    addSkills () {
        for (let i = 0; i < this.skills.length; i++) {
            const skill = this.skills[i];
            if (skill.isUnlocked()) {
              const newItem = this.skillElement(skill);
              $(this.getDisplayLocation()).append(newItem);
            }
        } 
    }

    refreshSkills () {
        $(this.getDisplayLocation()).empty();
        this.addSkills();
      }
}