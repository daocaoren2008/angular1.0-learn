var app = angular.module('appModule', []);
app.controller("myCtrl", ["$scope", "$rootScope", function ($scope) {
    $scope.sale = '0.3';//赋值默认值 默认让下拉菜单选择第一个
    $scope.product = {};//初始化一个添加的对象
    $scope.products = [
        {productName: '电热毯', price: 99, count: 1, isSelected: true},
        {productName: '热水袋', price: 30, count: 2, isSelected: true}
    ];
    //求和
    $scope.sum = function () {
        var total = 0;
        $scope.products.forEach(function (item, index) {
            if(item.isSelected){
                total += item.price * item.count;
            }
        });
        return total;
    };
    //删除一项
    $scope.remove = function (p) {
        $scope.products = $scope.products.filter(function (item) {
            return item != p;
        })
    }
    //全选
    $scope.all = function () {
        //$scope.selectAll与input双向绑定，如果为true数组每一项都为true,如果为false每一项都为false
        $scope.products.forEach(function (item) {
            item.isSelected = $scope.selectAll;
        })
    };
    //单选
    $scope.one = function () {
        //查找没有选中的，find找到一个就返回这一项。
        var item = $scope.products.find(function (item) {
            return !item.isSelected;
        });
        //只要item有内容，就表示有一项没有选中，
        $scope.selectAll = item ? false : true;
    };
    $scope.one();//默认先查一次，函数执行要放在定义后面
    //添加
    $scope.add = function () {
        //新添加商品的名称、价格不为空则添加到数组中
        //console.log(Object.keys($scope.product))//将对象的属性转换成数组，es6方法
        if (Object.keys($scope.product).length == 2) {
            $scope.product.count = 1;
            $scope.product.isSelected = true;
            $scope.products.push($scope.product);
            $scope.product = {};
        }
    };
    //重置
    $scope.reset=function () {
        $scope.product = {};
    }
    //
    $scope.discounts=[
        {val:'0.1',content:'打一折'},
        {val:'0.3',content:'打三折'},
        {val:'0.5',content:'打五折'}
    ];
}]);
