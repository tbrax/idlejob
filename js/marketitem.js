export class MarketItem {
    constructor(item, market) {
        this.item = item
        this.rate = 0
        this.market = market
        this.marketMult = 1
    }   

    getCharacter() {
        return this.market.getCharacter()
    }

    getItemManager() {
        return this.market.getCharacter().getItemManager()
    }

    getItemName () {
        return this.item
    }

    getMarketMult () {
        return this.marketMult
    }

    getBuyMult () {
        return 1 + this.getOverHead();
    }

    getSellMult () {
        return 1 - this.getOverHead();
    }

    getOverHead () {
        return 0.5;
    }

    getBuyInput () {
        const id = 'marketbuyinput' + this.getItemName()
        const n = document.getElementById(id);
        return n;
    }

    getSellInput () {
        const id = 'marketbuyinput' + this.getItemName()
        const n = document.getElementById(id);
        return n;
    }

    getBuyInputValue () {
        const b = this.getBuyInput()
        if (b == null || b == "") {
            return 0
        }
        if (b.value == "") {
            return 0
        }
        return b.value;
    }

    getSellInputValue () {
        const b = this.getSellInput()
        if (b == null || b == "") {
            return 0
        }
        if (b.value == "") {
            return 0
        }
        return b.value;
    }

    getItemMarketValue() {
        const b = this.getItemManager().getItemMarketValue(this.getItemName())
        if (b <= 0) {
            return 10
        }
        return b
    }

    getBuyPrice () {
        return this.getItemMarketValue() * this.getBuyMult() * this.getMarketMult()
    }

    getSellPrice () {
        return this.getItemMarketValue() * this.getSellMult() * this.getMarketMult()
    }

    getRate () {
        return this.rate
    }

    maxBuy (wantBuyV) {
        const currentCash = this.getItemManager().getCashValue();

        const wantedCash = this.getBuyPrice() * wantBuyV;

        let buy = wantBuyV;
        if (wantedCash > currentCash) {
            buy = Math.floor(currentCash / this.getBuyPrice())
        }

        const space = this.getItemManager().getItemSpace(this.getItemName());
        if (space > -1) {
            if (buy > space) {
                buy = space
            }
        }
        return buy
    }

    maxSell () {
        return this.getItemManager.getItemValue(this.getItemName());
    }

    wantBuy () {
        return Math.abs(this.getRate())
    }

    wantSell () {
        return Math.abs(this.getRate())
    }

    actualSell (wantSellV) {
        const m = this.maxSell()
        if (m < wantSellV) {
            wantSellV = m
        }
        return wantSellV
    }

    actualBuy (wantBuyV) {
        const m = this.maxBuy(wantBuyV)
        if (m < wantBuyV) {
            wantBuyV = m
        }
        return wantBuyV
    }

    addItemValue (value) {
        this.getItemManager().addItemValue(this.getItemName(), value)
    }

    addCashValue (value) {
        this.getItemManager().addItemValue('cash', value)
    }

    buyTick () {
        const b = this.actualBuy(this.wantBuy());
        this.buyNumber(b);
    }

    tryBuyNumber(num) {
        if (num == NaN) {
            num = 0
        }
        const a = this.actualBuy(num)
        if (a != 0) {
            this.buyNumber(a)
        }
    }

    buyNumber(num) {
        const cash = this.getBuyPrice() * num;
        this.addItemValue(num);
        this.addCashValue(-cash);
    }

    sellTick () {
        const s = this.actualSell(this.wantSell());
        this.sellNumber(s);
    }

    trySellNumber(num) {
        if (num == NaN) {
            num = 0
        }
        const a = this.actualSell(num)
        if (a != 0) {
            this.sellNumber(a)
        }
    }

    sellNumber(num) {
        const cash = this.getSellPrice() * num;
        this.addItemValue(-num);
        this.addCashValue(cash);
    }

    marketTick () {
        const r = this.getRate()
        if (r > 0) {
            this.buyTick()
        } else if (r < 0) {
            this.sellTick()
        }
    }
}