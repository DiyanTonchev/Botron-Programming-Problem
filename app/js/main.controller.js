(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$q', 'dataservice', 'QUERIES'];
    function MainController($q, dataservice, QUERIES) {
        var vm = this;

        activate();

        function activate() {
            var promises = [getIssues()];
            $q.all(promises);
        }

        function getIssues() {
            return dataservice.getIssuesBy(QUERIES.recentlyUpdatedIssues).then(function (data) {
                console.log(data);
            });
        }
    }

} ());