import { Action } from './action.js';
import { Result } from './result.js';
export class ActionManager {
    constructor(c) {
      this.actions = [];
      this.initialActions();
      this.character = c;
      this.usingactions = [];
      this.actionqueue = [];
    }

    initialActions () {
      const a = this.createAction('beg', 'Beg');
      a.setResultValue("cash", "itemvalue", 0.5);
      a.setResultValue("speech", "skillexp", 0.1);
      this.addAction(a);

      const a0 = this.createAction('streetperform', 'Street Perform');
      a0.setResultValue("cash", "itemvalue", 10);
      a0.setResultValue("streetsmarts", "skillexp", 10);
      a0.setResultValue("coordination", "skillexp", 10);
      this.addAction(a0);
      
      const a3 = this.createAction('pickuptrash', 'Pick Up Trash');
      a3.setResultValue("trash", "itemvalue", 1);
      a3.setResultValue("hobo", "jobexp", 1);
      a3.setUseTime(1);
      this.addAction(a3);

      const a2 = this.createAction('digtrash', 'Seperate Trash');
      // a2.setResultValue("cash", "itemvalue", 2);
      a2.setResultValueChance("paper", "itemvalue", 1, 0.5);
      a2.setResultValueChance("plastic", "itemvalue", 1, 0.5);
      a2.setResultValueChance("cardboard", "itemvalue", 1, 0.5);
      a2.setCostValue("trash", "itemvalue", -1);
      a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      a2.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a2);
    }

    addMessage(message) {
      this.character.addMessage(message)
    }

    getMaxActions () {
      return 1;
    }

    getCharacter () {
      return this.character
    }

    createAction (name, display) {
      const a = new Action(name, this);
      a.setDisplayName(display);
      return a;
    }

    addAction (action) {
      this.actions.push(action);
    }

    getItemManager () {
      return this.character.getItemManager();
    }

    getSkillManager () {
      return this.character.getSkillManager();
    }

    getJobManager () {
      return this.character.getJobManager();
    }

    findActionByName (name) {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].getName() == name) {
            return this.actions[i]
          }
      } 
      return null
    }

    checkAllUnlocks (character) {
      let madeUnlock = false;
      for (let i = 0; i < this.actions.length; i++) {
        const unlocked = this.actions[i].checkUnlock(character);
        if (unlocked) {
          madeUnlock = true;
        }
      }
      if (madeUnlock) {
        this.refreshActions();
      }
    }

    performSingleResult (result, thisclass) {
      const type = result.type;
      if (type == "itemvalue") {
        const im = thisclass.getItemManager();
        im.itemAction(result)
      } else if (type == "skillexp") {
        const sm = thisclass.getSkillManager();
        sm.itemAction(result)
      } else if (type == "jobexp") {
        const jm = thisclass.getJobManager();
        jm.itemAction(result);
      }
    }

    luckBasedChance (chance) {
      if (chance >= 1) {
        return true;
      }
      return this.getCharacter().luckBasedChance(chance);
    }

    performResultList (result, mult, thisclass) {
      const rs = result.getValues();
      for (let i = 0; i < rs.length; i++) {
        const rsm = rs[i]
        const chance = rsm.chance;
        if (thisclass.luckBasedChance(chance)) {
          const newRm = {name:rsm.name, type:rsm.type, value:rsm.value * mult}
          thisclass.performSingleResult(newRm, thisclass)
        }
      }
    }

    performResult (result, thisclass) {
      if (result == null) {
        return
      }
      let rm = result.getMult();
      if (result.isCost()) {
        rm = 1;
      }

      this.performResultList(result, rm, thisclass);
    }

    refreshCharacterText() {
      this.character.tickRefresh();
    }

    actionTick(time) {
      for (let i = this.usingactions.length - 1; i >= 0; i--) {
        const a = this.usingactions[i]
        a.tickUse(time)
        if(a.isUseTimeComplete()) {
          a.resetUseTime();
          this.performResult(a.getResult(), this);
          this.deleteUsingActionElement(a);
          this.usingactions.splice(i, 1);
          this.refreshCharacterText();
        }
      }
    }

    usingActionElement (action) {
      const newDivParent = document.createElement("div");
      newDivParent.classList.add("loadbargrid");
      newDivParent.id = 'actionusing' + action.getName();

      const nameDiv = document.createElement("div");
      nameDiv.id = 'actionusingtext' + action.getName();
      nameDiv.innerHTML = action.getActionUseStatusText();
      nameDiv.classList.add("loadbartext");
      newDivParent.appendChild(nameDiv);

      const bar = document.createElement("div"); 
      bar.classList.add("loadbarbar");
      
      newDivParent.appendChild(bar);

      const fullbar = document.createElement("div"); 
      fullbar.classList.add("fullbar");
      bar.appendChild(fullbar);

      const loadbarhovertext = document.createElement("span"); 
      loadbarhovertext.classList.add("loadbarhovertext");
      // loadbarhovertext.innerHTML = 'text';
      bar.appendChild(loadbarhovertext);
  
      const loadbar = document.createElement("div"); 
      loadbar.classList.add("loadbar");    
      fullbar.appendChild(loadbar);

      return newDivParent;
    }

    deleteUsingActionElement (action) {
      $('#actionusing' + action.getName()).remove()
    }

    createUsingActionElement (action) {
      const ele = this.usingActionElement(action)
      $("#actionusingdisplay").append(ele);
    }
    
    createUsingActionElementExists (action) {
      const alen = $('#actionusing' + action.getName()).length
      if (alen == 0) {
        this.createUsingActionElement(action)
      }
    }

    updateUsingAction (action) {
      const eleL = $('#actionusing' + action.getName());
      const ele = eleL[0];
      const textEle = ele.children[0];
      const txt = action.getActionUseStatusText();
      const barEle = ele.children[1];
      const innerBarEle = barEle.children[0].children[0];
      const per = action.getUsePercent();
      innerBarEle.style.width = per + "%";
      const barTextEle = barEle.children[1];
      barTextEle.innerHTML = `${per.toFixed(0)}%`;
      textEle.innerHTML = txt;
    }

    displayUsingActions () {
      for (let i = this.usingactions.length - 1; i >= 0; i--) {
        const action = this.usingactions[i]
        this.createUsingActionElementExists(action)
        this.updateUsingAction(action)
      }
    }

    currentActionLength () {
      return this.usingactions.length;
    }

    getQueue () {
      return this.actionqueue
    }

    addQueueItem () {
      const q = this.getQueue()
      if (q.length > 0) {
        const actionName = q[0];
        const action = this.findActionByName(actionName);
        if (action != null) {
          this.performAction(actionName, this);
          q.shift();
        }
      }
    }

    queueText () {
      const q = this.getQueue();
      let tx = 'Queue: '
      for (let i = 0; i < q.length; i++) {
        const action = this.findActionByName(q[i]);
        if (action == null) {
          continue;
        }
        tx += action.getDisplayName();
        if (i != q.length - 1) {
          tx += ', ';
        }    
      }

      if (q.length == 0) {
        tx += 'None'
      }

      return tx;
    }

    updateQueueText () {
      const tx = this.queueText();
      $('#actionqueuetext')[0].innerHTML = tx;
    }

    checkQueue () {
      if (this.currentActionLength() < this.getMaxActions()) {
        this.addQueueItem();
      }
      this.updateQueueText();
    }

    tick(time) {
      this.actionTick(time);
      this.displayUsingActions();
      this.checkQueue();
      this.checkAllUnlocks(this.getCharacter());
    }

    addUseAction(action, thisclass) {
      thisclass.usingactions.push(action);
    }

    performAction (name, thisclass) {
      const a = thisclass.findActionByName(name);
      const canDo = a.checkDoAction();
      if (canDo) {
        thisclass.performResult(a.getCost(), thisclass);
        if (a.hasUseTime()) {
          thisclass.addUseAction(a, thisclass)
        } else {
          thisclass.performResult(a.getResult(), thisclass);
        }
        thisclass.character.tickRefresh();
      }
    }

    pushQueueItem(name) {
      this.actionqueue.push(name)
    }

    addQueueItemName(name, thisclass) {
      thisclass.pushQueueItem(name);
    }

    alreadyDoingAction (name) {
      for (let i = 0; i < this.usingactions.length; i++) {
        if (this.usingactions[i] == name) {
          return true;
        }
      }
      return false;
    }

    checkPerformAction (name, thisclass) {
      const c = this.currentActionLength();
      const m = this.getMaxActions();
      const alreadyIn = this.alreadyDoingAction(name);
      const a = thisclass.findActionByName(name);
      const canDo = a.checkDoAction();
      if ((c < m) && !alreadyIn && canDo) {
        thisclass.performAction(name, thisclass);
      } else {
        thisclass.addQueueItemName(name, thisclass)
      }
    }

    createHandler (name, thisclass) {
        return function () {
          thisclass.checkPerformAction(name, thisclass);
        };
    }

    getResultDisplayName (result) {
      if (result.type == "itemvalue") {
        const im = this.getItemManager()
        const chance = result.chance
        if (chance >= 1) {
          return `${Math.abs(result.value)} ${im.getDisplayName(result.name)}`;
        } else {
          return `${Math.abs(result.value)} ${im.getDisplayName(result.name)} (${(chance * 100).toFixed(0)}%)`;
        }
      } else if (result.type == "skillexp") {
        const m = this.getSkillManager()
        return `${Math.abs(result.value)} ${m.getDisplayName(result.name)} SXP`;
      } else if (result.type == "jobexp") {
        const m = this.getJobManager()
        return `${Math.abs(result.value)} ${m.getDisplayName(result.name)} JXP`;
      }
      return `${Math.abs(result.value)} ${result.name}`;
    }

    toolTipElement (action) {
      const toolTipDiv = document.createElement("span");
      toolTipDiv.classList.add("tooltiptext");
      toolTipDiv.innerHTML = action.getDisplayName();

      const cost = action.getCost();
      if (cost !== null) {
        const costList = cost.getValues();
        if (costList.length > 0) {
          const resultsDiv = document.createElement("div");
          resultsDiv.innerHTML = 'Cost:'
          resultsDiv.classList.add("tooltipResult");
          const listEle = document.createElement("ul");
          resultsDiv.appendChild(listEle);

          toolTipDiv.appendChild(resultsDiv);
          for (let i = 0; i < costList.length; i++) {
            const rs = costList[i];
            const rsDiv = document.createElement("li");
            rsDiv.innerHTML = this.getResultDisplayName(rs);
            listEle.appendChild(rsDiv);
          }
        }
      }

      const result = action.getResult();
      if (result !== null) {
        const resultList = result.getValues();
        if (resultList.length > 0) {
          const resultsDiv = document.createElement("div");
          resultsDiv.innerHTML = 'Results:'
          resultsDiv.classList.add("tooltipResult");
          const listEle = document.createElement("ul");
          resultsDiv.appendChild(listEle);

          toolTipDiv.appendChild(resultsDiv);
          for (let i = 0; i < resultList.length; i++) {
            const rs = resultList[i];
            const rsDiv = document.createElement("li");
            rsDiv.innerHTML = this.getResultDisplayName(rs);
            listEle.appendChild(rsDiv);
          }
        }
      } 

      return toolTipDiv
    }

    actionElement (action) {
      const newDivParent = document.createElement("div");
      const nameDiv = document.createElement("div");  
      nameDiv.id = 'actionname' + action.getName();
      const buttonDiv = document.createElement("button");
      buttonDiv.innerHTML = action.getDisplayName(); 
      buttonDiv.onclick = this.createHandler(action.getName(), this);

      nameDiv.classList.add("tooltip");

      const toolTipDiv = this.toolTipElement(action)

      nameDiv.appendChild(toolTipDiv);
      nameDiv.appendChild(buttonDiv);
      newDivParent.appendChild(nameDiv);
      return newDivParent;
  }

    addActions () {
        for (let i = 0; i < this.actions.length; i++) {
          const action = this.actions[i];
          if (action.isUnlocked()) {
            const newItem = this.actionElement(action);
            $("#actiondisplay").append(newItem);
          }
        } 
    }

    refreshActions () {
      $("#actiondisplay").empty();
      this.addActions();
    }
  }