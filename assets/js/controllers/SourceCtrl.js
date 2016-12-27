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
			sources: [{"url":"http://www.pravda.com.ua/rss/","name":"pravda all","id":1,"createdAt":"2016-12-25T22:15:42.000Z","updatedAt":"2016-12-25T22:15:42.000Z","mySubscr":false},{"url":"http://football.ua/rss2.ashx","name":"футбол","id":2,"createdAt":"2016-12-26T20:16:54.000Z","updatedAt":"2016-12-26T20:16:54.000Z","mySubscr":false}],
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
