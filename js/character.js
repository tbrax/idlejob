import { ItemManager } from './itemmanager.js';
import { ActionManager } from './actionmanager.js';
import { JobManager } from './jobmanager.js';
import { SkillManager } from './skillmanager.js';
export class Character {
    constructor() {
      this.name = 'Name';
      this.im = new ItemManager();
      this.am = new ActionManager(this);
      this.jm = new SkillManager(this, 'job');
      this.sm = new SkillManager(this, 'skill');
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

    getBaseSpeed () {
      return 0;
    }

    tick (time) {
      this.im.tick(time);
      this.am.tick(time);
      this.tickRefresh();
    }

    tickRefresh () {
      this.im.displayText();
      this.sm.displayText();
      this.jm.displayText();
    }

    displayItems () {
      this.im.refreshItems();
      this.am.refreshActions();
      this.sm.refreshSkills();
      this.jm.refreshSkills();
    }

    getItems () {
      return this.im.getItems();
    }
  }