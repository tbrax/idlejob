import { Skill } from './skill.js';
export class SkillManager {
    constructor(c, type) {
      this.skills = [];
      this.character = c;
      this.type = type;
      this.initialCreate();
      this.currentJob = null;
    }

    initialJobs () {
      const a0 = this.createSkill('hobo', 'Hobo');
      a0.setUnlockValue("trash", "itemvalue", 1, ">=");
      a0.addActiveBonusValue("trash", "gainvalue", 0.1);
      this.addSkill(a0);

      const a1 = this.createSkill('dishwasher', 'Dish Washer');
      a1.addActiveBonusValue("soap", "gainvalue", 0.1);
      a1.setLevel(1);
      this.addSkill(a1);
    }

    initialSkills () {
      this.createInitialSkill('streetsmarts', 'Street Smarts', '');

      this.createInitialSkill('speech', 'Speech', '');

      this.createInitialSkill('coordination', 'Coordination', '');

      this.createInitialSkill('clean', 'Clean', '');

      this.createInitialSkill('liquid', 'Liquid', '');
    }

    createInitialSkill(name, displayname, desc) {
      const a3 = this.createSkill(name, displayname, desc);
      this.addSkill(a3);
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

    createSkill (name, display, desc) {
        const a = new Skill(name, this.getType());
        a.setDisplayName(display);
        a.setDesc(desc);
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

    toggleSkill (name) {
      const skill = this.findSkillByName(name);
      if (skill != null) {
        skill.toggleActive(this.getCharacter());
      }
    }

    createHandler (name, thisclass) {
      return function () {
        thisclass.toggleSkill(name);
      };
    }

    skillElement (skill) {
        const newDivParent = document.createElement("button");
        newDivParent.id = this.getType() + 'namebutton' + skill.getName();
        const nameDiv = document.createElement("div");  
        nameDiv.id = this.getType() + 'name' + skill.getName();
        nameDiv.innerHTML = skill.getDisplayText(); 
  
        newDivParent.appendChild(nameDiv);
        newDivParent.onclick = this.createHandler(skill.getName(), this);
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