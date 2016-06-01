var avaliableItems = require('./items');

var basket = {
    items: [],
    discountCard: null,
    empty: function() {
        this.items = [];
    },
    quantity: function() {
        var qty = 0;
        for (var i = 0; i < this.items.length; i++) {
            qty += this.items[i].quantity;
        }
        return qty;
    },
    add: function(item) {
        if (item instanceof Array) {
            for (var i = 0; i < item.length; i++) {
                this.putInToList(item[i]);
            }
        } else {
            this.putInToList(item);
        }
    },
    remove: function(item) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].item === item) {
                if (this.items[i].quantity > 1) {
                    this.items[i].quantity -= 1;
                } else {
                    this.items.splice(i, 1);
                }
            }
        }
    },
    total: function(withBOGOF) {
        var total = 0;
        if (withBOGOF) {
            total = this.checkForBOGOF();
        } else {
            for (var i =0; i < this.items.length; i++) {
                total += (this.items[i].item.price * this.items[i].quantity);
            }
        }
        if (total>20) {
            var discount = 10;
            if (this.discountCard) {
                discount += 5;
            }
            total -= ((total/100)*discount);
            total = Number.parseFloat(total.toPrecision(4));
        }
        return Number.parseFloat(total.toPrecision(4));
    },
    addDiscountCard: function(cardString) {
        if (cardString.length === 7) {
            var numberChar = cardString[3];
            numberChar = Number.parseInt(numberChar);
            if (numberChar) {
                this.discountCard = cardString;
            }
        }
    },
    putInToList: function(itemObj) {
        var itemIndex = this.findItemIndex(itemObj);
        if (itemIndex > -1) {
            this.items[itemIndex].quantity += 1;
        } else {
            this.items.push({item:itemObj, quantity: 1});
        }
    },
    findItemIndex: function(item) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].item === item) {
                return i;
            }
        }
        return -1;
    },
    checkForBOGOF: function() {
        var bogofTotal = 0;
        for (i = 0; i < this.items.length; i++) {
            // var remainder = (this.items[i].quantity % 2;
            if (this.items[i].quantity % 2 === 0) {
                bogofTotal += (this.items[i].item.price * (this.items[i].quantity/2));
            } else {
                bogofTotal += (this.items[i].item.price * ((this.items[i].quantity-1)/2));
                bogofTotal += (this.items[i].item.price);
            }
        }
        return bogofTotal;
    }
};

module.exports = basket;
