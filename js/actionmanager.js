import { Action } from './action.js';
import { Result } from './result.js';
import { Criteria } from './criteria.js';
export class ActionManager {
    constructor(c, type) {
      this.actions = [];  
      this.character = c;
      this.usingactions = [];
      this.actionqueue = [];
      this.hoveredaction = null;
      this.lasthoveredaction = null;
      this.type = type;
      this.initial();
    }

    getType () {
      return this.type;
    }

    initial () {
      if (this.type == 'action') {
        this.initialActions();
      } else if (this.type == 'unlock') {
        this.initialUnlocks();
      }
    }

    initialUnlocks () {
      this.addUnlock1();
      this.addUnlock2();
      this.addUnlock3();
      this.addUnlock4();
      this.addUnlock5();
      this.addUnlock6();
    }

    addUnlock7 () { 
      const a = this.createUnlock('becomejobbutler', 'Become Butler', "");
      a.setUnlockValue("joboffer", "itemmaxvalue", 2, ">=");
      a.setResultValue("collegestudent", "unlockjob", 0);
      this.addAction(a);
    }

    addUnlock6 () { 
      const a = this.createUnlock('becomejobcollegestudent', 'Become College Student', "");
      a.setUnlockValue("joboffer", "itemmaxvalue", 2, ">=");
      a.setResultValue("collegestudent", "unlockjob", 0);
      this.addAction(a);
    }

    addUnlock5 () { 
      const a5 = this.createUnlock('improveresume', 'Improve Resume', "Get better job offers with this");
      a5.setResultValue("joboffer", "itemmaxvalue", 1);
      a5.setCostValue("cash", "itemvalue", -1);
      a5.setUnlockValue("totaljoblevel", "totaljoblevel", 3, ">=");
      this.addAction(a5);
    }
   
    addUnlock4 () { 
      const a = this.createUnlock('becomejobpickpocket', 'Become Pickpocket', "The streets raised me. The gutter was my uncle. My cousin was that lamp.");
      // a.setResultValueSpecial("Special text", "special", 1000, 'Make all the rules');
      a.setResultValue("pickpocket", "unlockjob", 0);
      a.setCostValue("joboffer", "itemvalue", -1);
      a.setUnlockValue("coordination", "skilllevel", 1, ">=");
      // a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      this.addAction(a);
    }

    addUnlock3 () { 
      const a = this.createUnlock('denizensofthecity', 'Denizens of the City', "Call various animals to your side");
      // a.setResultValueSpecial("Special text", "special", 1000, 'Make all the rules');
      a.setResultValue("trainrat", "unlockaction", 0);
      a.setResultValue("trainpigeon", "unlockaction", 0);
      a.setUnlockValue("hobo", "joblevel", 1, ">=");
      a.setCostValue("trash", "itemvalue", -10);
      this.addAction(a);

      const a2 = this.createUnlock('cardboardhouse', 'Cardboard House', "Just watch for rain");
      a2.setResultValue("space", "itemvalue", 10);
      a2.setCostValue("cardboard", "itemvalue", -10);
      a2.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a2);

      const a3 = this.createUnlock('trashcan', 'Trash Can', "A fine receptacle");
      a3.setResultValue("trash", "itemmaxvalue", 20);
      a3.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a3);

      const a4 = this.createUnlock('ratking', 'Rat King', "I'm the giant rat that makes all the rules");
      a4.setResultValue("rats", "itemmaxvalue", 20);
      a4.setCostValue("trash", "itemvalue", -1);
      a4.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a4);

      const a5 = this.createUnlock('rooftopcoop', 'Rooftop Coop', "You can really feel the wind 7 stories up");
      a5.setResultValue("pigeon", "itemmaxvalue", 20);
      a5.setCostValue("trash", "itemvalue", -1);
      a5.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a5);
    }

    addUnlock2 () { 
      const a = this.createUnlock('becomejobdishwasher', 'Become Dishwasher', "Gotta start somewhere");
      // a.setResultValueSpecial("Special text", "special", 1000, 'Make all the rules');
      a.setResultValue("dishwasher", "unlockjob", 0);
      a.setCostValue("joboffer", "itemvalue", -1);
      a.doUnlock();
      // a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      this.addAction(a);
    }
    

    addUnlock1 () { 
      const a = this.createUnlock('becomejobhobo', 'Become Hobo', "Do you really need a job offer for this?");
      // a.setResultValueSpecial("Special text", "special", 1000, 'Make all the rules');
      a.setResultValue("hobo", "unlockjob", 0);
      a.setCostValue("joboffer", "itemvalue", -1);
      a.doUnlock();
      // a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      this.addAction(a);
    }

    addUnlock0 () { 
      const a = this.createUnlock('ratking', 'Rat King', "I'm the giant rat that makes all the rules");
      // a.setResultValueSpecial("Special text", "special", 1000, 'Make all the rules');
      a.setResultValue("hobo", "unlockjob", 0);
      a.setCostValue("trash", "itemvalue", -1);
      this.addAction(a);
    }

    initialActions () {
      this.addAction1();
      this.addAction2();
      this.addAction3();
      this.addAction4();
      this.addAction5();
      this.addAction6();
      this.addAction7();
      this.addAction8();
      this.addAction9();
      this.addAction10();
      this.addAction11();
      this.addAction12();
      this.addAction13();
      this.addAction14();
      this.addAction15();
      // a4 = this.createAction('powerwash', 'Power Wash');
      // a4.setResultValue("cash", "itemvalue", 1);
    }

    addAction15 () { 
      const a = this.createAction('studyshop', 'Shop Class', "Work with your hands");
      a.setResultValue("construction", "skillexp", 10);
      a.setResultValue("woodworking", "skillexp", 10);
      a.setResultValue("welding", "skillexp", 10);
      a.setUnlockValue("collegestudent", "joblevel", 1, ">=");
      a.setResultValue("collegestudent", "jobexp", 1);
      a.setCostValue("cash", "itemvalue", -50);
      this.addAction(a);
    }

    addAction14 () { 
      const a = this.createAction('studysocial', 'Social Studies Class', "Learn about social");
      a.setResultValue("speech", "skillexp", 10);
      a.setResultValue("culture", "skillexp", 10);
      a.setResultValue("language", "skillexp", 10);
      a.setUnlockValue("collegestudent", "joblevel", 1, ">=");
      a.setResultValue("collegestudent", "jobexp", 1);
      a.setCostValue("cash", "itemvalue", -50);
      this.addAction(a);
    }

    addAction13 () { 
      const a = this.createAction('studyscience', 'Science Class', "Learn about science");
      a.setResultValue("biology", "skillexp", 10);
      a.setResultValue("chemistry", "skillexp", 10);
      a.setUnlockValue("collegestudent", "joblevel", 1, ">=");
      a.setResultValue("collegestudent", "jobexp", 1);
      a.setCostValue("cash", "itemvalue", -50);
      this.addAction(a);
    }

    addAction12 () { 
      const a = this.createAction('bribe', 'Bribe', "Mr. Green says I ain't done nothing");
      a.setResultValue("legaltrouble", "itemvalue", -10);
      a.setResultValue("speech", "skillexp", 1);
      a.setResultValue("finance", "skillexp", 1);
      a.setResultValue("law", "skillexp", 1);
      a.setUnlockValue("legaltrouble", "itemvalue", 1, ">=");
      a.setCostValue("cash", "itemvalue", -50);
      this.addAction(a);
    }

    addAction11 () { 
      const a = this.createAction('pickpocketskill', 'Pick Pocket', "Good thing wallet chains are out of style");
      a.setResultValue("karma", "itemvalue", -0.01);
      a.setResultValue("legaltrouble", "itemvalue", 0.1);
      a.setResultValueChance("cash", "itemvalue", 10, 0.6);
      a.setResultValue("coordination", "skillexp", 1);
      a.setResultValue("streetsmarts", "skillexp", 1);
      a.setResultValue("crime", "skillexp", 1);
      a.setUnlockValue("pickpocket", "joblevel", 1, ">=");
      this.addAction(a);
    }

    addAction10 () { 
      const a = this.createAction('trainrat', 'Train Rat', "His name is squeaks");
      a.setResultValue("animals", "skillexp", 10);
      a.setResultValue("rats", "itemvalue", 1);
      // a.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a);

      const a2 = this.createAction('trainpigeon', 'Train Pigeon', "His name is splats");
      a2.setResultValue("pigeon", "itemvalue", 1);
      a2.setResultValue("animals", "skillexp", 10);
      // a2.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a2);
    }

    addAction9 () { 
      const a = this.createAction('findjob', 'Find Job', "No experience required");
      a.setResultValue("joboffer", "itemvalue", 1);
      a.doUnlock();
      this.addAction(a);
    }

    addAction8 () { 
      const a = this.createAction('blackmail', 'Blackmail', "I prefer 'extortion'. The 'X' makes it sound cool.");
      a.setResultValue("cash", "itemvalue", 1000);
      a.setCostValue("secret", "itemvalue", -1);
      this.addAction(a);
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
      a.setResultValue("water", "itemvalue", 1);
      a.setResultValue("liquid", "skillexp", 1);
      this.addAction(a);
    }

    addAction1 () { 
      const a = this.createAction('panhandle', 'Panhandle', "You'll do what you have to");
      a.setResultValue("cash", "itemvalue", 0.3);
      a.setResultValue("speech", "skillexp", 1);
      a.setResultValue("hobo", "jobexp", 1);
      a.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a);
    }

    addAction2 () { 
      const a0 = this.createAction('streetperform', 'Street Perform', '');
      a0.setResultValue("cash", "itemvalue", 10);
      a0.setResultValue("streetsmarts", "skillexp", 10);
      a0.setResultValue("coordination", "skillexp", 10);
      // const a01 = new Criteria();
      // a01.addScaleName('hobo', 'joblevel', 1);
      // a0.setResultValueCriteria("speed", "speed", 1, null);
      this.addAction(a0);
    }

    addAction3 () { 
      const a3 = this.createAction('pickuptrash', 'Pick Up Trash', 'Ooh a piece of candy!');
      a3.setResultValue("hobo", "jobexp", 1);
      // a3.setUseTime(0.1);
      const cr3 = new Criteria();
      a3.setResultValueCriteria("trash", "itemvalue", 1, cr3);
      const cr31 = new Criteria();
      cr31.addItemName('chance', 'chance', 0.1);
      cr31.addScaleAdd('hobo', 'joblevel', 0.1, 'chance');
      a3.setResultValueCriteria("trash", "itemvalue", 1, cr31);

      // const c1 = new Criteria();
      // c1.addItemName("hobo", "joblevel", 2, ">="); 
      // c1.addItemName('chance', 'chance', 0.1);
      // a3.setResultValueCriteria("secret", "itemvalue", 1, c1);

      a3.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a3);
    }

    addAction4 () {
      const a2 = this.createAction('digtrash', 'Seperate Trash', "Let's Find out what's in here");
      a2.setResultValueChance("paper", "itemvalue", 1, 0.5);
      a2.setResultValueChance("plastic", "itemvalue", 1, 0.5);
      a2.setResultValueChance("cardboard", "itemvalue", 1, 0.5);
      a2.setResultValueChance("cash", "itemvalue", 1, 0.1);
      a2.setCostValue("trash", "itemvalue", -5);

      a2.setResultValue("hobo", "jobexp", 2);
      a2.setResultValue("coordination", "skillexp", 10);

      a2.setUnlockValue("trash", "itemvalue", 1, ">=");
      // a2.setUnlockValue("hobo", "joblevel", 1, ">=");
      this.addAction(a2);
    }

    addAction5 () {
      const a4 = this.createAction('cleanplate', 'Clean Plate', 'Licking optional');
      a4.setUnlockValue("dishwasher", "joblevel", 1, ">=");

      a4.setResultValue("dishwasher", "jobexp", 1);
      const a4c = new Criteria();
      a4c.addScaleName('dishwasher', 'joblevel', 0.1);
      a4.setResultValueCriteria("cash", "itemvalue", 1, a4c);
      this.addAction(a4);
    }

    getHoveredAction () {
      return this.getCharacter().getHoveredAction();
    }

    setHoveredAction (name) {
      this.getCharacter().setHoveredAction(name);
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

    createUnlock (name, display, desc='') {
      const a = new Action(name, this);
      a.setDisplayName(display);
      a.setDesc(desc);

      a.setAsUnlock();
      return a;
    }

    createAction (name, display, desc='') {
      const a = new Action(name, this);
      a.setDisplayName(display);
      a.setDesc(desc);
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

    performResult (result, action) {
      if (result == null) {
        return
      }
      action.useAction();
      this.refreshItemUnlocks();
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
          this.performResult(a.getResult(), a);

          this.deleteUsingActionElement(a);
          this.usingactions.splice(i, 1);
          this.refreshCharacterText();
        }
      }
    }

    refreshItemUnlocks () {
      if (this.getType() == 'unlock') {
        this.refreshActions();
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
      if (this.type == 'action') {
        const tx = this.queueText();
        $('#actionqueuetext')[0].innerHTML = tx;
      }
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
      this.recalculateTooltips();
    }

    addUseAction(action) {
      this.usingactions.push(action);
    }

    performAction (name) {
      const a = this.findActionByName(name);
      const canDo = a.checkDoAction();
      if (canDo) {
        this.performResult(a.getCost(), a);
        if (a.hasUseTime()) {
          this.addUseAction(a, this)
        } else {
          this.performResult(a.getResult(), a);
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

    getDisplayType () {
      return this.type;
    }

    getTooltipType () {
      return 'action';
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
            rsDiv.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter(), true);
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
            const rsDiv = document.createElement("li");
            rsDiv.innerHTML = result.getResultRowDisplayName(i, this.getCharacter());
            listEle.appendChild(rsDiv);
          }
        }
      } 
      return toolTipDiv
    }

    remakeTooltipCostDiv (action) {
      const cost = action.getCost();
      var tc = document.getElementById('tooltip' + this.getTooltipType() +'costlist');
      $("#tooltipactioncostlist").empty();
      let nocost = false;
      if (cost !== null) {
        const costList = cost.getValues();
        if (costList.length > 0) {
          $("#tooltipactioncost").innerHTML = 'Cost:'
          for (let i = 0; i < costList.length; i++) {
            const costRow = document.createElement("li"); 
            costRow.id = 'actioncostrow' + i;
            costRow.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter(), true);
            tc.appendChild(costRow);
          }
        } else {
          nocost = true;
        }
      } else {
        nocost = true;
      }

      let tac = document.getElementById('tooltip' + this.getTooltipType() + 'cost')
      if (nocost) {
        tac.classList.add("hidden");
      } else {
        tac.classList.remove("hidden");
      }
    }

    remakeTooltipResultDiv (action) {
      const cost = action.getResult();
      var tc = document.getElementById('tooltip' + this.getTooltipType() + 'resultlist');
      $("#tooltipactionresultlist").empty();
      let nocost = false;
      if (cost !== null) {
        const costList = cost.getValues();
        if (costList.length > 0) {
          for (let i = 0; i < costList.length; i++) {
            const costRow = document.createElement("li"); 
            costRow.id = '' + this.getTooltipType() + 'resultrow' + i;
             
            const cri = costRow.criteria
            let unlockrow = true;
            if (cri != null) {
              unlockrow = cri.metCriteriaDisplay(this.getCharacter())
            }

            if (unlockrow) {
              costRow.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter());
            } else {
              costRow.innerHTML = '???';
            }

            tc.appendChild(costRow);
          }
        } else {
          nocost = true;
        }
      } else {
        nocost = true;
      }

      let tac = document.getElementById('tooltip' + this.getTooltipType() + 'result');
      if (nocost) {
        tac.classList.add("hidden");
      } else {
        tac.classList.remove("hidden");
      }
    }

    remakeTooltipName (action) {
      const n = document.getElementById('tooltipname');
      n.innerHTML = action.getDisplayName();
      const d = document.getElementById('tooltipdesc');
      d.innerHTML = action.getDesc();
    }

    remakeTooltipCost (action) {
      this.remakeTooltipCostDiv(action);
      this.remakeTooltipResultDiv(action);
      this.remakeTooltipName(action);
    }

    updateTooltipCostDiv (action) {
      const cost = action.getCost();
      if (cost !== null) {
        const costList = cost.getValues();
        if (costList.length > 0) { 
          for (let i = 0; i < costList.length; i++) {
            const resultrow = costList[i]
            const rowDiv = document.getElementById('' + this.getTooltipType() + 'costrow' + i);
            if (rowDiv != null) {
              rowDiv.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter(), true);
              const havecost = action.checkHaveResultRow(resultrow)
              if (havecost) {
                rowDiv.classList.remove("redtext");
              } else {
                rowDiv.classList.add("redtext");
              }
            }
          }
        }
      }
    }

    updateTooltipResultDiv (action) {
      const cost = action.getResult();
      if (cost !== null) {
        const costList = cost.getValues();
        if (costList.length > 0) { 
          for (let i = 0; i < costList.length; i++) {
            const resultrow = costList[i]
            const cri = resultrow.criteria;
            let unlockrow = true;
            if (cri != null) {
              unlockrow = cri.metCriteriaDisplay(this.getCharacter())
            }

            const rowDiv = document.getElementById('' + this.getTooltipType() + 'resultrow' + i);

            if (rowDiv != null) {
              if (unlockrow) {
                rowDiv.innerHTML = cost.getResultRowDisplayName(i, this.getCharacter());
              } else {
                rowDiv.innerHTML = '???';
              }
            }
          }
        }
      }
    }

    updateTooltipCost (action) {
      this.updateTooltipCostDiv(action);
      this.updateTooltipResultDiv(action);
    }

    remakeTooltip () {
      if (this.getHoveredAction() != null) {
        const action = this.findActionByName(this.getHoveredAction())
        if (action != null) {
          this.remakeTooltipCost(action);
          this.updateTooltipCost(action);
        }
      }
    }

    recalculateTooltips () {
      this.remakeTooltip();
    }
  
    hoverdiv(e, item){
      this.getCharacter().hovertooltipdiv(e, item)
      // var left  = (e.clientX + 5)  + "px";
      // var top  = (e.clientY + 5)  + "px";       
      // var div = document.getElementById(divid);     
      // div.style.left = left;
      // div.style.top = top; 
      // if (item != null) {
      //   $("#"+divid).show();
      // } else {
      //   $("#"+divid).hide();
      // }
    }

    getDisplayName (name) {
      const i = this.findActionByName(name)
      if (i == null) {
        return ''
      }
      return i.getDisplayName();
    }

    unlockActionByName (name) {
      const sk = this.findActionByName(name);
      if (sk != null) {
        sk.doWantUnlock();
      }
    }

    actionElement (action) {
      const newDivParent = document.createElement("span");
      const nameDiv = document.createElement("div");  
      nameDiv.id = '' + this.getDisplayType() + 'ame' + action.getName();
      const buttonDiv = document.createElement("button");
      buttonDiv.innerHTML = action.getDisplayName(); 
      buttonDiv.onclick = this.createHandler(action.getName(), this);
      buttonDiv.addEventListener('mouseover', e => {
        this.setHoveredAction(action.getName());
        this.hoverdiv(e, this.getHoveredAction());
        this.recalculateTooltips();
      })

      buttonDiv.addEventListener('mouseleave', e => {
        this.setHoveredAction(null);
        this.hoverdiv(e, this.getHoveredAction());
        this.recalculateTooltips();
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
          let show = true;
          if (this.getType() == 'unlock') {
            if (action.getMaxUnlocks() <= 0) {
              show = false;
            }
          }
          if (show) {
            const newItem = this.actionElement(action);
            $('#' + this.getDisplayType() + 'display').append(newItem);
          }
        }
      } 
      this.recalculateTooltips();
    }

    refreshActions () {
      $('#' + this.getDisplayType() + 'display').empty();
      this.addActions();
    }
  }