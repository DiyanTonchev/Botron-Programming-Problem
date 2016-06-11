(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$q', 'dataservice', 'QUERIES'];
    function MainController($q, dataservice, QUERIES) {
        var vm = this;

        vm.paginationParams = {
            startAt: 0,
            maxResults: 20
        };

        vm.selectIssue = selectIssue;

        activate();

        function activate() {
            // var promises = [loadIssues()];
            // $q.all(promises);
            loadIssues();
        }

        function loadIssues() {
            var query = QUERIES.recentlyUpdatedBugIssues +
                '&startAt=' + vm.paginationParams.startAt +
                '&maxResults=' + vm.paginationParams.maxResults;
            return dataservice.getIssuesBy(query).then(function (data) {
                vm.issues = data.issues;
                vm.selectedIssue = vm.issues[0] || null;
                return vm.issues;
            });
        }

        function selectIssue(issue) {
            console.log(issue);
            vm.selectedIssue = issue;
        }
    }

} ());