/**
 * Created by meijuan on 2017/2/22.
 */
//删 solice =>filter（过滤）
var id = 3;
var arr = [{name: 1}, {name: 3}, {name: 2}, {name: 3}];
//返回一个新的数组，不会改变arr

var newArr = arr.filter(function (item, index) {
    //如果这个函数中返回false表示不要了，返回true表示保留
    return item.name != id;
}, arr);//同forEach 可以改变this指向。
console.log(newArr);

//改 map
var id = 3;
var arr = [{name: 1}, {name: 3}, {name: 2}, {name: 3}];
var obj = {age: 100};
//返回新数组
var newArr = arr.map(function (item, index) {
    // return什么,数组那一项就改成什么
    if (item.name == id) {
        return obj
    }
    return item;//最后把不改的项原封不动返回
});
console.log(newArr);

//查 find
//find 找到一个后，不会再往下找
var arr = [{name: 1}, {name: 3}, {name: 2}, {name: 3}];
//es6方法
var obj = arr.find(function (item, index) {
    //如果返回true表示找到了，会将当前的item那一项返回
    return item.name == 2;
});
console.log(obj);
