(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$q', '$sce', 'dataservice', 'QUERIES'];
    function MainController($q, $sce, dataservice, QUERIES) {
        var vm = this;

        vm.paginationParams = {
            startAt: 1,
            maxResults: 50
        };

        vm.loadIssues = loadIssues;
        vm.selectIssue = selectIssue;

        activate();

        function activate() {
            loadIssues();
        }

        function loadIssues() {
            var query = QUERIES.issueTypeQuery +
                '&startAt=' + ((vm.paginationParams.startAt - 1) * vm.paginationParams.maxResults) +
                '&maxResults=' + vm.paginationParams.maxResults;

            return dataservice.getIssuesBy(query).then(function (data) {
                vm.issues = data.issues;
                var selectedIssue = vm.issues[0];
                if (selectedIssue) {
                    selectIssue(selectedIssue);
                }

                vm.paginationParams.totalItems = data.total;
                return vm.issues;
            });
        }

        function selectIssue(issue) {
            var key = issue.key + QUERIES.expandRenderedFileds;
            dataservice.getIssue(key).then(function (data) {
                vm.selectedIssue = issue;
                vm.issueDescription = $sce.trustAsHtml(data.renderedFields.description);
            });
        }
    }

} ());