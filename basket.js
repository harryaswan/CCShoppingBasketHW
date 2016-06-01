var avaliableItems = require('./items');

var basket = {
    items: [],
    discountCard: null,
    empty: function() {
        this.items = [];
    },
    quantity: function() {
        return this.items.length;
    },
    add: function(item) {
        if (item instanceof Array) {
            for (var i = 0; i < item.length; i++) {
                this.items.push(item[i]);
            }
        } else {
            this.items.push(item);
        }
    },
    remove: function(item) {
        var i = this.items.lastIndexOf(item);
        this.items.splice(i, 1);
    },
    total: function(withBOGOF) {
        var total = 0;
        if (withBOGOF) {
            total = this.checkForBOGOF();
        } else {
            for (var i =0; i < this.items.length; i++) {
                total += this.items[i].price;
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
    checkForBOGOF: function() {
        var itemsCount = [];
        var checkItems = function (item) {
            for (var i = 0; i < itemsCount.length; i++) {
                if (itemsCount[i].obj === item) {
                    return i;
                }
            }
            return -1;
        };
        for (var i = 0; i < this.items.length; i++) {
            var iCI = checkItems(this.items[i]);
            if (iCI > -1) {
                itemsCount[iCI].quantity += 1;
            } else {
                itemsCount.push({obj:this.items[i], quantity: 1});
            }
        }
        var bogofTotal = 0;
        for (i = 0; i < itemsCount.length; i++) {
            // var remainder = itemsCount[i].quantity % 2;
            if (itemsCount[i].quantity % 2 === 0) {
                bogofTotal += (itemsCount[i].obj.price * (itemsCount[i].quantity/2));
            } else {
                bogofTotal += (itemsCount[i].obj.price * ((itemsCount[i].quantity-1)/2));
                bogofTotal += (itemsCount[i].obj.price);
            }
        }
        return bogofTotal;
    }
};

module.exports = basket;
