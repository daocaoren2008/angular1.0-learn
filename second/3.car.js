var app = angular.module("appModule", []);
app.controller("myCtrl", ["$scope", "$rootScope", function ($scope) {
    $scope.sale = '0.3';//赋值默认值 默认让下拉菜单选择第一个
    $scope.product = {};//初始化一个添加的对象
    $scope.products = [
        {productName: '电热毯', price: 99, count: 1,isSelected:true},
        {productName: '热水袋', price: 30, count: 2,isSelected:true}
    ];
    //删除
    $scope.remove = function (p) { //p 代表的是当前点击的是哪一条数据
        //filter返回一个新的数组
        $scope.products = $scope.products.filter(function (item, index) {
            return item != p;//相等返回false 表示要删除掉
        });
    };
    //增加
    $scope.addProduct = function () {
        //判断对象中有几个属性 Object.keys
        //console.log(Object.keys($scope.product));//将对象的属性转换成数组
        if(Object.keys($scope.product).length == 2){
            $scope.product.count = 1;
            //增加要添加的产品的数量 ，增加后扔到数组中
            $scope.products.push($scope.product);
            $scope.product = {};//清空输入框的内容
        }
    };
    //重置方法
    $scope.reset = function () {
        $scope.product = {};
    };
    //求和
    $scope.sum = function () {
        var total = 0;
        $scope.products.forEach(function (item) {
            total+= item.price*item.count;
        });
        return total;
    };
    $scope.discounts = [
        {val:'0.1',content:'打一折'},
        {val:'0.3',content:'打三折'},
        {val:'0.5',content:'打五折'}
    ];
    //全选 全不选
    //1.点击全选 如果为选中状态 则全部勾上，否则相反
    //2.点击下面的checkbox 如果有一个未选中，则全选状态为未选中,否则相反
    $scope.all = function () {
        //console.log($scope.selectAll);
        $scope.products.forEach(function (item) {
            //如果全选为true  给数组中每一项赋值为true
            item.isSelected = $scope.selectAll;
        });
    };
//        [
//            {productName: '电热毯', price: 99, count: 1,isSelected:true},
//            {productName: '热水袋', price: 30, count: 2,isSelected:false}
//        ];
    $scope.one = function () {
        //find  如果返回true表示找到了(不会继续查找)，如果一直返回false 就是没找到undefined
        var item = $scope.products.find(function (item) {
            return !item.isSelected;
        });
        //item有内容 表示有false，selectAll为false
        $scope.selectAll=item?false:true;
    };
    $scope.one();//默认先查一次，函数执行要放在定义后面
}]);
