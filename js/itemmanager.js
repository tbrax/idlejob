import { Item } from './item.js';
export class ItemManager {
    constructor() {
      this.items = []
      this.changedValues = false;
      this.initialItems();
    }

    itemElement (item) {
      const newDivParent = document.createElement("div");
      newDivParent.classList.add("flexshow");
  
      const nameDiv = document.createElement("div");
      nameDiv.innerHTML = item.getDisplayName(); 
      nameDiv.id = 'itemname' + item.getName();
      nameDiv.classList.add("flexleft");
  
      const numDiv = document.createElement("div");
      numDiv.innerHTML = '0'; 
      numDiv.id = 'itemnumber' + item.getName();
      numDiv.classList.add("flexright");
  
      newDivParent.appendChild(nameDiv);
      newDivParent.appendChild(numDiv);
      return newDivParent;
  }
  
    addItems () {
        for (let i = 0; i < this.items.length; i++) {
            const newItem = this.itemElement(this.items[i]);
            $("#itemdisplay").append(newItem);
        } 
    }

    addItem (item) {
      this.items.push(item);
      this.refreshItems();
    }

    refreshItems () {
      $("#itemdisplay").empty();
      this.addItems();
    }

    clearItems () {

    }

    displayItems () {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        item.displayText();
      } 
    }

    tick (time) {
      this.tickGain(time);
      this.displayItems();
    }

    getItems () {
      return this.items
    }

    initialItems () {
      const i = new Item('Cash');
      i.disableUseMax();
      i.addTag('Cash');
      this.items.push(i);
    }
    
    calcTempValues () {
      
    }

    tickGain (time) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        item.tickGain(time);
      } 
    }
  }