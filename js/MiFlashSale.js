/**
 * Author: Sivasankar
 *
 * Twitter: @hisivasankar
 * Facebook: hisivasankar.d
 * instagram: @hisivasankar
 */

var FlashSaleHandler = function() {
    this._date = new Date();
    this._timer = null;
};

FlashSaleHandler.prototype.startScript = function(interval) {
    this._timer = setInterval(this.startShopping.bind(this), interval);
};
FlashSaleHandler.prototype.stopScript = function(mins, seconds) {
    var timeout;
    if (mins) {
        timeout = mins * 60 * 1000;
    } else if (seconds) {
        timeout = seconds * 1000;
    }
    if (timeout) {
        setTimeout(function() {
            clearInterval(this._timer);
        }.bind(this), timeout);
    } else {
        clearInterval(this._timer);
    }
};
FlashSaleHandler.prototype.setStartTime = function(hour, mins) {
    // Railway Time
    this._saleStarts = {
        hours: hour,
        mins: mins
    };
};
FlashSaleHandler.prototype.startShopping = function() {

    var hour = this._date.getHours();
    var mins = this._date.getMinutes();

    if (hour >= this._saleStarts.hours) {
        var selectorCollection = {
            "flashSale": ".flash-sale-list.sale-list li:nth-child(3) > a",
            "brandNewAccessories": ".news-list.sale-list li:nth-child(3) > a"
        };
        var addToChartButton = $(selectorCollection.brandNewAccessories)[0];

        var status = "Out of stock";
        if (addToChartButton && addToChartButton.text != status) {
            console.log(addToChartButton.text);
            addToChartButton.click();
            Console.log("Hey, Check your chart! I guess it's added");
            this.stopScript(null, 10);
        } else {
            var itemCaption = addToChartButton.text;
            console.log("Not able to added to chart, Item says :", itemCaption);
        }
        console.log("Sale Started!");
    } else {
        console.log("Not Stated!");
    }
};

function FlashSaleManager() {

}

FlashSaleManager.prototype.findAllSale = function() {

    var saleSelector = "a.btn-link";

    var getBadge = function() {
    	var addButton = document.createElement("a");
    	addButton.appendChild(document.createTextNode("Add Me"));
    	addButton.setAttribute("class", "addToChart");

    	addButton.style.background = "rgb(255, 255, 255)";
    	addButton.style.color = "black";
    	addButton.style.fontSize = "18px";
    	addButton.style.padding = "3px";
    	addButton.style.margin = "3px";

    	var removeButton = document.createElement("a");
    	removeButton.appendChild(document.createTextNode("Remove Me"));
    	removeButton.setAttribute("class", "removeFromCart");

    	removeButton.style.background = "rgb(255, 255, 255)";
    	removeButton.style.color = "black";
    	removeButton.style.fontSize = "18px";
    	removeButton.style.margin = "3px";
    	removeButton.style.padding = "3px";

    	var badgeContainer = document.createElement("div");
    	badgeContainer.setAttribute("class", "badgeContainer");

    	badgeContainer.appendChild(addButton);
    	badgeContainer.appendChild(removeButton);

    	badgeContainer.style.margin = "5px";

    	return badgeContainer;
    };

    $(saleSelector).each(function(item) {
    	var badge = getBadge();
        $(badge).insertAfter(this);
        console.log("Adding something");
    });

};


(function() {
    var flashSale = new FlashSaleHandler();
    flashSale.setStartTime(12, 0);
    flashSale.startScript(500);
    flashSale.stopScript(1);
    window.flashSale = flashSale;
})();
