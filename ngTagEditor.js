var tagEditor = angular.module('ngTagEditor', []);
/*tagEditor.filter('getIds', function (){
	return function (items){
		return items && items.map(function (item){
			return item.id;
		}).join(',');
	}
});*/
tagEditor.filter('getRow', function(){
	return function (items, row){
		return items && items.map(function (item){
				return item[row];
		}).join(',');
	}
});
tagEditor.directive('focusMe', function($timeout, $parse){
	return{
		link: function(scope, element, attrs){
			var model = $parse(attrs.focusMe);
			scope.$watch(model, function(value){
				if(value === true){ 
					$timeout(function(){
						element[0].focus(); 
					});
				}
			});
			element.bind('blur', function(){
				scope.$apply(model.assign(scope, false));
			});
		}
	};
});
tagEditor.directive('ngSpace', function(){
	return function(scope, element, attrs){
		element.bind("keydown", function(event) {
			if(event.which === 32) {
				scope.$apply(function (){
					scope.$eval(attrs.ngSpace);
				});
				event.preventDefault();
			}
		});
	};
});
tagEditor.directive('ngEnter', function(){
	return function(scope, element, attrs){
		element.bind("keydown", function(event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});
tagEditor.directive('ngDelete', function(){
	return function(scope, element, attrs){
		element.bind("keydown", function(event) {
			if(event.which === 8) {
				scope.$apply(function (){
					scope.$eval(attrs.ngDelete);
				});
				event.preventDefault();
			}
		});
	};
});
tagEditor.directive('tagEditor', function(){
	return{
		restrict: 'E',
		/*require: 'ngModel',*/
		scope: {
			link: '=ngModel',
			stored: '=ngStored'
		},
		replace: true,
		templateUrl: 'ngTagEditor.html',
		controller: function($scope, $attrs, $element, $http, $filter){
			$scope.options = [];
			$scope.options.output = $attrs.output || 'name';
			$scope.options.fetch = $attrs.fetch || 'api/tags?q=';
			$scope.added = $scope.link || [];
			$scope.stored = $scope.stored || [];
			$scope.search = '';
			
			$scope.fetch = function(){
				$http.get($scope.options.fetch + $scope.search).success(function(data){
					$scope.suggestions = data.data;
					console.log(data);
				});
			}
			$scope.add = function(id, name){
				$scope.added.push({'id':id, 'name':name});
				$scope.search = '';
			}
			$scope.remove = function(index){
				$scope.added.splice(index, 1);
			}
			$scope.delete = function(){
				if($scope.search == ''){
					$scope.added.pop();
				}
			}
		}
	}
});
