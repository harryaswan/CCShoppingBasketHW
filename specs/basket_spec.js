var assert = require('chai').assert;
var basket = require('../basket');
var items = require('../items');

describe('Shopping Basket', function(){
    beforeEach(function() {
        basket.empty();
    });
    it('Basket should be empty at start', function(){
        assert.equal(0, basket.quantity());
    });
    it('Add an item to the basket', function(){
        basket.add(items[0]);
        assert.equal(1, basket.quantity());
        basket.add([items[0], items[1]]);
        assert.equal(3, basket.quantity());
    });
    it('Remove an item to the basket', function(){
        basket.add([items[0], items[0], items[1]]);
        basket.remove(items[0]);
        assert.equal(2, basket.quantity());
    });
    it('Get the total value of the basket', function(){
        basket.add([items[0],items[1],items[2]]);
        assert.equal(3.69, basket.total(false));
    });

    it('If basket total > 20 10% discount applied', function(){
        basket.add([items[0],items[1],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2]]);
        // total = 21.69
        assert.equal(19.52, basket.total(false));
    });
    it('Add a discount card and get total of basket', function(){
        basket.add([items[0],items[1],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2],items[2]]);
        // total = 21.69
        basket.addDiscountCard("aaa5bbb");
        assert.equal(18.44, basket.total(false));
    });
    it('BOGOG deal', function(){
        basket.add([items[0],items[1],items[1],items[2],items[2],items[1]]);
        // total = 21.69
        assert.equal(4.68, basket.total(true));
    });

});
