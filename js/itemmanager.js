import { Item } from './item.js';
export class ItemManager {
  constructor() {
    this.items = []
    this.changedValues = false;
    this.initialItems();
  }

  initialItems () {
    const i0 = this.createItem('cash', 'Cash');
    i0.addTag('Cash');
    i0.doUnlock();
    this.addItem(i0);

    const i1 = this.createItem('trash', 'Trash');
    i1.addTag('Garbage');
    this.addItem(i1);

    const i2 = this.createItem('paper', 'Paper');
    this.addItem(i2);

    const i3 = this.createItem('cardboard', 'Cardboard');
    this.addItem(i3);

    const i4 = this.createItem('glass', 'Glass');
    this.addItem(i4);

    const i5 = this.createItem('plastic', 'Plastic');
    this.addItem(i5);
  }

  getItemValue (name) {
    const item = this.findItemByName(name);
    const itemvalue = item.getValue();
    return itemvalue;
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

  checkHaveResult (result) {
    if (result == null) {
      return true;
    }
    const values = result.getValues()
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      if (val.type === 'itemvalue') {
        const item = this.findItemByName(val.name)
        if (item == null) {
          continue;
        }
        if (item.getValue() < Math.abs(val.value)) {
          return false
        }
      }
    }
    return true
  }

  getDisplayName (name) {
    const i = this.findItemByName(name)
    if (i == null) {
      return ''
    }
    return i.getDisplayName();
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
        const item = this.items[i];
        if (item.isUnlocked()) {
          const newItem = this.itemElement(this.items[i]);
          $("#itemdisplay").append(newItem);
        }
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
  
  calcTempValues () {
    
  }

  checkUnlocks () {
    let madeUnlock = false;
    for (let i = 0; i < this.items.length; i++) {
      const u = this.items[i].checkUnlock();
      if (u) {
        madeUnlock = true;
      }
    } 
    if (madeUnlock) {
      this.refreshItems();
    }
  }

  tickGain (time) {
    this.checkUnlocks();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.tickGain(time);
    } 
  }
}