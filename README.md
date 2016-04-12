# MI.com-FlashSale-Extension


This script can be used to shop from Mi.com incase of flash sale when things goes out of stock within a seconds

Note: 
  ```javascript
  var saleSelector = "a.btn-link";
  ```
  
  is the selector which is used for finding all items which can be shopped. Changes the selector accordingly and make sure it returns an aggregation on which jQuery.each can be executed.


## For Developers:

1. Clone the repo
2. Do npm install which will install all dependency for testing
3. ndoe app.js will serve files in port 9393
4. Open http://localhost:9393/test.html
5. You should be able to see the list of items and play around by add it to cart.
6. Click on "Add Me" button in any "Out of stock" items. It will check the item to stock continously for every 500 milli seconds and will add item to cart once it is available.
7. To check whether it works or not, open developer tools and just change the content from "Out of stock" to "Buy Now". It will be added to cart

## Users:

1. Update the css selector for the sale
2. Copy and paste the script from MiFlashSale.js to console in developer tools.
3. Now you should see "Add Me"/"Remove Me" buttons accordingly in each item which can be shopped.
