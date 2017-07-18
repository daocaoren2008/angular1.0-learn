1、angular，因为比较大的缘故，最好放到html文档的末尾，然后在引入angualr以后再编写与angualr有关的代码，否则代码可能会不起作用。


## ng-app

- 告诉angular启动项目
- 添加根作用域$rootScope
> 一般ng-app放到html标签上，用来定义angular应用程序，当网页加载完毕，AngularJS 自动开启。而且放到html元素上，也可以操作head标签里的内容。

> - 指令 ng-开头的都叫angular的内置指令
> - 增加ng-app属性后 会增加一个 根作用域$rootScope
```
var app = angular.module('zfModule', []);
``` 
> var app = angular.module('zfModule', []);用来声明一个angular模块。
> - 第一个参数是和html中ng-app的值相对应的。
> - 模块除了可以加载其他依赖模块，亦可以创建配置、控制器、服务、指令、测试之类的


## ng-model

- 实现双向数据绑定的(表单元素，html5元素的contenteditable不起作用，必须是表单元素)

```

<input type="text" ng-model="name"/>

```

1.先去当前作用域上找name，如果有会将name变量的值赋予给输入框

2.如果没有，当我们在输入框中输入内容，会在当前作用域下声明这个name变量

3.修改输入框中的内容 会导致数据的更新


> ng-model只能放置变量名


## ng-bind简写{{}}

- 将作用域上的数据展示到页面上（展示）

- 数据的变化可以影响视图，视图(表单元素)不能影响数据

- 支持赋值，运算，三元表达式


## ng-cloak

防止闪烁,先让所有带有ng-cloak的属性隐藏掉。当angular加载后，会自动移除掉ng-cloak属性,替换为class='ng-binding'。

```

[ng-cloak]{display:none}

```



## 创建独立作用域

模块化开发，单例，闭包-> cmd(seajs) amd(requirejs)


## 创建模块

```

ng-app="appModule"

var app = angular.module('appModule',[]);

```
- 创建模块 一切从模块开始
- 如果没有其他模块 默认第二个参数是空数组，不能不能不写，不写表示获取
- param1(参数1) 代表控制器的名字 param2（参数2） 代表的是控制器的函数
- 买一送一 ,会赠送一个作用域$scope
- 控制器默认是不会执行的
- 声明根作用域(全局)属性在run方法中声明
```
    app.run(function ($rootScope) {
        $rootScope.aa = 100;

    });
```

## 创建控制器

- $scope就是我们的viewModel

```

<div ng-controller="myCtrl"></div>//这句是写在html里的标识

app.controller('myCtrl',function($scope){});//与html对应

```


## 控制器特点

- 控制器可以嵌套，子能继承父，父不能继承子。控制器管理范围和所在标签范围相同

- 不能操作DOM(不建议操作)
```
<div ng-controller="firstCtrl">{{son}}
    <div ng-controller="secondCtrl">{{son}}</div>
</div>
```


## run方法

- 声明全局属性

```

app.run(function($rootScope){})

```


## ng-repeat(最最常用的指令)

- arr

- obj


```

<ul>
    <li ng-repeat="(key,b) in arys track by key">
     {{b.fruit}}
    </li>
<ul>

```
- 要循环谁就将 ng-repeat写在谁的身上
- 可以将in前面的(key,value) in arrs 如果遍历的是数组 我们就是用track by $index遍历
-
```
//可以采用数组的形式 防止形参压缩后报错
 /*app.run(['$rootScope',function ($rootScope) {}]);*/
     app.controller("myCtrl",["$scope","$rootScope",function($scope){
         //$scope.html = '<h1>Hello</h1>'
         $scope.arrs=[{fruit:'苹果'},{fruit:'香蕉'},{fruit:'橘子'},{fruit:'橘子'}];
         $scope.iphones = [
             {product:'Nokia',type:['5230','n97','n98']},
             {product:'小米',type:['note1','note2']},
             {product:'苹果',type:['iphone3gs','iphone4','iphone5']}
         ];
     }])
 ```
## bootstrap
- bootstrap中关于颜色的规则
> -    success 绿色
> -    danger  红色
> -    warning 警告
> -    default 灰色
> -    primary 蓝色
> -    info    浅蓝