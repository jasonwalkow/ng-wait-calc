angular.module('moduleOne', ['ngMessages', 'ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
	    $routeProvider.when('/', {
	      templateUrl : 'home.html',
	      controller : 'HomeCtrl'
	    }).when('/new-meal', {
	      templateUrl : 'new-meal.html',
	      controller: 'newMealCtrl'
	    }).when('/my-earnings', {
	      templateUrl : 'my-earnings.html',
	      controller: 'myEarningsCtrl'
	    });
	}])
	.controller('HomeCtrl', ['$rootScope', function($rootScope) {

	}])
	.controller('myEarningsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		$scope.staff = $rootScope.staff || {};
		$scope.reset = function() {
				$scope.staff.meals = 0;
				$scope.staff.tips = 0;
				$scope.staff.avgTips = 0;
				$rootScope.staff = {
					meals : 0,
		      		tips : 0,
		      		avgTips : 0 
				};
			}
	}])
	.controller('newMealCtrl', ['$scope', '$rootScope', '$routeParams', 
		function($scope, $rootScope, $routeParams) {
		    $scope.customer = $scope.customer || {};
		    $rootScope.staff = $rootScope.staff || {
		      	meals : 0,
		      	tips : 0,
		      	avgTips : 0 
			};

			$scope.compute = function() {
				if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
					$scope.customer.subtotal = $scope.meal.base_price * (($scope.meal.tax_rate/100)+1);
					$scope.customer.tip = $scope.customer.subtotal * (($scope.meal.tip_percentage/100));
					$scope.customer.total = $scope.customer.tip + $scope.customer.subtotal;
					$rootScope.staff.tips += $scope.customer.tip;
					$rootScope.staff.meals++;
					$rootScope.staff.avgTips = $rootScope.staff.tips/$rootScope.staff.meals;
				}
			};

			$scope.submit = function() {
				if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
		      		$scope.compute();
		    	}
			};

			$scope.cancel = function() {
				$scope.mealDetails.$setPristine();
				$rootScope.meal = {};
			}
		}
	]);