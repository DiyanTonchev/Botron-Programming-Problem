(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$q', '$sce', 'dataservice', 'QUERIES'];
    function MainController($q, $sce, dataservice, QUERIES) {
        var vm = this;

        vm.paginationParams = {
            startAt: 0,
            maxResults: 20
        };

        vm.selectIssue = selectIssue;

        activate();

        function activate() {
            loadIssues().then(function (data) {
                var selectedIssue = vm.issues[0] || null;
                if (selectedIssue) {
                    selectIssue(selectedIssue);
                }
            });
        }

        function loadIssues() {
            var query = QUERIES.recentlyUpdatedBugIssues +
                '&startAt=' + vm.paginationParams.startAt +
                '&maxResults=' + vm.paginationParams.maxResults;

            return dataservice.getIssuesBy(query).then(function (data) {
                vm.issues = data.issues;
                return vm.issues;
            });
        }

        function selectIssue(issue) {
            var key = issue.key + '?fields=description&expand=renderedFields';
            dataservice.getIssue(key).then(function (data) {
                vm.selectedIssue = issue;
                vm.issueDescription = $sce.trustAsHtml(data.renderedFields.description);
            });
        }
    }

} ());