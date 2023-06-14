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

  findItemByName (name) {
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].getName() == name) {
          return this.items[i]
        }
    } 
    return null
  } 

  itemAction (result) {
    const item = this.findItemByName(result.name);
    const type = result.type;
    if (item == null) {
      return
    }
    if (type == "itemvalue") {
      item.gainValue(result.value);
    }
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

  displayText () {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.displayText();
    } 
  }

  tick (time) {
    this.tickGain(time);
    this.displayText();
  }

  getItems () {
    return this.items
  }
  
  addItem (item) {
    this.items.push(item);
  }

  createItem (name, display) {
    const i = new Item(name);
    i.setDisplayName(display);
    return i;
  }

  initialItems () {
    const i0 = this.createItem('cash', 'Cash');
    i0.addTag('Cash');
    this.addItem(i0);

    const i1 = this.createItem('trash', 'Trash');
    i1.addTag('Garbage');
    this.addItem(i1);

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