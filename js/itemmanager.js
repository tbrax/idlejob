import { Item } from './item.js';
export class ItemManager {
  constructor(character) {
    this.items = []
    this.changedValues = false;
    this.initialItems();
    this.character = character;
  }

  initialItems () {
    const i0 = this.createInitialItem('cash', 'Cash', 'Makes the world go round');
    i0.doUnlock();

    this.createInitialItem('trash', 'Trash', "I'm the trash man")

    this.createInitialItem('paper', 'Paper', "Don't get a cut")

    this.createInitialItem('glass', 'Glass', "Comes in both solid and shard form")

    this.createInitialItem('cardboard', 'Cardboard', 'You can make a house')

    this.createInitialItem('plastic', 'Plastic', 'Stored in your bloodstream')

    this.createInitialItem('soap', 'Soap', 'Slippery')

    this.createInitialItem('water', 'Water', 'wet')
    this.createInitialItem('treasure', 'Treasure', 'Better than any friends you make along the way')
    this.createInitialItem('secret', 'Secret', "It's a secret to everybody")
    this.createInitialItem('wood', 'Wood', "Yep, thats wood")
    const i1 = this.createInitialItem('joboffer', 'Job Offer', "No experience required")
    i1.setMax(1)
  }

  createInitialItem (name, displayname, desc) {
    const i6 = this.createItem(name, displayname, desc);
    this.addItem(i6);
    return i6;
  }

  getCharacter () {
    return this.character;
  }

  hoverdiv(e, item){
    this.getCharacter().hovertooltipdiv(e, item)
  }

  getItemValue (name) {
    const item = this.findItemByName(name);
    const itemvalue = item.getValue();
    return itemvalue;
  }

  itemElement (item) {
    const newDivParent = document.createElement("div");
    newDivParent.classList.add("flexshow");

    newDivParent.addEventListener('mouseover', e => {
      this.setHoveredItem(item.getName());
      this.hoverdiv(e, this.getHoveredItem())
    })

    newDivParent.addEventListener('mouseleave', e => {
      this.setHoveredItem(null);
      this.hoverdiv(e, this.getHoveredItem())
    })

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

  checkHaveResultRow (val) {
    if (val.type === 'itemvalue') {
      const item = this.findItemByName(val.name)
      if (item == null) {
        return true;
      }
      if (item.getValue() < Math.abs(val.value)) {
        return false
      }
    }
    return true;
  }

  checkHaveResult (result) {
    if (result == null) {
      return true;
    }
    const values = result.getValues()
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const r = this.checkHaveResultRow(val);
      if (r == false) {
        return false;
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

  remakeTooltipName (item) {
    const n = document.getElementById('tooltipname');
    n.innerHTML = item.getDisplayName();
    const d = document.getElementById('tooltipdesc');
    d.innerHTML = item.getDesc();
  }

  remakeTooltipCost (item) {
    this.remakeTooltipName(item);
  }

  remakeTooltip () {
    if (this.getHoveredItem() != null) {
      const item = this.findItemByName(this.getHoveredItem())
      if (item != null) {
        this.remakeTooltipCost(item);
      }
    }
  }

  getHoveredItem () {
    return this.getCharacter().getHoveredItem();
  }

  setHoveredItem (name) {
    this.getCharacter().setHoveredItem(name);
  }

  recalculateTooltips () {
    this.remakeTooltip();
  }

  tick (time) {
    this.tickGain(time);
    this.displayText();
    this.recalculateTooltips();
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