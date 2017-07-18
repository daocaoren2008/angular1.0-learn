var fs = require('fs');
var mime = require('mime');
var http = require('http');
var url = require('url');
var books = [
    {bookName: '少儿图书', price: 30, count: 2, id: 1},
    {bookName: '百科全书', price: 50, count: 1, id: 2},
    {bookName: '十万个为什么', price: 40, count: 3, id: 3}
];
//
var user = [{username: 'zf', password: '123', id: 1}];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    if (pathname == '/') {
        res.setHeader('content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./cart.html').pipe(res);
    } else if (/^\/book(\/\d+)?$/.test(pathname)) {//
        var id = /^\/book(?:\/(\d+))?$/.exec(pathname)[1];
        switch (req.method) {//根据方法判断是什么操作
            case 'GET':
                if (id) {//查询一个

                } else {//查询所有
                    res.setHeader('content-Type', 'application/json;charset=utf8');
                    res.end(JSON.stringify(books));
                }
                break;
            case 'POST':
                var str = '';
                req.on('data', function (data) {
                    str += data;
                });
                req.on('end', function () {
                    var b = JSON.parse(str);
                    b.id = !books.length ? 1 : books[books.length - 1].id + 1;
                    books.push(b);
                    res.setHeader('content-Type', 'application/json;charset=utf8');
                    res.end(JSON.stringify(b));
                });
                break;
            case 'DELETE':
                if (id) {
                    books = books.filter(function (item) {
                        return item.id != id;
                    });
                    res.end(JSON.stringify({}));//删除后返回空对象，resource规定的delete格式
                } else {

                }
                break;
            case 'PUT':
                //1.获取id //2.把id那一项改成当前传过来的请求提
                if (id) {
                    var str = '';
                    req.on('data', function (data) {
                        str += data;
                    });
                    req.on('end', function () {
                        var b = JSON.parse(str);
                        books = books.map(function (item) {
                            if (item.id == id) {
                                return b;
                            } else {
                                return item;
                            }
                        });
                        res.end(JSON.stringify(b));
                    });

                }
                break;
        }
    }
//   返回一个html后 可能会再次发送请求
    else {
        fs.exists('.' + pathname, function (exists) {
            if (exists) {//判断文件是否存在，在的话返回
                res.setHeader('content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.status = 404;
                res.end('not found');
            }
        })
    }
}).listen(80, function () {
    console.log('hello 80');
});

