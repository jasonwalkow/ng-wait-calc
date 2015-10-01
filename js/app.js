angular.module('moduleOne', ['ngMessages'])

	.controller('MyCtrl', ['$scope', function($scope) {
		$scope.customer = {};
		$scope.staff = {
			meals: 0,
			tips: 0,
			avgTips: 0
		};

	$scope.compute = function() {
		if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
			$scope.customer.subtotal = $scope.meal.base_price * (($scope.meal.tax_rate/100)+1);
			$scope.customer.tip = $scope.customer.subtotal * (($scope.meal.tip_percentage/100));
			$scope.customer.total = $scope.customer.tip + $scope.customer.subtotal;
			$scope.staff.tips += $scope.customer.tip;
			$scope.staff.meals++;
			$scope.staff.avgTips = $scope.staff.tips/$scope.staff.meals;
		}
	};

	$scope.submit = function() {
		if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
      		$scope.compute();
    	}
	};

	$scope.cancel = function() {
		$scope.mealDetails.$setPristine();
		$scope.meal = {};
	}

	$scope.reset = function() {
		$scope.mealDetails.$setPristine();
		$scope.meal = {};
		$scope.customer = {};
		$scope.staff.meals = 0;
		$scope.staff.tips = 0;
		$scope.staff.avgTips = 0;
	}

	}]);