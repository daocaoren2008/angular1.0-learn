//增  删  改  查
//对book.json文件做处理
//查询,如果book.json 文件不存在，应该返回空数组
var fs = require('fs');
//读取图书
/*
fs.readFile('./list.json','utf8',function (err,data) {
    if(err||data=='')
        data = '[]';
    //最后要的结果就是空数组，或者是真实的数据
    console.log(JSON.parse(data));
});
*/
//增加图书 先读，在写
var book = {"bookName":"react-native","bookCover":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3865700119,1361857079&fm=23&gp=0.jpg","bookPrice":20,"bookId":3};
function readBook(callback) {
    fs.readFile('./list.json','utf8',function (err,data) {
        if (err || data == '') {
            data = '[]'
        }
        data = JSON.parse(data);
        callback(data);
    });
}
function writeBook(data,callback) {
    fs.writeFile('./list.json',JSON.stringify(data),callback);
}
var bookId  = 3; //删除id为3的那一项
readBook(function (data) {
    data = data.filter(function (item) {
        return item.bookId != bookId
    });
    writeBook(data,function () {
        console.log('删除成功');
    })
});
/*readBook(function (data) { //读取图书
    data.push(book);
    writeBook(data,function () { //将内容写入到json中
 console.log('成功');
 })
});*/


/*fs.readFile('./list.json','utf8',function (err,data) {
    if(err||data==''){
        data = '[]'
    }
    data = JSON.parse(data);
    data.push(book);
    fs.writeFile('./list.json',JSON.stringify(data),function (err) {});
});*/
