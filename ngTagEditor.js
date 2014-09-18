'use strict';

angular.module('ngTagEditor', [])
	.filter('getCol', function(){
		return function (items, row){
			return items && items.map(function (item){
					return item[row];
			}).join(',');
		}
	}).directive('focusMe', ['$timeout', '$parse', function($timeout, $parse){
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
	}]).directive('tagEditor', function(){
		return{
			restrict: 'AE',
			/* require: 'ngModel',*/
			scope: {
				tags: '=ngModel'
			},
			replace: true,
			templateUrl: 'ngTagEditor.html',
			controller: ['$scope', '$attrs', '$element', '$http', '$filter', function($scope, $attrs, $element, $http, $filter){
				
				$scope.options = [];
				$scope.options.output = $attrs.output || 'name';
				$scope.options.fetch = $attrs.fetch || 'suggestions.php?q=';
				$scope.options.placeholder = $attrs.placeholder || 'Enter a few letters...';
				$scope.options.apiOnly = $attrs.apiOnly || false;
				$scope.search = '';
			
				$scope.$watch('search', function(){
					$http.get($scope.options.fetch + $scope.search).success(function(data){
						$scope.suggestions = data.data;
						/* console.log(data); */
					});
				});
				$scope.add = function(id, name){
					$scope.tags.push({'id':id, 'name':name});
					$scope.search = '';
					$scope.$apply();
				};
				$scope.remove = function(index){
					$scope.tags.splice(index, 1);
				};
				
				$element.find('input').on('keydown', function(e){
					var keys = [8, 13, 32];
					if(keys.indexOf(e.which) !== -1){
						if(e.which == 8){ /* backspace */
							if($scope.search.length === 0 && $scope.tags.length){
								$scope.tags.pop();
								e.preventDefault();
							}
						}
						else if(e.which == 32 || e.which == 13){ /* space & enter */
							if($scope.search.length && !$scope.apiOnly){
								if(!$scope.apiOnly){
									$scope.add(0, $scope.search);
									e.preventDefault();
								}
							}
						}
						$scope.$apply();
					}
				});
				
			}]
		}
	});
