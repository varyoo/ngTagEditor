var tagEditor = angular.module('ngTagEditor', []);
tagEditor.filter('getIds', function (){
	return function (items){
		return items && items.map(function (item){
			return item.id;
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
/*tagEditor.directive('ngSpace', function(){
	return function(scope, element, attrs){
		element.bind("keydown keypress", function(event) {
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
		element.bind("keydown keypress", function(event) {
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
		element.bind("keydown keypress", function(event) {
			if(event.which === 8) {
				scope.$apply(function (){
					scope.$eval(attrs.ngDelete);
				});
				event.preventDefault();
			}
		});
	};
});*/
tagEditor.directive('tagEditor', function(){
	return{
		restrict: 'E',
		scope: {},
		replace: true,
		templateUrl: 'ngTagEditor.tpl',
		controller: function($scope, $attrs, $element, $http){
			$scope.added = [];
			$scope.search = '';
			$scope.fetch = function(){
				$http.get('tags.php??q=' + $scope.search).success(function(data){
					$scope.suggestions = data.data;
				});
			}
			$scope.add = function(id, name){
				$scope.added.push({'id':id, 'name':name});
				$scope.search = '';
			}
			$scope.remove = function(index){
				$scope.added.splice(index, 1);
			}
			/*$scope.delete = function(){
				//alert($scope.search);
				if($scope.added == ''){
					$scope.added.pop();
				}
			}*/
		}
	}
});