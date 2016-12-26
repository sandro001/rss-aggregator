(function(){
  angular.module('App').controller('NewsCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.ctr = {
      articles: [],
      addTagForms: [],

      addTag: addTag,
      refreshNews: refreshNews
    }

    function init() {
      getArticles();
    };
    init();

    function getArticles() {
      ApiService.getArticles(null, function(err, res) {
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
  }])
})();
