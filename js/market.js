import { MarketItem } from "./marketitem.js";
export class Market {
    constructor(character) {
        this.character = character;
        this.items = [];
        this.marketTime = 0;
        this.makeMarketItems()
        this.refreshItems()
    }

    getCharacter () {
        return this.character
    }

    getItemManager () {
        return this.character.getItemManager()
    }

    marketTick () {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            item.marketTick();
        }
    }

    checkMarket (time) {
        this.marketTime += time
        if (this.marketTime > 60) {
            this.marketTime -= 60
        }
        this.marketTick()
    } 


    validMarketItems () {
        const allItems = this.getItemManager().getItems()
        return allItems
    }

    makeMarketItem (name) {
        const i = new MarketItem(name, this)
        this.items.push(i)
    }

    makeMarketItems () {
        const items = this.validMarketItems()
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            this.makeMarketItem(item.getName())
        }
    }

    itemElement (item) {
        const newDivParent = document.createElement("div");
        newDivParent.classList.add("marketitemgrid");

        const div0 = document.createElement("div");
        div0.classList.add("marketitemgrid0");
        div0.innerHTML = item.getDisplayName() + ""
        newDivParent.appendChild(div0);

        const div1 = document.createElement("div");
        div1.innerHTML = "$" + item.getMarketValue()
        div1.classList.add("marketitemgrid1");
        newDivParent.appendChild(div1);

        // const buttonDiv0 = document.createElement("button");
        // buttonDiv0.innerHTML = "-1"
        // div1.appendChild(buttonDiv0);

        // const div2 = document.createElement("span");
        // div2.innerHTML = this.findRateByName(item.getName())
        // div1.appendChild(div2);

        // const buttonDiv1 = document.createElement("button");
        // buttonDiv1.innerHTML = "1"
        // div1.appendChild(buttonDiv1);

        const input0 = document.createElement("input");
        input0.id = 'marketbuyinput' + item.getName()
        input0.type = 'number'
        input0.min = "0"
        input0.classList.add("marketitemgrid2");
        newDivParent.appendChild(input0);

        // input0.addEventListener('change', e => {
        //     this.changeMarketValue(item, input0);
        // })

        const buttonDiv2 = document.createElement("button");
        buttonDiv2.innerHTML = "Buy"
        buttonDiv2.classList.add("marketitemgrid3");
        buttonDiv2.classList.add("markettooltip");
        newDivParent.appendChild(buttonDiv2);
        buttonDiv2.onclick = this.createHandler(item.getName(), this);

        // const buttonTooltip = document.createElement("div");
        // buttonTooltip.classList.add("markettooltiptext");
        // buttonTooltip.id = "markettooltiptextbuy" + item.getName()
        // buttonDiv2.appendChild(buttonTooltip);
        // buttonTooltip.innerHTML = this.marketTooltipTextBuy(item, 0);

        buttonDiv2.addEventListener('mouseover', e => {
            this.setHoveredItem(item.getName(), 'buy');
            this.hoverdiv(e, this.getHoveredItem(), buttonDiv2)
        })

        buttonDiv2.addEventListener('mouseleave', e => {
            this.setHoveredItem(null);
            this.hoverdiv(e, this.getHoveredItem())
          })

        const buttonDiv3 = document.createElement("button");
        buttonDiv3.innerHTML = "Sell"
        buttonDiv3.classList.add("marketitemgrid4");
        buttonDiv3.classList.add("markettooltip");
        newDivParent.appendChild(buttonDiv3);

        buttonDiv3.addEventListener('mouseover', e => {
            this.setHoveredItem(item.getName(), 'sell');
            this.hoverdiv(e, this.getHoveredItem(), buttonDiv3)
        })

        buttonDiv3.addEventListener('mouseleave', e => {
            this.setHoveredItem(null);
            this.hoverdiv(e, this.getHoveredItem())
          })

        // const buttonTooltip1 = document.createElement("div");
        // buttonTooltip1.classList.add("markettooltiptext");
        // buttonTooltip1.id = "markettooltiptextsell" + item.getName()
        // buttonDiv3.appendChild(buttonTooltip1);
        // buttonTooltip1.innerHTML = this.marketTooltipTextSell(item, 0);

        return newDivParent
    }

    getHoveredItem () {
        return this.getCharacter().getHoveredItem();
      }

    marketTooltipTextBuy (item) {
        const marketItem = this.findItemByName(item.getName())
        const value = marketItem.getBuyInputValue();
        if (marketItem == null) {
            return ""
        }
        if (value == 0) {
            return ""
        }
        const onePrice = marketItem.getBuyPrice();
        const totalPrice = onePrice * value;
        return `Buy ${value} ${item.getDisplayName()} for $${totalPrice}`
    }

    marketTooltipTextSell (item) {
        const marketItem = this.findItemByName(item.getName());
        const value = marketItem.getSellInputValue();
        if (marketItem == null) {
            return ""
        }
        if (value == 0) {
            return ""
        }
        const onePrice = marketItem.getSellPrice();
        const totalPrice = onePrice * value;
        return `Sell ${value} ${item.getDisplayName()} for $${totalPrice}`
    }

    changeMarketValue (item, element) {
        let value = element.value
        if (value == null || value == "") {
            value = 0
        }
        const id = "markettooltiptextbuy" + item.getName()
        const n = document.getElementById(id);
        if (n != null) {
            n.innerHTML = this.marketTooltipTextBuy(item, value)
        }

        const id1 = "markettooltiptextsell" + item.getName()
        const n1 = document.getElementById(id1);
        if (n1 != null) {
            n1.innerHTML = this.marketTooltipTextSell(item, value)
        }
    }

    setHoveredItem (name, doType = "") {
        if (doType == "buy") {
            this.getCharacter().setHoveredType('marketitembuy');
        } else if (doType == "sell") {
            this.getCharacter().setHoveredType('marketitemsell');
        } else {
            this.getCharacter().setHoveredType('marketitem');
        }
        this.getCharacter().setHoveredItem(name);
    }

    getHoveredItem () {
        return this.getCharacter().getHoveredItem();
    }

    hoverdiv(e, item, element){
        this.getCharacter().hovertooltipdiv(e, item, element)
    }

    remakeTooltipName (item) {
        const n = document.getElementById('tooltipname');
        n.innerHTML = item.getDisplayName();
        const d = document.getElementById('tooltipdesc');
        d.innerHTML = item.getDesc();
      }

    itemAmountInput (name) {
        const id = 'marketbuyinput' + name
        const el = document.getElementById(id);
        const input = el.value
        return parseInt(input)
    }

    buyItem (name) {
        let amt = this.itemAmountInput(name)
        let mkItem = this.findItemByName(name)
        if (mkItem == null) {
            this.makeMarketItem(name)
            mkItem = this.findItemByName(name)
        }

        if (mkItem == null) {
            return
        }

        if (amt == undefined) {
            amt = 0
        }
        mkItem.tryBuyNumber(amt)
        
        // const totalPrice = mkItem.getBuyPrice() * amt
    }

    createHandler (name, thisclass) {
        return function () {
          thisclass.buyItem(name);
        };
      }

    findItemByName (name) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].getItemName() == name) {
                return this.items[i]
            }
        } 
        return null
    } 

    findRateByName (name) {
        const i = this.findItemByName(name)
        if (i == null) {
            return 0
        }
        return i.getRate()
    } 

    addItems () {
        const validItems = this.validMarketItems()
        for (let i = 0; i < validItems.length; i++) {
            const item = validItems[i];
            const newItem = this.itemElement(item);
            $("#marketdisplayitems").append(newItem);
        } 
    }

    refreshItems () {
        $("#marketdisplayitems").empty();
        this.addItems();
    }

    setupMarket () {
        this.refreshItems()
    }

    tick (time) {
        this.checkMarket(time)
    }
}