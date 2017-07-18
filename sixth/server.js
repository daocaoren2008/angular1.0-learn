var fs=require('fs');
var mime=require('mime');
var http=require('http');
var url=require('url');
//
var user=[{username:'zf',password:'123',id:1}];
http.createServer(function (req,res) {
   var urlObj=url.parse(req.url,true);
   var pathname=urlObj.pathname;
   var query=urlObj.query;
   if(pathname=='./'){
       res.setHeader('content-Type','text/html;charset=utf8');
       fs.createReadStream('./index.html').pipe(res);
   }else if(pathname=='/getUser'){
       res.end(JSON.stringify(user));
   }
//   返回一个html后 可能会再次发送请求
    else {
       fs.exists('.'+pathname,function (exists) {
           if(exists){
               res.setHeader('content-Type',mime.lookup(pathname)+';charset=utf8');
               fs.createReadStream('.'+pathname).pipe(res);
           }else {
               res.status=404;
               res.end('not found');
           }
       })
    }
}).listen(80,function () {
    console.log('hello 80');
});

