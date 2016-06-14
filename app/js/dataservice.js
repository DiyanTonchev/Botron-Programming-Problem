(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'JIRA_REST_API_URL'];
    function dataservice($http, $q, JIRA_REST_API_URL) {
        var service = {
            getIssuesBy: getIssuesBy,
            getIssue: getIssue
        };

        return service;

        function getIssuesBy(query) {
            var request = {
                method: 'GET',
                url: JIRA_REST_API_URL + query
            };

            return $http(request)
                .then(function success(response) {
                    return response.data;
                }).catch(function error(errResponse) {
                    return $q.reject(errResponse);
                });
        }

        function getIssue(key) {
            var url = JIRA_REST_API_URL + 'issue/' + key;
            return $http.get(url)
                .then(function success(response) {
                    return response.data;
                }).catch(function (errResponse) {
                    return $q.reject(errResponse);
                });
        }
    }
})();