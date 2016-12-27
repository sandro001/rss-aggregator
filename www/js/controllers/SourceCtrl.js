(function(){
	var app = angular.module('App');

	app.controller('AddSourceCtrl', ['$scope', '$state', 'UserService', 'ApiService',
		
	function($scope, $state, UserService, ApiService) {
		$scope.ctr = {
			sourceName: '',
			sourceUrl: '',

			addSource: addSource
		}
	    

	    function addSource() {
	    	if(!$scope.ctr.sourceName || !$scope.ctr.sourceUrl) return;
	    	ApiService.createSource({
	    		name: $scope.ctr.sourceName,
	    		url: $scope.ctr.sourceUrl,
	    	}, function(err, sources) {
				$state.go('app.sources');
			})
	    }
	}])

	app.controller('SourcesCtrl', ['$scope', '$state', 'ApiService', 
		
	function($scope, $state, ApiService) {
		$scope.ctr = {
			sources: [],
			reqObj: {
			},

			subscribe: subscribe
		}
	    
		ApiService.getSources(null, function(err, sources) {
			$scope.ctr.sources = sources.results;
		})

		function subscribe(source) {
			ApiService.subscribeToSource({
				sourceId: source.id
			}, function(err, res) {
				source.mySubscr = true;
			})
		}
	    
	}])
})();