
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

/*app.get('/', function(req, res){
  res.render('index', {
    title: 'epicprogramming'
  });
});
*/

app.get('/url.json', function(req, res) {
	var shortUrl = req.param('url', null);
	url_expander.expand(shortUrl, function(longUrl) { res.end( JSON.stringify({'shortUrl': shortUrl, 'longUrl': longUrl})); }); 	
});

app.get('/',function(req, res) {
	res.render('url', {title: 'URL expander'});
});

app.post('/url',function(req, res) {

	url_expander.expand(req.body.shortUrl, function(longUrl) {
												res.render('show_url', 
																{title: 'URL expander', 
																shortUrl: req.body.shortUrl,
																'longUrl': longUrl});
											}); 
});


app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d", app.address().port);
