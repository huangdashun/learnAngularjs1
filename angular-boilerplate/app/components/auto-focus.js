/**
 * Created by Administrator on 2017/2/2 0002.
 */
(function (angular) {
	angular.module('moviecat.directives.auto_focus', [])
		.directive('autoFocus', ['$location', function ($location) {
			//var path = $location.path();//  /coming_soon/1
			return {
				restrict: 'A',
				link: function ($scope, iElm, iAttrs, controller) {
					$scope.$location = $location;
					//监听$location.path()的变化
					$scope.$watch('$location.path()', function (now) {
						//获取含有autoFocus指令的a标签的href对应的值
						var aLink = iElm.children().attr('href');
						//+一次或多次  ?零次或一次  *任意次 .表示除\n之外的任意字符 在+ ？ *后面加一个？表示懒惰模式
						var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
						if (now.startsWith(type)) {
							//先清除所有的active类
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						}
					});


					/*	//点击实现左侧的自动焦点
					 iElm.on('click', function () {
					 //先清除所有的active类
					 iElm.parent().children().removeClass('active');
					 iElm.addClass('active');
					 });*/
				}
			}
		}]);
})(angular);
