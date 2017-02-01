(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var myApp = angular.module('myApp', ['ngRoute']);
	//路由
	myApp.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.
				when('/:status?',{
				controller:'MainController',
				templateUrl:'temp'
			})
				.otherwise({
					redirectTo:'/'
				});
	}]);
	myApp.controller('MainController', ['$scope', '$location','$routeParams','$route' ,function ($scope, $location,$routeParams,$route) {
		//文本框需要一个模型
		$scope.text = '';
		//任务列表也需要一个
		//每一个任务的结构｛id :1, text:'学习',completed:true｝
		$scope.todos = [
			{id: 1, text: '学习', completed: true},
			{id: 2, text: '上网', completed: true},
			{id: 3, text: '吃饭', completed: false}];
		//添加todo
		$scope.add = function () {
			if (!$scope.text) {
				return;
			}
			$scope.todos.push({id: Math.random(), text: $scope.text, completed: false});
			$scope.text = '';
		};
		//删除todo
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};
		//清空已经完成的
		//思路：如果任务没完成，将任务push到一个新的数组中
		$scope.clear = function () {
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					result.push($scope.todos[i])
				}
			}
			$scope.todos = result;
		}
		//通过查询是否存在已经有完成的任务来控制清空按钮的显示
		$scope.existComplete = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};
		//进入编辑状态的id
		$scope.currentEditId = -1;
		$scope.editingMode = function (item) {
			if (!item.completed) {
				$scope.currentEditId = item.id;
			}

		};
		$scope.exitEditingMode = function (id) {
			$scope.currentEditId = -1;
		};
		$scope.flag = false;
		$scope.toggle = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = $scope.flag;
			}

		};
		//状态筛选(根据completed的值)
		$scope.selector = {};
		//$scope.selector = {completed:true};
		/*$scope.$location = $location;
		$scope.$watch('$location.path()', function (now, old) {
			console.log($location.path());
			switch (now) {
				case '/active':
					$scope.selector = {completed: false};
					break;
				case '/completed':
					$scope.selector = {completed: true};
					break;
				default:
					$scope.selector = {};
					break;

			}
			//console.log($scope.$location.hash());
		});*/
		switch ($routeParams.status) {

			case 'active':
				$scope.selector = {completed: false};
				break;
			case 'completed':
				$scope.selector = {completed: true};
				break;
			default:
				$route.updateParams({status:''});
				$scope.selector = {};
				break;

		}
		//自定义比较函数,默认filter过滤器使用的是模糊匹配
		$scope.equalCompare = function (source, target) {
			//console.log(source);
			//console.log(target);
			return source === target;
		}

	}]);

})(angular);
