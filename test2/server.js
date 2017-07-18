var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;

    if(pathname=='/'){
        res.setHeader('content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else{

    }

}).listen(80, function () {
    console.log(80)
});
