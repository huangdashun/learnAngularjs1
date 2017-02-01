/**
 * Created by Administrator on 2017/2/1 0001.
 */
'use strict';

(function (angular) {
	// 由于默认angular提供的异步请求对象不支持自定义回调函数名
	// angular随机分配的回调名称不被豆瓣支持
	var http = angular.module('moviecat.services.http', []);
	http.service('HttpService', ['$document','$window', function ($document,$window) {
		//url :http://api.douban.com/in_theaters  --><script>--html</script>;
		this.jsonp = function (url, data, callback) {
			//1.挂载回调函数
			//函数名my_json_cb_011942038362870733
			var cbFuncName = 'my_json_cb_'+Math.random().toString().replace('.', '');
			//$window.my_json_cb_011942038362870733 = callback;
			$window[cbFuncName] = callback;
			console.log(callback);
			//2.将data转换为url字符串的形式  {count:6,start:7}-->?count=6&start=7;
			var querystring = '?';
			for (var key  in data) {
				querystring += key + '=' + data[key] + '&';
			}
			//queryString = ?count=6&start=7&
			//3.处理url中的回调参数
			querystring += 'callback=' + cbFuncName;
			//queryString =?count=6&start=7&cb=my)json_cb随机数
			//4.创建一个script标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			//注意此时还不能将其append到页面上

			//5.将script标签放到页面中
			$document[0].body.appendChild(scriptElement);
		}
	}]);
})(angular);
