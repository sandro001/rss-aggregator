(function(){
	var app = angular.module('App');

	app.controller('SidebarCtrl', ['$scope', '$rootScope', '$state', 'ApiService', 
		
	function($scope, $rootScope, $state, ApiService) {
		$scope.ctr = {
			userTags: []
		}

		if($rootScope.authorized) {
			getUserTags();
		}
		$rootScope.$watch('authorized', function(newVal, oldVal) {
			if(newVal) {
				getUserTags();
			} else {
				$scope.ctr.userTags = [];
			}
		})


		function getUserTags() {
			ApiService.getUserTags(null, function(err, res) {
				$scope.ctr.userTags = res.results;
			})
		}

	      
	}])
})();