(function(angular){
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.in_theaters',
		'moviecat.top250',
		'moviecat.coming_soon'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

})(angular);
