(function () {
    'use strict';
    angular.module('App').service('ApiService', ApiService);

    var API_DOMAIN = 'http://localhost:1338';

    ApiService.$inject = ['$http', '$timeout', 'ModalService'];
    function ApiService($http, $timeout, ModalService) {
        var self = this;

        // ARTICLES
        this.getArticles = function (data, cb) {
            var reqStr = '/api/articles';
            
            $http.post(API_DOMAIN+reqStr, data)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };
        this.updateArticle = function (data, cb) {
            var reqStr = '/api/articles/'+data.articleId;
            
            $http.patch(API_DOMAIN+reqStr, data)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.updateNewsList = function(data, cb) {
            var reqStr = '/api/article/set_latest';
            
            $http.put(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        }

        // SOURCES
        this.getSources = function (data, cb) {
            var reqStr = '/api/sources';
            
            $http.post(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.createSource = function (data, cb) {
            var reqStr = '/api/sources';
            var reqObj = {
                name: data.name,
                url: data.url
            };
            
            $http.put(API_DOMAIN+reqStr, reqObj)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.subscribeToSource = function (data, cb) {
            var reqStr = '/api/sources/'+data.sourceId+'/subscribe';
            
            $http.put(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        // USER
        this.login = function (data, cb) {
            var reqStr = '/api/login';
            var reqObj = {
                email: data.email,
                password: data.password
            }
            
            function doReq() {
                $http.put(API_DOMAIN+reqStr, reqObj)
                    .then(function (res, status, headers, config) {
                        ModalService.hideConnectionModal();
                        if(cb) cb(null, res.data);
                    })
                    .catch(function(err) {
                        if(err.status == -1) {
                            exponentialBackoff(doReq)
                        } else {
                            cb(err);
                        }
                    });
            }
            doReq();
        };

        this.logout = function (data, cb) {
            var reqStr = '/api/logout';
            $http.put(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.register = function (data, cb) {
            var reqStr = '/api/users';
            var reqObj = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            }
            
            $http.put(API_DOMAIN+reqStr, reqObj)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        // TAGS
        this.getUserTags = function(data, cb) {
            var reqStr = '/api/tags/my';
            
            $http.post(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        }
        this.searchTags = function(data, cb) {
            var reqStr = '/api/tags';
            
            $http.post(API_DOMAIN+reqStr, data)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        }

        var exponentialTimeout = 2000;
        function exponentialBackoff(fn) {
            ModalService.showConnectionModal();
            $timeout(function() {
                fn();
                exponentialTimeout *= 2;
            }, exponentialTimeout)
        }
    }
})();
