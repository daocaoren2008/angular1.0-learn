#directive(自定义指令)
1. 指令是不依赖于控制器的
2. 指令默认不会产生作用域 ，也可以手动声明创建作用域
3. 指令的分类: 装饰型（负责添加功能的）,  组件式（替换成一个完整的组件）可以复用
4. 指令的格式
```    
var app= angular.module('appModule',[]);
       app.directive('myDrag',function () {  //ECMA命名规范多个单词以-连接(html)，js中采用驼峰命名--与html中定义的指令呼应
          return { 
              restrict:'ACEM',  //限制使用范围 
              replace:true,     //是否替换外层的原有标签，默认是false
              template:`<div>
                           <h1>HELLO angular</h1>
                           <p>你好</p>
                        </div>`
              //只要涉及到模板替换,外面就要有一个根节点
          }          
```
5. 属性解释
 - restrict：限制使用范围 每一个字母代表一种格式，得大写。。ACEM,分别代表属性，css类(class),元素,注释。默认生效的是AE
 - replace：默认是false,是否替换外层的原有标签，要求模板**必须有一个根节点**
 - template：可替换模板字符串
 - templateUrl：可替换模板文件
 - transclude：默认值false，为true表示保留标签里原有的内容，嵌入到模板中（模板接收内容的标签需添加ng-transclude指令）
 - link：连接作用域和视图的，操作dom
 ```            
link:function (scope,element,attrs) { //链接 连接作用域和视图的
    //scope代表当前指令所在作用域，指令没有创建作用域使用的是上一级,创建了的话作用域就是指令代表的标签的范围。
    //element当前指令所在的元素,angular中要求增加单位px
    element.css({'color':'red','font-size':'100px'});
    //attrs 代表的是当前指令上的所有属性
    console.log(attrs);
    //1.mousedown mousemove mouseup   //DOMMouseScroll  mousewheel
}                
 ```
 - scope：创建一个作用域。
   - 值为true时，保留在作用域链上，可以使用父作用域的属性。
   - 值是一个对象，创建一个独立作用域与$rootScope平级。（适合做组件开发）
 ```
     app.directive('panel',function () {
         return {
             restrict:'E',
             templateUrl:'tmpl/panel.html',
             transclude:true,
             scope:{ 
                 title:'@tit'//有三种接收数据的方式
             },
             /*scope:true*/
             
         }
     })
 ```
 - controller：
 - require：
 6. 创建独立scope的指令动态引用数据，通过指令的视图部分（html）属性和属性值来引用
  - @单向引用字符串，指令只能接受scope数据，指令中数据变化不影响原有数据模型变化。
    @方式引用字符串，指令html属性值写成{{表达式}}，
  ````
  <!-- html 部分 -->
<div>数据<input type="text" ng-model="title"></div>
<div>这里指令不会影响数据<panel tit="{{title}}"></panel></div>
  <!-- js脚本部分 -->
      var app = angular.module('appModule',[]);
      app.run(['$rootScope',function ($rootScope) {
          $rootScope.title = 'zfpx'
      }]);
      //@符号取得是字符串  @符是单项的
      app.directive('panel',function () {
          return {
              restrict:'E',
              template:'<input ng-model="title"/>',
              scope:{
                  //属性的值发生变化 会重新给指令赋新的值
                  title:'@tit' //scope.title = '12'
              }
          }
      })
  ````
  
  - =双向引用变量，指令接受scope中数据，指令中数据变化也会引起原有数据模型中数据变化
  ```
    <!-- html 部分 -->
  <div>数据<input type="text" ng-model="title"></div>
  <div>这里指令不会影响数据<panel tit="{{title}}"></panel></div>
    <!-- js脚本部分 -->
        var app = angular.module('appModule',[]);
        app.run(['$rootScope',function ($rootScope) {
            $rootScope.title = 'zfpx'
        }]);
        //@符号取得是字符串  @符是单项的
        app.directive('panel',function () {
            return {
                restrict:'E',
                template:'<input ng-model="title"/>',
                scope:{
                    //属性的值发生变化 会重新给指令赋新的值
                    title:'@tit' //scope.title = '12'
                }
            }
        })
  ```
  - &引用方法
