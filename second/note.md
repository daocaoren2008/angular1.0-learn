## 过滤器
> 过滤器用 | 隔开, 传递参数用:

### 内置过滤器
**1.** 大小写过滤器
  - uppercase 
  - lowercase
  
  ```
  {{'aaaa' | uppercase}}
  {{'AAAA' | lowercase}}
  ```
**2.** date(日期过滤器，参数是日期格式，月份用大写M表示，区别与分钟小写m)
```
{{123123123123 | date:'yyyy-MM-dd hh:mm:ss'}}
```
**3.** limitTo(字符截取过滤器，限制位数，参数表示字符截取的长度)
```
{{'你好么哈哈我很好 谢谢！' | limitTo:4}}
```
**4.** number(数字过滤器),后面的参数1表示保留的小数位
```
{{1000000000.128312381 | number:1}}
```
**5.** currency(货币过滤器，参数表示货币符号)
```
{{100 | currency:'￥'}} 

```
**6.** json(json过滤器，把数据按照json格式展现，参数表示格式化后的空格数)
```
<pre>{{ {name:1,age:8,address:'hello'} | json:4 }}</pre>
```
**7.** orderBy (排序过滤器，)
```
<!--最后一个参数（是否倒序）-->
<div ng-repeat="arr in arrs | orderBy:'name':true/false track by $index"></div>
```
**8.** filter
```
<!--filter后面可以跟一个对象 指定在哪个字段中查询-->
<div ng-repeat="arr in arrs | filter:{name:1} track by $index"></div>
```
###多过滤器连用
- 过滤器的使用 多个过滤器用 | 隔开, 传递参数用:
```
{{"100000000" | limitTo:3 | currency:'$'}}
```

### 自定义过滤器
- 它是独立的功能和控制器无关
```
var app = angular.module('appModule',[]);
app.filter('竖线后面的名字',function($sce){ //服务
    return function(过滤的数据,冒号后的参数){//参数有多个以冒号传入
        return '显示的结果'
    }
})
```
```
<td ng-bind-html="score.math |changeColor:query | asHtml" ></td>
<!--页面上的ng-bind-html,配合过滤器把数据按照html的方式插入到视图当中-->
    app.filter('asHtml',function ($sce) { //服务
       return function (data) {
           return $sce.trustAsHtml(data.toString());//数字不能使用trustAsHtml(内置的方法，用来把字符串转换成html标签)
       } 
    });
```
###css类和行内样式
- ng-style 可以接受对象形式的数据作为行内样式。
```
<!--相当于style='color:red'-->
<div ng-style="{color:'blue'}">react MM</div>
```
- ng-class 可以接受对象形式的数据最为class类，添加到元素上
```
<!--div会被添加color1和color2两个class类，而且不会覆盖原来的静态类color,>
<div class="color" ng-class="{color1:flag,color2:flag}">angular baby</div>
<script>
    var app = angular.module('appModule',[]);
    app.controller('myCtrl',function ($scope) {
        $scope.flag = true; //flag为true增加样式 否则移除样式
        $scope.a = {background:'red',fontSize:'100px'}
    });
</script>

```