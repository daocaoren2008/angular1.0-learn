var fs = require('fs');
var mime = require('mime');
var http = require('http');
var url = require('url');
//读取json中的内容 为json格式
function readBook(callback) {
    fs.readFile('./book.json', 'utf8', function (err, data) {
        if (err || data == '') {
            data = '[]'
        }
        data = JSON.parse(data);
        callback(data)
    })
}
//将对象类型的数据 写入到json文件中
function writeBook(data, callback) {
    fs.writeFile('./list.json', JSON.stringify(data), callback)
}

http.createServer(function (req, res) {
    let urlObj = url.parse(req.url, true);
    let {pathname, query}=urlObj;//es6解构赋值
    // console.log(pathname, query);
    if (pathname == '/') {
        res.setHeader('content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }
    else if (/^\/book(\/\d+)?$/.test(pathname)) {
        var id = /^\/book(?:\/(\d+))?$/.exec(pathname)[1];

        switch (req.method) {
            case 'GET':
                if (id) {
                    readBook(function (data) {
                        var b = data.find(function (item) {
                            return item.bookId == id;
                        });
                        res.end(JSON.stringify(b));
                    })
                } else {
                    readBook(function (data) {
                        res.end(JSON.stringify(data));
                    })
                }
                break;
            case 'POST':
                var str = '';
                req.on('data', function (data) {
                    str += data;
                });
                req.on('end', function () {
                    var b = JSON.parse(str);
                    readBook(function (data) {
                        b.bookId = data.length ? data[data.length - 1].bookId + 1 : 1;
                        data.push(b);
                        writeBook(data, function () {
                            res.end(JSON.stringify(b));
                        })
                    })
                });
                break;
            case 'PUT':
                if (id) {
                    var str = '';
                    req.on('data', function (data) {
                        str += data;
                    });
                    req.on('end', function () {
                        var b = JSON.parse(str);
                        readBook(function (data) {
                            data = data.map(function (item) {
                                if (item.bookId == id) {
                                    return b
                                }
                                else {
                                 return item;
                                 }
                            });
                            writeBook(data, function () {
                                res.end(JSON.stringify(b));//resFul规范规定，返回修改成的那一项。
                            })
                        })
                    });
                }
                break;
            case 'DELETE':
                if (id) {
                    readBook(function (data) {
                        data = data.filter(function (item) {
                            return item.bookId != id;
                        });
                        writeBook(data, function () {
                            res.end(JSON.stringify({}));//删除返回空对象
                        })
                    });
                }
                break;
        }


    }
    else {
        // console.log(111);
        fs.exists('.' + pathname, function (exists) {
            // console.log(111);
            if (exists) {
                res.setHeader('content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.statusCode = 404;
                res.end();
            }
        })
    }
}).listen('8090', function () {
    console.log('8090')
});