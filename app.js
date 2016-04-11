var express = require("express");

var app = express();

var PORT = 6000;

app.use(function(req, res, next){
	console.log(`${req.method} -> ${req.url}`);
	next();
});

app.use(express.static("./"));

app.listen(6000);

console.log(`Serving @ ${PORT}`);