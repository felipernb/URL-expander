
/**
 * Module dependencies.
 */

var express = require('express');
var url_expander = require('./url_expander');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/url.json', function(req, res) {
	var shortUrl = req.param('url', null);
	if (!shortUrl) {
		res.end("Error: Pass the shortened url as a GET param: http://felipernb.no.de?url=example.com");
	}
	url_expander.expand(shortUrl, function(longUrl) { res.end( JSON.stringify({'shortUrl': shortUrl, 'longUrl': longUrl})); }); 	
});

app.get('/',function(req, res) {
	res.render('index', {title: 'URL expander', shortUrl: 'bit.ly/lSgv26'});
});

app.get('/url',function(req, res) {
	var shortUrl = req.param('url', null);
	var renderLongUrl = function(longUrl) {
		res.render('show_url', {title: 'URL expander', 
								'shortUrl': shortUrl,
								'longUrl': longUrl,
								validUrl: longUrl && longUrl.match(/^[a-zA-Z0-9.\/?=&:-]+$/)});
	};
											
	url_expander.expand(shortUrl, renderLongUrl); 
});

app.get('/cache_dump', function(req, res) {
					res.end(JSON.stringify(url_expander.cache));
});


app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d", app.address().port);
