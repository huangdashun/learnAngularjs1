(function (angular) {
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie_detail',
		'moviecat.movie_list',

		'moviecat.directives.auto_focus'

	]).config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
		}])
		/*.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
			$scope.$location = $location;
			$scope.$watch('$location.path()', function (now, old) {
				if (now.toString().indexOf('in_theaters') != -1) {
					$scope.type = 'in_theaters'
				} else if (now.toString().indexOf('coming_soon') != -1) {
					$scope.type = 'coming_soon';
				} else if (now.toString().indexOf('top250') != -1) {
					$scope.type = 'top250';
				}
			});

		}])*/
		.controller('SearchCtrl', ['$scope', '$route', function ($scope, $route) {
			$scope.input = '';
			$scope.search = function () {
				//更新路由的参数
				$route.updateParams({category: 'search', q: $scope.input, page: 1});
			}
		}]);

})(angular);
