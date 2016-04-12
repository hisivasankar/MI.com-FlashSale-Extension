var express = require("express");
var cors = require("cors");

var app = express();

var PORT = 9393;

app.use(function(req, res, next){
	console.log(`${req.method} -> ${req.url}`);
	next();
});
app.use(cors());
app.use(express.static("./"));

app.listen(PORT);

console.log(`Serving @ ${PORT}`);

module.exports = app;