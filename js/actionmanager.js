import { Action } from './action.js';
import { Result } from './result.js';
export class ActionManager {
    constructor(c) {
      this.actions = [];
      this.initialActions();
      this.character = c;
    }

    getCharacter () {
      return this.c
    }

    createAction (name, display) {
      const a = new Action(name);
      a.setDisplayName(display);
      return a;
    }

    addAction (action) {
      this.actions.push(action);
    }

    initialActions () {
      const a = this.createAction('beg', 'Beg');
      const r = new Result();
      r.addItemName("cash", "itemvalue", 0.5);
      r.addItemName("trash", "itemvalue", 0.1);
      r.addItemName("speech", "skillexp", 1);
      a.setResult(r);
      this.addAction(a);

      const a0 = this.createAction('streetperform', 'Street Perform');
      const r0 = new Result();
      r0.addItemName("cash", "itemvalue", 10);
      r0.addItemName("streetsmarts", "skillexp", 10);
      r0.addItemName("coordination", "skillexp", 10);
      a0.setResult(r0);
      this.addAction(a0);
    }

    getItemManager (thisclass) {
      return thisclass.character.getItemManager();
    }

    getSkillManager (thisclass) {
      return thisclass.character.getSkillManager();
    }

    findActionByName (name) {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].getName() == name) {
            return this.actions[i]
          }
      } 
      return null
    }

    performSingleResult (result, thisclass) {
      const type = result.type;
      if (type == "itemvalue") {
        const im = thisclass.getItemManager(thisclass)
        im.itemAction(result)
      } else if (type == "skillexp") {
        const sm = thisclass.getSkillManager(thisclass)
        sm.itemAction(result)
      }
    }

    performResultList (result, mult, thisclass) {
      const rs = result.getValues();
      for (let i = 0; i < rs.length; i++) {
        const rsm = rs[i]
        const newRm = {name:rsm.name, type:rsm.type, value:rsm.value * mult}
        thisclass.performSingleResult(newRm, thisclass)
      }
    }

    performResult (result, thisclass) {
      if (result == null) {
        return
      }
      const rm = result.getMult();
      this.performResultList(result, rm, thisclass);
    }

    performAction (name, thisclass) {
      const a = thisclass.findActionByName(name);
      if (a.checkDoAction()) {
        thisclass.performResult(a.getCost(), thisclass);
        thisclass.performResult(a.getResult(), thisclass);
        thisclass.character.tickRefresh();
      }
    }

    createHandler (name, thisclass) {
        return function () {
          thisclass.performAction(name, thisclass);
        };
    }

    actionElement (action) {
      const newDivParent = document.createElement("div");
      const nameDiv = document.createElement("div");  
      nameDiv.id = 'actionname' + action.getName();
      const buttonDiv = document.createElement("button");
      buttonDiv.innerHTML = action.getDisplayName(); 
      buttonDiv.onclick = this.createHandler(action.getName(), this);

      nameDiv.appendChild(buttonDiv);
      newDivParent.appendChild(nameDiv);
      return newDivParent;
  }

    addActions () {
        for (let i = 0; i < this.actions.length; i++) {
            const newItem = this.actionElement(this.actions[i]);
            $("#actiondisplay").append(newItem);
        } 
    }

    refreshActions () {
      $("#actiondisplay").empty();
      this.addActions();
    }
  }