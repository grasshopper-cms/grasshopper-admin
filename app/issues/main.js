/*global define*/
define(['./github/github', 'jquery'], function(Github, $) {
    'use strict';

    return {
        getIssues : getIssues,
        createIssue : createIssue
    };

    function getIssues() {
        return true;
    }

    function createIssue(title, body, assignee, milestone, labels) {
        var $deferred = new $.Deferred(),
            payload = {
                title : title,
                body : body,
                assignee : assignee,
                milestone : milestone,
                labels : labels
            };

        Github.createIssue.call(this, payload)
            .done(function(response) {
                $deferred.resolve(response);
            })
            .fail(function(error) {
                $deferred.reject(error);
            });

        return $deferred.promise();
    }

});