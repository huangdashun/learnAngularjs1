(function (angular) {
	'use strict';
	angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/:category/:page', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListCtrl'
			});
		}])
		.controller('MovieListCtrl', ['$scope',  '$route','$routeParams','HttpService', function ($scope, $route,$routeParams, HttpService) {
			var count = 2;
			//获取传入的page
			var page = parseInt($routeParams.page);
			var start = (page - 1) * count;
			$scope.subjects = [];
			$scope.message = '';
			$scope.totalCount = 0;
			$scope.loading = true;
			$scope.totalPages = 0;
			$scope.currentPage = page;
			$scope.title = 'Loading...';
			/*		var doubanMovieApi = 'http://api.douban.com/v2/movie/coming_soon?callback=JSON_CALLBACK&count=10&start=5';
			 //在Angular中使用JSONP的方式做跨域请求
			 //就必须给当前地址加上一个参数callback = JSON_CALLBACK
			 $http.jsonp(doubanMovieApi).then(function (result) {
			 console.log(result);
			 if (result.status == 200) {

			 $scope.subjects = result.data.subjects;
			 } else {
			 $scope.message = '获取数据错误 错误信息' + result.statusText;
			 }

			 }, function (err) {
			 $scope.message = '获取数据错误 错误信息' + err.statusText;
			 console.log(err);
			 });*/
			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category, {
				count: count,
				start: start,
				//$routeParmas可以取路由里面的值比如category，page，也可以取?后面的值，比如count,start,q
				q:$routeParams.q
			}, function (data) {
				//console.log(data);
				$scope.title = data.title;
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.totalPages = Math.ceil($scope.totalCount / count);
				$scope.loading = false;
				//监听数据的变化
				$scope.$apply();
			});
			//暴漏一个更改上一页下一页的行为
			$scope.goPage = function (page) {
				//一定要做一个合法范围校验
				if(page>=1&&page<=$scope.totalPages){
					//传过来第几页就跳转到第几页
					$route.updateParams({page:page});
				}

			}
		}]);

})(angular);
