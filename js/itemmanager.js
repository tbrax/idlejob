import { Item } from './item.js';
export class ItemManager {
  constructor() {
    this.items = []
    this.changedValues = false;
    this.initialItems();
  }

  initialItems () {
    const i0 = this.createInitialItem('cash', 'Cash', '');
    i0.doUnlock();

    this.createInitialItem('trash', 'Trash', '')

    this.createInitialItem('paper', 'Paper', '')

    this.createInitialItem('glass', 'Glass', '')

    this.createInitialItem('cardboard', 'Cardboard', '')

    this.createInitialItem('plastic', 'plastic', '')

    this.createInitialItem('soap', 'Soap', 'Slippery')

    this.createInitialItem('water', 'Water', 'wet')
  }

  createInitialItem (name, displayname, desc) {
    const i6 = this.createItem(name, displayname, desc);
    this.addItem(i6);
    return i6;
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
    } else if (type == "gainvalue") {
      item.gainGainValue(result.value);
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

  createItem (name, display, desc) {
    const i = new Item(name);
    i.setDisplayName(display);
    i.setDesc(desc);
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