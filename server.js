var express = require('express');
var app = express.createServer();

app.get('/', function(req, res){
		    res.send("Hello World by @felipernb<br/>
				Running on nodejs-" + process.version + " with express");

			});

app.listen(process.env.PORT);

