/**
 * 电影详情页模块
 * Created by Administrator on 2017/2/3 0003.
 */
(function (angular) {
	'use strict';
	angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/detail/:id', {
				templateUrl: 'movie_detail/view.html',
				controller: 'MovieDetailCtrl'
			});

		}])
		.controller('MovieDetailCtrl', ['$scope','$routeParams', 'HttpService',function ($scope,$routeParams,HttpService) {
			console.log($routeParams.id);
			$scope.loading = true;
			//发送网络请求获取数据
			HttpService.jsonp('http://api.douban.com//v2/movie/subject/'+$routeParams.id,{}, function (data) {
				$scope.data = data;
				$scope.loading = false;
				//console.log(data.summary);
				$scope.$apply();
			});
		}]);
})(angular);
