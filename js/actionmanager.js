import { Action } from './action.js';
import { Result } from './result.js';
import { Criteria } from './criteria.js';
export class ActionManager {
    constructor(c) {
      this.actions = [];
      this.initialActions();
      this.character = c;
      this.usingactions = [];
      this.actionqueue = [];
    }

    initialActions () {
      this.addAction1();
      this.addAction2();
      this.addAction3();
      this.addAction4();
      this.addAction5();
      this.addAction6();
      this.addAction7();
      // a4 = this.createAction('powerwash', 'Power Wash');
      // a4.setResultValue("cash", "itemvalue", 1);
    }

    addAction7 () { 
      const a = this.createAction('powerwash', 'Power Wash', 'For tough stains');
      a.setResultValue("cash", "itemvalue", 10);
      a.setResultValue("clean", "skillexp", 1);
      a.setResultValue("liquid", "skillexp", 1);
      a.setCostValue("water", "itemvalue", -1);
      a.setCostValue("soap", "itemvalue", -1);
      this.addAction(a);
    }

    addAction6 () { 
      const a = this.createAction('fillwater', 'Fill Water', 'Stay Hydrated');
      a.setResultValue("water", "itemvalue", 1.0);
      a.setResultValue("liquid", "skillexp", 0.1);
      this.addAction(a);
    }

    addAction1 () { 
      const a = this.createAction('panhandle', 'Panhandle', 'You do what you have to.');
      a.setResultValue("cash", "itemvalue", 0.5);
      a.setResultValue("speech", "skillexp", 0.1);
      a.setResultValue("hobo", "jobexp", 1);
      this.addAction(a);
    }

    addAction2 () { 
      const a0 = this.createAction('streetperform', 'Street Perform', '');
      a0.setResultValue("cash", "itemvalue", 10);
      a0.setResultValue("streetsmarts", "skillexp", 10);
      a0.setResultValue("coordination", "skillexp", 10);
      // const a01 = new Criteria();
      // a01.addScaleName('hobo', 'joblvl', 1);
      // a0.setResultValueCriteria("speed", "speed", 1, null);
      this.addAction(a0);
    }

    addAction3 () { 
      const a3 = this.createAction('pickuptrash', 'Pick Up Trash', '');
      a3.setResultValue("hobo", "jobexp", 1);
      // a3.setUseTime(0.1);
      const cr3 = new Criteria();
      a3.setResultValueCriteria("trash", "itemvalue", 1, cr3);
      const cr31 = new Criteria();
      cr31.addItemName('chance', 'chance', 0.1);
      cr31.addScaleAdd('hobo', 'joblvl', 0.1, 'chance');
      a3.setResultValueCriteria("trash", "itemvalue", 1, cr31);
      this.addAction(a3);
    }

    addAction4 () {
      const a2 = this.createAction('digtrash', 'Seperate Trash', '');
      a2.setResultValueChance("paper", "itemvalue", 1, 0.5);
      a2.setResultValueChance("plastic", "itemvalue", 1, 0.5);
      a2.setResultValueChance("cardboard", "itemvalue", 1, 0.5);
      a2.setResultValueChance("cash", "itemvalue", 1, 0.1);
      a2.setCostValue("trash", "itemvalue", -1);
      a2.setResultValue("hobo", "jobexp", 2);
      a2.setResultValue("coordination", "skillexp", 1);
      a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      a2.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a2);
    }

    addAction5 () {
      const a4 = this.createAction('cleanplate', 'Clean Plate', '');
      a4.setUnlockValue("dishwasher", "joblevel", 1, ">=");
      a4.setResultValue("dishwasher", "jobexp", 1);
      const a4c = new Criteria();
      a4c.addScaleName('dishwasher', 'joblvl', 0.1);
      a4.setResultValueCriteria("cash", "itemvalue", 1, a4c);
      this.addAction(a4);
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

    createAction (name, display, desc) {
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

    performResult (result) {
      if (result == null) {
        return
      }
      result.performResultList(this.getCharacter());
      // this.performResultList(result, rm, this);
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

    addUseAction(action) {
      this.usingactions.push(action);
    }

    performAction (name) {
      const a = this.findActionByName(name);
      const canDo = a.checkDoAction();
      if (canDo) {
        this.performResult(a.getCost(), this);
        if (a.hasUseTime()) {
          this.addUseAction(a, this)
        } else {
          this.performResult(a.getResult(), this);
        }
        this.character.tickRefresh();
      }
    }

    pushQueueItem(name) {
      this.actionqueue.push(name)
    }

    addQueueItemName(name) {
      this.pushQueueItem(name);
    }

    alreadyDoingAction (name) {
      for (let i = 0; i < this.usingactions.length; i++) {
        if (this.usingactions[i] == name) {
          return true;
        }
      }
      return false;
    }

    checkPerformAction (name) {
      const c = this.currentActionLength();
      const m = this.getMaxActions();
      const alreadyIn = this.alreadyDoingAction(name);
      const a = this.findActionByName(name);
      const canDo = a.checkDoAction();
      if ((c < m) && !alreadyIn && canDo) {
        this.performAction(name);
      } else {
        this.addQueueItemName(name)
      }
    }

    createHandler (name, thisclass) {
        return function () {
          thisclass.checkPerformAction(name);
        };
    }

    toolTipElement (action) {
      const toolTipDiv = document.createElement("span");
      toolTipDiv.classList.add("tooltiptext");
      toolTipDiv.innerHTML = action.getToolTipName();
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
            rsDiv.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter());
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
            rsDiv.innerHTML = result.getResultRowDisplayName(i, this.getCharacter());
            listEle.appendChild(rsDiv);
          }
        }
      } 
      return toolTipDiv
    }

    recalculateTooltips () {
      for (let i = 0; i < this.actions.length; i++) {
        const action = this.actions[i];
        if (action.isUnlocked()) {
          const actionName = 'actionname' + action.getName();
          const nameDiv = document.getElementById(actionName);

          // const toolTipDiv = this.toolTipElement(action)
          // nameDiv.appendChild(toolTipDiv);
        }
      } 
    }
  
    hoverdiv(e, divid){
      var left  = e.clientX  + "px";
      var top  = e.clientY  + "px";       
      var div = document.getElementById(divid);     
      div.style.left = left;
      div.style.top = top;      
      $("#"+divid).toggle();
      return false;
    }

    actionElement (action) {
      const newDivParent = document.createElement("span");
      const nameDiv = document.createElement("div");  
      nameDiv.id = 'actionname' + action.getName();
      const buttonDiv = document.createElement("button");
      buttonDiv.innerHTML = action.getDisplayName(); 
      buttonDiv.onclick = this.createHandler(action.getName(), this);
      buttonDiv.addEventListener('mouseover', e => {
        this.hoverdiv(e, 'tooltipdiv')
      })

      buttonDiv.addEventListener('mouseleave', e => {
        this.hoverdiv(e, 'tooltipdiv')
      })

      nameDiv.classList.add("tooltip");
      // const toolTipDiv = this.toolTipElement(action)
      // nameDiv.appendChild(toolTipDiv);

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
      this.recalculateTooltips();
    }



    refreshActions () {
      $("#actiondisplay").empty();
      this.addActions();
    }
  }