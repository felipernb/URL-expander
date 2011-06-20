var http = require('http');
var cache = {};
exports.cache = cache;
exports.expand = function(rawUrl, callback) {
	var defaultText = "Not found";
	if (!rawUrl || !rawUrl.match(/^[a-zA-Z0-9.\/?=&:-]+$/)) {
		callback("Invalid URL");
		return;
	}

	if (!rawUrl.match(/^http:\/\//)) {
		rawUrl = "http://"+rawUrl;
	}
	
	if (cache[rawUrl]) {
		callback(cache[rawUrl].longUrl);
		cache[rawUrl].hits++;
		cache[rawUrl].lastHit = new Date();
	} else {
		var url = require("url").parse(rawUrl);
		var options = {
		'host': url.hostname,
		port : 80,
		'path': url.pathname,
		};
		
		var req = http.get(options, function (res) {
			if (res.headers.location && res.headers.location != rawUrl) {
				callback(res.headers.location);
				cache[rawUrl] = {'longUrl': res.headers.location, 'lastHit': new Date(), 'hits':1};
			} else {
				callback(defaultText);
			}
		}).on('error', function(e) {
			callback(defaultText);
		});
		
		req.end();
	}
}
