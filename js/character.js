import { ItemManager } from './itemmanager.js';
import { ActionManager } from './actionmanager.js';
import { SkillManager } from './skillmanager.js';
import { UnlockManager } from './unlockmanager.js';
import { Market } from './market.js';
export class Character {
    constructor() {
      this.name = 'Dennis';
      this.im = new ItemManager(this);
      this.am = new ActionManager(this, 'action');
      this.jm = new SkillManager(this, 'job');
      this.sm = new SkillManager(this, 'skill');
      this.um = new ActionManager(this, 'unlock');
      this.hoveredaction = null;
      this.hovereditem = null;
      this.hoveredskill = null;
      this.hoveredtype = '';
      this.mk = new Market(this);
    }

    getMarket () {
      return this.mk
    }

    getHoveredType () {
      return this.hoveredtype
    }

    setHoveredType (set) {
      this.hoveredtype = set
    }

    replacer(key, value) {
      // Filtering out properties
      // if (typeof value === "string") {
      //     return undefined;
      // }
      if (key === "marketTime") {
        return undefined;
      }
      if (key === "changedValues") {
        return undefined;
      }
      if (key === "changedValues") {
        return undefined;
      }
      if (key === "character") {
        return undefined;
      }
      if (key === "am") {
        return undefined;
      }
      if (key === "jm") {
        return undefined;
      }
      if (key === "sm") {
        return undefined;
      }
      if (key === "um") {
        return undefined;
      }
      if (key === "hoveredaction") {
        return undefined;
      }
      if (key === "hovereditem") {
        return undefined;
      }
      if (key === "hoveredskill") {
        return undefined;
      }
      return value;
    }

    getCharacterExport () {
      const c = this
      const jsonStr = JSON.stringify(c, this.replacer);
      return jsonStr
    }

    numformat(num) {
      let fixed = 0;
      const numA = Math.abs(num)
      if (numA < 1) {
        if (numA % 1 != 0) {
          fixed = 1
        }
      }

      if (numA < 0.1) { 
        if (numA % 2 != 0) {
          fixed = 2
        }
      }

      if (numA < 0.01) { 
        if (numA % 3 != 0) {
          fixed = 3
        }
      }

      if (numA < 0.001) { 
        if (numA % 4 != 0) {
          fixed = 4
        }
      }

      // if (num < 0.0001) { 
      //   if (num % 5 != 0) {
      //     fixed = 5
      //   }
      // }

      return `${num.toFixed(fixed)}`
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

    getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        right: rect.right + window.scrollX,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }

    hoverdiv(e, divid, item, element=null){
      var left  = (e.clientX + 5)  + "px";
      var top  = (e.clientY + 5)  + "px";       
      var div = document.getElementById(divid);
      if (element != null) {
        // var rect = element.getBoundingClientRect();
        const eleLeft = this.getOffset(element).left
        let wantedX = (eleLeft + element.offsetWidth + 5)
        
        const swidth = screen.width;
        const check = (wantedX + 200 + 50)

        if (check > swidth) {
          wantedX = (eleLeft) - 200 - element.offsetWidth
        }
        left = wantedX + "px"
        top = (this.getOffset(element).top) + "px"
      }     
      div.style.left = left;
      div.style.top = top; 
      if (item != null) {
        $("#"+divid).show();
      } else {
        $("#"+divid).hide();
      }
    }

    hovertooltipdiv(e, item, element=null){
      this.hoverdiv(e, 'tooltipdiv', item, element)
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

    marketTick (time) {
      this.mk.tick(time)
    }


    tick (time) {
      this.im.tick(time);
      this.am.tick(time);
      this.um.tick(time);
      this.marketTick(time);
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