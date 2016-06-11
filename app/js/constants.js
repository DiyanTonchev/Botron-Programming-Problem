(function () {
    'use strict';

    angular.module('app')
        .constant('JIRA_REST_API_URL', 'https://jira.atlassian.com/rest/api/2/')
        .constant('QUERIES', {
            recentlyUpdatedBugIssues:
            encodeURI('search?jql=issuetype in (Bug, Documentation, Enhancement) and updated > startOfWeek()'),
        });

} ());