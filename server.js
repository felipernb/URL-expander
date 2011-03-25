var express = require('express');
var app = express.createServer();

app.get('/', function(req, res){
		    res.send('Hello World by @felipernb\n');
			res.send("Running on nodejs-" + process.version + " and express");

			});

app.listen(process.env.PORT);

