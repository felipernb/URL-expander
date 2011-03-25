var http = require('http');
  
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write("Hello world by @felipernb\n");
  res.end("Running on nodejs-" +process.version);
});
  
server.listen(process.env.PORT || 8001);

