/**
 * Author: Sivasankar
 *
 * Twitter: @hisivasankar
 * Facebook: hisivasankar.d
 * instagram: @hisivasankar
 */

var FlashSaleHandler = function(itemToBeAdded) {
    this._item = itemToBeAdded;
    this._date = new Date();
    this._timer = null;
    this._counter = 0;
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
FlashSaleHandler.prototype.startShoppingDontUseThis = function(interval) {

    this._timer = setInterval(function() {

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
                console.debug(addToChartButton.text);
                addToChartButton.click();
                Console.debug("Hey, Check your chart! I guess it's added");
                this.stopScript(null, 10);
            } else {
                var itemCaption = addToChartButton.text;
                console.debug("Not able to added to chart, Item says :", itemCaption);
            }
            console.debug("Sale Started!");
        } else {
            console.debug("Not Stated!");
        }

    }.bind(this), interval);
};

FlashSaleHandler.prototype.checkAndAdd = function(interval) {
    if (this._item) {
        this._timer = setInterval(function() {
            var status = "Out of Stock";
            var currentStatus = this._item.text;
            if (status.toLowerCase() != currentStatus.toLowerCase()) {
                this._item.click();
                console.debug("Item Added : ", this._item._dataTitle);
                this.stopScript(null, 2);
            } else {
                this._counter++;
                var reportStatus = "Checking... " + this._counter;
                this._item._dataStatusIndicator.innerHTML = reportStatus;
                console.debug(status);
            }
        }.bind(this), interval);
    } else {
        console.debug("Item reference not available");
    }
};

function FlashSaleManager() {

}

FlashSaleManager.prototype.findAllSale = function() {

    var saleSelector = "a.btn-link";

    var getBadge = function(item) {

        var shoppingItemTitle = $(item).parent().children("p").text();
        item._dataTitle = shoppingItemTitle;

        var addButton = document.createElement("a");
        addButton.appendChild(document.createTextNode("Add Me"));
        addButton.setAttribute("class", "addToCart");

        addButton._flashSaleHandler = new FlashSaleHandler(item);

        addButton.onclick = function() {
            this._flashSaleHandler.checkAndAdd(500);
        };

        addButton.style.background = "#757575";
        addButton.style.color = "white";
        addButton.style.fontSize = "18px";
        addButton.style.padding = "3px";
        addButton.style.margin = "3px";

        var removeButton = document.createElement("a");
        removeButton.appendChild(document.createTextNode("Remove Me"));
        removeButton.setAttribute("class", "removeFromCart");

        removeButton.style.background = "#757575";
        removeButton.style.color = "white";
        removeButton.style.fontSize = "18px";
        removeButton.style.margin = "3px";
        removeButton.style.padding = "3px";

        var statusIndicator = document.createElement("p");
        //statusIndicator.appendChild(document.createTextNode("Checking"));

        item._dataStatusIndicator = statusIndicator;

        var badgeContainer = document.createElement("div");
        badgeContainer.setAttribute("class", "badgeContainer");
        badgeContainer.style.marginTop = "10px";

        badgeContainer.appendChild(addButton);
        badgeContainer.appendChild(removeButton);
        badgeContainer.appendChild(statusIndicator);


        return badgeContainer;
    };

    $(saleSelector).each(function(item) {
        var badge = getBadge(this);
        $(badge).insertAfter(this);
        console.debug("Adding something");
    });

};


(function() {
    /*var flashSale = new FlashSaleHandler();
    flashSale.setStartTime(12, 0);
    flashSale.startScript(500);
    flashSale.stopScript(1);
    window.flashSale = flashSale;*/
    var flashSaleManager = new FlashSaleManager();
    flashSaleManager.findAllSale();
})();
