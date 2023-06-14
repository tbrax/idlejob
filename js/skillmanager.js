import { Skill } from './skill.js';
export class SkillManager {
    constructor(c) {
      this.skills = [];
      this.character = c;
      this.initialSkills();
    }

    createSkill (name, display) {
        const a = new Skill(name);
        a.setDisplayName(display);
        return a;
    }

    addSkill (skill) {
        this.skills.push(skill);
    }

    initialSkills () {
        const a0 = this.createSkill('speech', 'Speech')
        this.addSkill(a0);

        const a1 = this.createSkill('streetsmarts', 'Street Smarts')
        this.addSkill(a1);

        const a2 = this.createSkill('coordination', 'Coordination')
        this.addSkill(a2);
    }

    findSkillByName (name) {
        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].getName() == name) {
              return this.skills[i]
            }
        } 
        return null
      }

    itemAction (result) {
        const skill = this.findSkillByName(result.name);
        const type = result.type;
        if (skill == null) {
          return
        }
        if (type == "skillexp") {
            skill.gainExp(result.value);
        }
    }

    skillElement (skill) {
        const newDivParent = document.createElement("div");
        const nameDiv = document.createElement("div");  
        nameDiv.id = 'skillname' + skill.getName();
        nameDiv.innerHTML = skill.getDisplayText(); 
  
        newDivParent.appendChild(nameDiv);
        return newDivParent;
    }

    displayText () {
        for (let i = 0; i < this.skills.length; i++) {
          const skill = this.skills[i];
          skill.displayText();
        } 
      }

    addSkills () {
        for (let i = 0; i < this.skills.length; i++) {
            const newItem = this.skillElement(this.skills[i]);
            $("#skilldisplay").append(newItem);
        } 
    }

    refreshSkills () {
        $("#skilldisplay").empty();
        this.addSkills();
      }
}