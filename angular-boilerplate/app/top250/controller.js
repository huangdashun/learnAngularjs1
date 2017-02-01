(function(angular){
	'use strict';

	angular.module('moviecat.top250', ['ngRoute'])

		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/top250', {
				templateUrl: 'top250/view.html',
				controller: 'Top250Ctrl'
			});
		}])
		.controller('Top250Ctrl', ['$scope',function($scope) {

		}]);

})(angular);
