(function (angular) {
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie.list'
	]).config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
		}])
		.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
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

		}]);

})(angular);
