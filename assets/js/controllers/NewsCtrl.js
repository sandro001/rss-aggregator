(function(){

  angular.module('App').controller('NewsCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
    ApiService.getArticles(null, function(err, res) {
      $scope.news = {
        0: {
          title: "Манджукич теж поїде в Китай?",
          publication_date: "12/23/2016",
          createdAt: "10:01 pm",
          updatedAt: "21:21 pm",
          description: "Форвард збірної Хорватії і туринського Ювентуса Маріо Манджукич потрапив у поле зору китайського Бейцзин Гоань.",
          tags: {
            0: {
              name: "Політика"
            },
            1: {
              name: "Улыбка"
            },
          }
        },
        1: {
          title: "Манджукич теж поїде в Китай?",
          publication_date: "12/23/2016",
          createdAt: "10:01 pm",
          updatedAt: "21:21 pm",
          description: "Форвард збірної Хорватії і туринського Ювентуса Маріо Манджукич потрапив у поле зору китайського Бейцзин Гоань.",
          tags: {
            0: {
              name: "Пол1ітика"
            },
            1: {
              name: "Улыбка"
            },
          }
        },
        2: {
          title: "Манджукич теж поїде в Китай?",
          publication_date: "12/23/2016",
          createdAt: "10:01 pm",
          updatedAt: "21:21 pm",
          description: "Форвард збірної Хорватії і туринського Ювентуса Маріо Манджукич потрапив у поле зору китайського Бейцзин Гоань.",
          tags: {
            0: {
              name: "Пол213ітика"
            },
            1: {
              name: "Улыбка"
            },
          }
        }
      };


      $scope.showNewTag = function (index) {
        if (this.newTag) {
          $scope.news[index].tags[Object.keys($scope.news[index].tags).length] = {name: this.newTag};
          this.newTag = "";
        }
      }
    })
  }])
})();
