/*var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('This is a server on nodeJS\n<a href="test.php">Test PHP</a>');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');*/


var express = require('express'),
    http = require('http'),
    app = express(),
    httpServer = http.createServer(app);
 
app.configure(function () {
    app.set('port', 1337);
    app.use(express.static(__dirname + '/'));
});
 
httpServer.listen(app.get('port'), function () {
    console.log("Express server listening on port %s.", httpServer.address().port);
});