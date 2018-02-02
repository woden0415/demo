var http = require('http')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring')
var util = require('util');
var config = {
  port: 8989
}

http.createServer(function(req, res) {
  var pathname = req.url
  if (pathname === '/index.html') {
    fs.readFile('./index.html','utf-8', function (err, data) {
      if (err) {
        console.error(err)
      } else {
        res.writeHead(200, {'Contet-type': 'text/html'})
        res.end(data)
      }
    })
  } else if (pathname === '/regInfo') {
    var post = ''
    req.on('data', function (chunk) {
      post += chunk
    })
    req.on('end', function () {
      post = querystring.parse(post);
      res.end(util.inspect(post));
    })
  } else {
    res.writeHead(400, { 'Contet-type': 'text/html' })
    res.end('404')
  }
}).listen(config.port)

console.log('node server is started at port: ' + config.port)
