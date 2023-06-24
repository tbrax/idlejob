import { Skill } from './skill.js';
import { Criteria } from './criteria.js';
export class SkillManager {
    constructor(c, type) {
      this.skills = [];
      this.character = c;
      this.type = type;
      this.initialCreate();
      this.currentJob = null;
    }

    initialJobs () {
      this.initialJob0();
      this.initialJob1();
      this.initialJob2();
      this.initialJob3();
      this.initialJob4();
    }

    initialJob4() {
      const a1 = this.createSkill('dishwasher', 'Dish Washer', 'Scrape your plate');
      const cr = new Criteria();
      cr.addScaleName('dishwasher', 'joblvl', 0.1);
      a1.addActiveBonusCriteria("soap", "gainvalue", 0.0, cr);  
      a1.setLevel(1);
      this.addSkill(a1);
    }

    initialJob3() {
      const a1 = this.createSkill('collegestudent', 'College Student', 'Teach Yourself');
      const cr = new Criteria();
      cr.addScaleName('collegestudent', 'joblevel', 1);
      a1.addActiveBonusCriteria("skillexpbonus", "itemvalue", 0.0, cr);  
      a1.setLevel(1);
      a1.doUnlock(1);
      this.addSkill(a1);
    }

    initialJob2() {
      const a1 = this.createSkill('pickpocket', 'Pickpocket', 'Yoink!');
      const cr = new Criteria();
      cr.addScaleName('pickpocket', 'joblevel', -0.001);
      a1.addActiveBonusCriteria("legaltrouble", "gainvalue", 0.0, cr);  
      a1.setLevel(1);
      // a1.setUnlockValue("coordination", "skilllevel", 1, ">=");
      //const cr = new Criteria();
      // cr.addScaleName('pickpocket', 'joblevel', 0.1);
      // a1.addActiveBonusCriteria("soap", "gainvalue", 0.0, cr); 

      a1.doUnlock(1);
      this.addSkill(a1);
    }

    initialJob1() {
      const a1 = this.createSkill('dishwasher', 'Dish Washer', 'Scrape your plate');
      const cr = new Criteria();
      cr.addScaleName('dishwasher', 'joblvl', 0.1);
      a1.addActiveBonusCriteria("soap", "gainvalue", 0.0, cr);  
      a1.setLevel(1);
      this.addSkill(a1);
    }

    initialJob0() {
      const a0 = this.createSkill('hobo', 'Hobo', "Don't forget your bindle");
      // a0.setUnlockValue("trash", "itemvalue", 1, ">=");
      // a0.addActiveBonusValue("trash", "gainvalue", 0.1);
      const cr = new Criteria();
      cr.addScaleName('hobo', 'joblvl', 0.1);
      a0.addActiveBonusCriteria("trash", "gainvalue", 0.0, cr);  
      this.addSkill(a0);
    }

    initialSkills () {
      this.initialSkills0();
      this.initialSkills1();
      this.initialSkills3();
      this.initialSkills4();
      this.initialSkills5();
    }

    initialSkills5() {
      this.createInitialSkill('woodworking', 'Woodworking', "Express yourself");
      this.createInitialSkill('treecutting', 'Tree Cutting', "My favorite part is the chainsaw");
      this.createInitialSkill('construction', 'Construction', "Can we build it? Yes we can!");
      this.createInitialSkill('welding', 'Welding', "You get extra cool sunglasses");
    }

    initialSkills4() {
      this.createInitialSkill('speech', 'Speech', 'Me talk good');
      this.createInitialSkill('culture', 'Culture', 'Learn about the world');
      this.createInitialSkill('language', 'Language', 'Hello. Hola. Bonjour. Nǐ hǎo.');
    }

    initialSkills3() {
      this.createInitialSkill('math', 'Math', "Knowing this is a big plus");
      this.createInitialSkill('finance', 'Finance', 'The numbers crunch in your favor');
    }

    initialSkills1() {
      this.createInitialSkill('medical', 'Medical', "It's mostly just remembering funny words");
      this.createInitialSkill('biology', 'Biology', "Study of the Flesh");
      this.createInitialSkill('chemistry', 'Chemistry', "You can practice by mixing soda");
    }

    initialSkills0() {
      this.createInitialSkill('streetsmarts', 'Street Smarts', "Also known as 'Avenue Astuteness', 'Boulevard Brilliance', and 'Road Resourcefulness'");
      this.createInitialSkill('law', 'Law', 'Bend and break it to your will');
      this.createInitialSkill('coordination', 'Coordination', 'Eye on the ball');
      this.createInitialSkill('clean', 'Clean', 'Everyone should probably know how to do this');
      this.createInitialSkill('liquid', 'Liquid', "Hydroengineering sounds a bit too pretentious");
      this.createInitialSkill('animals', 'Animals', "Chicken go CLUCK CLUCK, cow go MOO, piggy go OINK OINK how 'bout you?");
      this.createInitialSkill('supernatural', 'Supernatural', "Look deeper");
      this.createInitialSkill('aliens', 'Aliens', "The truth is out there");
      this.createInitialSkill('darkness', 'Darkness', "I was born in the darkness");
      this.createInitialSkill('light', 'Light', "Don't look directly at it");
      this.createInitialSkill('crime', 'Crime', "Do a crime");
    }

    createInitialSkill(name, displayname, desc) {
      const a3 = this.createSkill(name, displayname, desc);
      this.addSkill(a3);
    }

    getCharacter() {
      return this.character;
    }

    unlockSkillByName (name) {
      const sk = this.findSkillByName(name);
      if (sk != null) {
        sk.doWantUnlock();
      }
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

    totalSkillLevel () {
      let total = 0;
      for (let i = 0; i < this.skills.length; i++) {
        total += this.skills[i].getLevel();
      }
      return total;
    }

    createSkill (name, display, desc='') {
        const a = new Skill(name, this.getType(), this.getCharacter());
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

    getGlobalSkillExpBonus () {
      const im = this.getCharacter().getItemManager()
      const valu = im.getItemValue("skillexpbonus")
      return 1 + (valu/100);
    }

    itemAction (result) {
        const skill = this.findSkillByName(result.name);
        const type = result.type;
        if (skill == null) {
          return
        }
        if (type == "skillexp") {
          if (!skill.isUnlocked()) {
            skill.doWantUnlock();
            this.checkAllUnlocks();
          }
          skill.gainExp(result.value * this.getGlobalSkillExpBonus());
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

        newDivParent.addEventListener('mouseover', e => {
          this.setHoveredSkill(skill.getName());
          this.hoverdiv(e, this.getHoveredSkill())
        })
    
        newDivParent.addEventListener('mouseleave', e => {
          this.setHoveredSkill(null);
          this.hoverdiv(e, this.getHoveredSkill())
        })

        return newDivParent;
    }

    getHoveredSkill () {
      return this.getCharacter().getHoveredSkill();
    }

    setHoveredSkill (name) {
      this.getCharacter().setHoveredSkill(name);
    }

    hoverdiv(e, skill){
      this.getCharacter().hovertooltipdiv(e, skill)
    }

    remakeTooltipName (skill) {
      const n = document.getElementById('tooltipname');
      n.innerHTML = skill.getDisplayName();
      const d = document.getElementById('tooltipdesc');
      d.innerHTML = skill.getDesc();
    }

    remakeTooltipActiveDiv (skill) {
      const act = skill.getActiveBonus();
      var tc = document.getElementById('tooltipskillactivelist');
      $("#tooltipskillactivelist").empty();
      if (act !== null) {
        const actList = act.getValues();
        if (actList.length > 0) { 
          for (let i = 0; i < actList.length; i++) {
            const costRow = document.createElement("li"); 
            costRow.id = 'skillactiverow' + i;
            costRow.innerHTML = act.getResultRowDisplayName(i, this.getCharacter());
            tc.appendChild(costRow);
          }
        }
      }
    }

    remakeTooltipCost (skill) {
      this.remakeTooltipName(skill);
      this.remakeTooltipActiveDiv(skill);
    }

    remakeTooltip () {
      if (this.getHoveredSkill() != null) {
        const skill = this.findSkillByName(this.getHoveredSkill())
        if (skill != null) {
          this.remakeTooltipCost(skill);
        }
      }
    }

    recalculateTooltips () {
      this.remakeTooltip();
    }

    displayText () {
      for (let i = 0; i < this.skills.length; i++) {
        const skill = this.skills[i];
        skill.displayText();
      } 
      this.checkAllUnlocks(this.getCharacter());
      this.recalculateTooltips();
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