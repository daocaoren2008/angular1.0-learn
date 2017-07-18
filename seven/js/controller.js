//建立一个controller模块 在主模块上引用
var app = angular.module('controller', []);
app.controller('homeCtrl', function ($scope, $sce) {
    $scope.html = $sce.trustAsHtml('<h1>欢迎来到我的世界！</h1>')
});
app.controller('addCtrl', function ($scope, Books, $location) {
    $scope.addBook = function () {
        var obj = {bookName: $scope.bookName, bookPrice: $scope.bookPrice, bookCover: $scope.bookCover};
        // console.log(obj);
        //保存
        Books.save(obj).$promise.then(function () {
            $location.path('/list');//保存成功后跳转到列表页
        })
    }
});
app.controller('listCtrl', function ($scope, Books) {
    //点开列表后获取数据，
    $scope.books = Books.query()
});
app.controller('detailCtrl', function ($scope, $routeParams, Books, $location) {//这里传参叫依赖注入。。
    $scope.flag = true;
//    当页面跳转后，获取id，进行查询
//    /detail/1 /detail/:id =>{id:xxx}
// angular自动截取出来的id，   $routeParams{id:xxx},route配置的是id这里就是id
    var id = $routeParams.id;
    //查询一本书为啥传的是对象，后台要的是字符串啊啊？？？？
    $scope.book = Books.get({id: id});//es6 属性名与值一样，可以省掉一个Books.get({id})
    $scope.remove = function () {
        Books.remove({id: id}).$promise.then(function () {//发送请求会默认拼上/book/
            $location.path('/list');
        })
    }
    $scope.changeFlag = function () {
        $scope.flag = !$scope.flag;
        //更改的时候不更改原来的数据，更改克隆的
        $scope.temp = JSON.parse(JSON.stringify($scope.book));
    };
    $scope.cancel = function () {
        $scope.flag = !$scope.flag;
    };
    //修改 将temp传入到服务端
    $scope.update = function () {
        Books.update({id}, $scope.temp).$promise.then(function () {
            $scope.flag = true;
            $scope.book = $scope.temp;//将最新的数据替换掉老的数据
        })
    }

});
