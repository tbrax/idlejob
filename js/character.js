import { ItemManager } from './itemmanager.js';
import { ActionManager } from './actionmanager.js';
import { JobManager } from './jobmanager.js';
import { SkillManager } from './skillmanager.js';
export class Character {
    constructor() {
      this.name = 'Name';
      this.im = new ItemManager();
      this.am = new ActionManager(this);
      this.jm = new JobManager();
      this.sm = new SkillManager();
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

    tick (time) {
      this.im.tick(time);
    }

    tickRefresh() {
      this.im.displayText();
      this.sm.displayText();
    }

    displayItems () {
      this.im.refreshItems();
      this.am.refreshActions();
      this.sm.refreshSkills();
    }

    getItems () {
      return this.im.getItems();
    }
  }