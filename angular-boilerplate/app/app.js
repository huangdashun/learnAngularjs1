(function(angular){
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie.list'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

})(angular);
