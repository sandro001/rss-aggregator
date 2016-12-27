(function () {
    'use strict';
    angular.module('App').service('ModalService', ModalService);

    ModalService.$inject = ['$http', '$uibModal', '$rootScope'];
    function ModalService($http, $uibModal, $rootScope) {
        var self = this;
        this.noConnectionModal = null;

        this.showConnectionModal = function (data, cb) {
            if(this.noConnectionModal) return;
            this.noConnectionModal = $uibModal.open({
              animation: true,
              templateUrl: '/templates/no_connection.modal.html',
              size: 'sm',
              controller: function($scope) {
                
              }
            });
        };

        this.hideConnectionModal = function (data, cb) {
            if(!this.noConnectionModal) return;
            this.noConnectionModal.close();
            this.noConnectionModal = null;
        };
    }
})();
