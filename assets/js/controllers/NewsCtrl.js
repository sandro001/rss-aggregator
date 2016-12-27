(function(){

  angular.module('App').controller('NewsCtrl', ['$scope', 'ApiService', '$q', function($scope, ApiService, $q) {
    $scope.ctr = {
      articles: [],
      addTagForms: [],
      selectedTag: null,
      searchObj: {
        search: '',
        tags: []
      },

      addTag: addTag,
      refreshNews: refreshNews,
      getTags: getTags,
      onTagSelect: onTagSelect,
      onTagRemoveFromSearch: onTagRemoveFromSearch
    }

    function init() {
      getArticles();
    };
    init();

    function getArticles() {
      var reqObj = angular.copy($scope.ctr.searchObj);
      var newTags = [];
      $scope.ctr.searchObj.tags.map(function(tag) {
        newTags.push(tag.id);
      })
      reqObj.tags = newTags;
      ApiService.getArticles(reqObj, function(err, res) {
        $scope.ctr.articles = res.results;
      })
    }

    function addTag(article, name) {
      var newArticle = angular.copy(article);
      newArticle.tags.push({name: name});
      newArticle['articleId'] = article.id;
      ApiService.updateArticle(newArticle, function(err, res) {
        article.tags = newArticle.tags;
      }) 
    }

    function refreshNews() {
      ApiService.updateNewsList(null, function(err, res) {
        getArticles();
      }) 
    }

    function getTags(str) {
      var deferred = $q.defer();
      ApiService.searchTags({search: str}, function(err, res) {
        deferred.resolve(res.results);
      }) 
      return deferred.promise;
    }

    function onTagSelect(tag) {
      $scope.ctr.searchObj.tags.push(tag);
      getArticles();
      $scope.ctr.selectedTag = '';
    }

    function onTagRemoveFromSearch(tag, index) {
      $scope.ctr.searchObj.tags.splice( index, 1 );
      getArticles();
    }
  }])
})();
