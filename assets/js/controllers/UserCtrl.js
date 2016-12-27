(function(){
	var app = angular.module('App');

	app.controller('LoginCtrl', ['$scope', '$state', 'ApiService', 'UserService', 
		
	function($scope, $state, ApiService, UserService) {
		$scope.ctr = {
			email: null,
			password: null,

			error: null
		}

		$scope.login = function() {
			$scope.ctr.error = null;
			var reqObj = {
				email: $scope.ctr.email,
				password: $scope.ctr.password,
			}
			UserService.login(reqObj, function(err, res) {
				if(err) {
					if(err.status == 401) {
						$scope.ctr.error = 'Invalid email or password';
					}
					return console.error(err);
				}
				$state.go('app.news');
			})
		}
	      
	}])

	app.controller('RegisterCtrl', ['$scope', '$state', 'UserService', function($scope, $state, UserService) {
	    $scope.ctr = {
			email: null,
			password: null,
			confirmPassword: null,
			firstName: null,
			lastName: null,
			register: register
		}

		function register() {
			var reqObj = {
				email: $scope.ctr.email,
				password: $scope.ctr.password,
				firstName: $scope.ctr.firstName,
				lastName: $scope.ctr.lastName,
			}
			UserService.register(reqObj, function(err, res) {
				if(err) {
					return console.error(err);
				}
				$state.go('app.news');
			})
		}
	}])
})();