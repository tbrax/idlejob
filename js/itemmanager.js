import { Item } from './item.js';
import { Criteria } from './criteria.js';
export class ItemManager {
  constructor(character) {
    this.items = []
    this.changedValues = false;
    
    this.character = character;
    this.initialItems();
  }

  initialItems () {
    const i0 = this.createInitialItem('cash', 'Cash', 'Makes the world go round');
    i0.setGain(100);
    i0.doUnlock();

    this.createInitialItem('soap', 'Soap', 'Slippery')

    this.createInitialItem('water', 'Water', 'wet')
    this.createInitialItem('treasure', 'Treasure', 'Better than any friends you make along the way')
    this.createInitialItem('secret', 'Secret', "It's a secret to everybody")
    this.createInitialItem('wood', 'Wood', "Yep, thats wood")
    const i1 = this.createInitialItem('joboffer', 'Job Offer', "No experience required")
    i1.setMax(1);
    this.initialItem0();
    this.initialItem1();
    this.initialItem2();
    this.initialItem3();
    this.initialItem4();
    this.initialItem5();
  }

  initialItem5 () {
    this.createInitialItem('space', 'Space', "There's nothing here...")
    this.createInitialItem('land', 'Land', 'The open range');
    this.createInitialItem('building', 'Building', 'An empty building');
  }

  initialItem4 () {
    const a = this.createInitialItem('luck', 'Luck', 'Are you feeling lucky, punk?')
    a.setCanBeNegative();
    this.createInitialItem('jobexpbonus', 'Job Exp Bonus', 'Gain more Job Exp')
    this.createInitialItem('skillexpbonus', 'Skill Exp Bonus', 'Gain more Skill Exp')
    const b = this.createInitialItem('beauty', 'Beauty', 'Quite the looker')
    b.setCanBeNegative();
  }

  initialItem3 () {
    const a = this.createInitialItem('karma', 'Karma', 'How is your fortune?')
    a.setCanBeNegative();

    const i = this.createInitialItem('legaltrouble', 'Legal Trouble', 'May be best to lay low for a bit')
    i.setMax(10);
    i.setGain(-0.005);
  }

  initialItem2 () {
    const i2 = this.createInitialItem('trash', 'Trash', "I'm the trash man")
    i2.setMax(10);
    const i3 = this.createInitialItem('paper', 'Paper', "Don't get a cut")
    i3.setMax(10);
    const i4 = this.createInitialItem('glass', 'Glass', "Comes in both solid and shard form")
    i4.setMax(10);
    const i5 = this.createInitialItem('cardboard', 'Cardboard', 'You can make a house')
    i5.setMax(10);
    const i6 = this.createInitialItem('plastic', 'Plastic', 'Easily storable in your bloodstream')
    i6.setMax(10);

  }

  initialItem1 () {
    this.createInitialItem('seeds', 'Seeds', 'What will it grow into?');
    this.createInitialItem('information', 'Information', 'Priceless');
    this.createInitialItem('gold', 'Gold', "Thems gold in 'thar hills!");
    this.createInitialItem('tools', 'Tools', "Of all kinds");
  }

  initialItem0 () {
    const i1 = this.createInitialItem('rats', 'Rat', "MICHAEL it's your birthday today!");
    i1.setMax(10);

    const cr = new Criteria();
    cr.addScaleName('rats', 'itemvalue', 0.01);
    i1.addActiveBonusCriteria("trash", "gainvalue", 0.0, cr);


    const i0 = this.createInitialItem('pigeon', 'Pigeon', "Close your mouth when you look up");
    i0.setMax(10);
    const cr0 = new Criteria();
    cr0.addScaleName('pigeon', 'itemvalue', 0.01);
    i0.addActiveBonusCriteria("information", "gainvalue", 0.0, cr);
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

  getItemMarketValue (name) {
    if (name == 'cash') {
      return 1
    }

    const item = this.findItemByName(name);
    if (item == null) {
      return 0;
    }
    const itemvalue = item.getMarketValue();
    return itemvalue;
  }

  addItemValue (name, value) {
    const item = this.findItemByName(name);
    if (item == null) {
      return;
    }
    item.gainValue(value);
  }

  getItemValue (name) {
    const item = this.findItemByName(name);
    if (item == null) {
      return 0;
    }
    const itemvalue = item.getValue();
    return itemvalue;
  }

  getCashValue () {
    const item = this.findItemByName('cash');
    if (item == null) {
      return 0;
    }
    const itemvalue = item.getValue();
    return itemvalue;
  }

  getItemSpace (name) {
    const item = this.findItemByName(name);
    if (item == null) {
      return -1;
    }
    const itemvalue = item.getSpace();
    return itemvalue;
  }

  getItemMaxValue (name) {
    const item = this.findItemByName(name);
    if (item == null) {
      return 0;
    }
    const itemvalue = item.getMax();
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
    } else if (type == "itemmaxvalue") {
      item.gainMax(result.value);
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

  remakeTooltipInfo (item) {
    const d = document.getElementById('tooltipitemgain');
    d.innerHTML = item.getDisplayGain();  
  }

  remakeTooltipCost (item) {
    this.remakeTooltipName(item);
    this.remakeTooltipInfo(item);
  }

  getHoveredType () {
    return this.getCharacter().getHoveredType()
  }

  getMarket () {
    return this.getCharacter().getMarket()
  }

  remakeTooltipMarketTextBuy (item) {
    const d = document.getElementById('tooltipitemgain');
    d.innerHTML = this.getMarket().marketTooltipTextBuy(item)
  }

  remakeTooltipMarketTextSell (item) {
    const d = document.getElementById('tooltipitemgain');
    d.innerHTML = this.getMarket().marketTooltipTextSell(item)
  }

  remakeTooltipMarketBuy (item) {
    this.remakeTooltipName(item);
    this.remakeTooltipMarketTextBuy(item)
  }

  remakeTooltipMarketSell (item) {
    this.remakeTooltipName(item);
    this.remakeTooltipMarketTextSell(item)
  }

  remakeTooltip () {
    if (this.getHoveredItem() != null) {
      if (this.getHoveredType() == 'item') {
        const item = this.findItemByName(this.getHoveredItem())
        if (item != null) {
          this.remakeTooltipCost(item);
        }
      }

      if (this.getHoveredType() == 'marketitembuy') {
        const item = this.findItemByName(this.getHoveredItem())
        if (item != null) {
          this.remakeTooltipMarketBuy(item);
        }
      }

      if (this.getHoveredType() == 'marketitemsell') {
        const item = this.findItemByName(this.getHoveredItem())
        if (item != null) {
          this.remakeTooltipMarketSell(item);
        }
      }

    }
  }

  getHoveredItem () {
    return this.getCharacter().getHoveredItem();
  }

  setHoveredItem (name) {
    this.getCharacter().setHoveredType('item');
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
    const i = new Item(name, this.getCharacter());
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