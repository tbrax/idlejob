import { ItemManager } from './itemmanager.js';
import { ActionManager } from './actionmanager.js';
import { SkillManager } from './skillmanager.js';
import { UnlockManager } from './unlockmanager.js';
export class Character {
    constructor() {
      this.name = 'Name';
      this.im = new ItemManager(this);
      this.am = new ActionManager(this, 'action');
      this.jm = new SkillManager(this, 'job');
      this.sm = new SkillManager(this, 'skill');
      this.um = new ActionManager(this, 'unlock');
      this.hoveredaction = null;
      this.hovereditem = null;
      this.hoveredskill = null;
    }

    numformat(num) {
      let fixed = 0;
      if (num % 1 != 0) {
        fixed = 1
      }
      return `${Math.abs(num).toFixed(fixed)}`
    }

    specialResult (result) {
      console.log(result);
    }

    getHoveredItem () {
      return this.hovereditem;
    }

    setHoveredItem (name) {
      this.clearHoveredActions();
      this.hovereditem = name;
      if (name != null) {
        this.showTooltipTypes('item');
      } else {
        this.clearTooltip();
      }
    }

    getHoveredAction () {
      return this.hoveredaction;
    }

    setHoveredAction (name) {
      this.clearHoveredActions();
      this.hoveredaction = name;
      if (name != null) {
        this.showTooltipTypes('action');
      } else {
        this.clearTooltip();
      } 
    }

    getHoveredSkill () {
      return this.hoveredskill;
    }

    clearHoveredActions () {
      this.hovereditem = null;
      this.hoveredaction = null;
      this.hoveredskill = null;
    }

    setHoveredSkill (name) {
      this.clearHoveredActions();
      this.hoveredskill = name;
      if (name != null) {
        this.showTooltipTypes('skill');
      } else {
        this.clearTooltip();
      } 
    }
    
    clearTooltip () {
      const n = document.getElementById('tooltipname');
      n.innerHTML = '';
      const d = document.getElementById('tooltipdesc');
      d.innerHTML = '';
    }



    showTooltipTypes (type) {
      const t0 = document.getElementById('tooltipaction');     
      const t1 = document.getElementById('tooltipitem');
      const t2 = document.getElementById('tooltipskill');
      const t3 = document.getElementById('tooltipunlock');
      if (type == 'action') {
        t0.classList.remove("hidden");
        t1.classList.add("hidden");
        t2.classList.add("hidden");
        t3.classList.add("hidden");
      } else if (type == 'item') {
        t0.classList.add("hidden");
        t1.classList.remove("hidden");
        t2.classList.add("hidden");
        t3.classList.add("hidden");
      } else if (type == 'skill') {
        t0.classList.add("hidden");
        t1.classList.add("hidden");
        t2.classList.remove("hidden");
        t3.classList.add("hidden");
      } else if (type == 'none') {
        t0.classList.add("hidden");
        t1.classList.add("hidden");
        t2.classList.add("hidden");
        t3.classList.add("hidden");
      }
    }

    hoverdiv(e, divid, item){
      var left  = (e.clientX + 5)  + "px";
      var top  = (e.clientY + 5)  + "px";       
      var div = document.getElementById(divid);     
      div.style.left = left;
      div.style.top = top; 
      if (item != null) {
        $("#"+divid).show();
      } else {
        $("#"+divid).hide();
      }
    }

    hovertooltipdiv(e, item){
      this.hoverdiv(e, 'tooltipdiv', item)
    }

    addMessage (message) {

    }

    getItemManager () {
      return this.im;
    }

    getSkillManager () {
      return this.sm;
    }

    getJobManager () {
      return this.jm;
    }

    getActionManager () {
      return this.am;
    }

    getBaseSpeed () {
      return 0;
    }

    tick (time) {
      this.im.tick(time);
      this.am.tick(time);
      this.um.tick(time);
      this.tickRefresh();
    }

    tickRefresh () {
      this.im.displayText();
      this.sm.displayText();
      this.jm.displayText();
      // this.um.displayText();
    }

    displayItems () {
      this.im.refreshItems();
      this.am.refreshActions();
      this.um.refreshActions();
      this.sm.refreshSkills();
      this.jm.refreshSkills();
    }

    getItems () {
      return this.im.getItems();
    }
  }