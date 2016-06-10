(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];
    function dataservice($http, $q) {
        var service = {

        };

        return service;


    }
})();