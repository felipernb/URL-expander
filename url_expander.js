var http = require('http');
var cache = {};
var cache_size = 0;
exports.expand = function(rawUrl, func) {
	var defaultText = "Not found";
	if (!rawUrl || !rawUrl.match(/^[a-zA-Z0-9.\/?=&:-]+$/)) {
		func("Invalid URL");
		return;
	}

	if (!rawUrl.match(/^http:\/\//)) {
		rawUrl = "http://"+rawUrl;
	}
	
	if (cache[rawUrl]) {
		func(cache[rawUrl]);
		return;
	}
	var url = require("url").parse(rawUrl);
	var options = {
	'host': url.hostname,
   	port : 80,
	'path': url.pathname,
	};
	
	var req = http.get(options, function (res) {
		if (res.headers.location) {
			func(res.headers.location);
			if (cache_size >= 10000) {
				cache = {};
				cache_size = 0;
			}
			cache[rawUrl] = res.headers.location;
			cache_size++;
		} else {
			func(defaultText);
		}
	}).on('error', function(e) {
		func(defaultText);
	});

	req.end();
}
