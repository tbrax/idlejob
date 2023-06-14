import { ItemManager } from './itemmanager.js';
import { ActionManager } from './actionmanager.js';
export class Character {
    constructor() {
      this.name = 'Name';
      this.im = new ItemManager();
      this.am = new ActionManager();
    }

    getItemManager () {
      return im;
    }

    tick (time) {
      this.im.tick(time);
    }

    displayItems () {
      this.im.displayItems();
    }

    getItems () {
      return this.im.getItems();
    }
  }