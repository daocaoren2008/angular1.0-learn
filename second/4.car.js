var app = angular.module('appModule', []);
app.controller('myCtrl', ['$scope', '$rootScope', function ($scope) {
    $scope.sale = '0.3';
    $scope.products = [
        {productName: '洗衣机', price: 1800, count: 1, isSelected: true},
        {productName: '冰箱', price: 2000, count: 1, isSelected: true},
        {productName: '电视', price: 3200, count: 2, isSelected: false}
    ];
    $scope.discounts = [
        {val: '0.3', content: '三折'},
        {val: '0.5', content: '五折'},
        {val: '0.8', content: '八折'},
        {val: '0.9', content: '九折'}
    ];
    //求和
    $scope.sum = function () {
        var total = 0;
        $scope.products.forEach(function (item) {
            if (item.isSelected) {
                total += item.price * item.count;
            }
        });
        return total;
    };
    //删除
    $scope.remove = function (p) {
        $scope.products = $scope.products.filter(function (item) {
            return item != p;
        })

    };
    //全选
    $scope.all = function () {
        //$scope.selectAll与input双向绑定，如果为true数组每一项都为true,如果为false每一项都为false
        $scope.products.forEach(function (item) {
            item.isSelected = $scope.selectAll;
        })
    };
    //单选
    $scope.one = function (p) {
        //查找没有选中的，find找到一个就返回这一项。
        var item = $scope.products.find(function (item) {
            return !item.isSelected;
        });
        //只要item有内容，就表示有一项没有选中，
        $scope.selectAll = item ? false : true;
    }
    $scope.one();
    //添加
    $scope.add=function () {

    };

    //重置
    $scope.reset=function () {

    };
}]);
