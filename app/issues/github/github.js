/*global define*/
define(['jquery', 'underscore'], function($, _) {
    'use strict';

    var rootUrl = 'https://github.com/Solid-Interactive/grasshopper-admin';

    return {
        getIssues : getIssues,
        createIssue : createIssue
    };

    function getIssues() {
        return true;
    }

    function createIssue(payload) {
        var $deferred = new $.Deferred();

        _ensureIssueIsValid.call(this, payload);

        if(payload.validationError) {
            $deferred.reject(payload.validationError);
        }

        _POST.call(this, rootUrl + '/issues', payload) //POST /repos/:owner/:repo/issues
            .done(function(response) {
                $deferred.resolve(response);
            })
            .fail(function(response) {
                $deferred.reject(response);
            });

        return $deferred.promise();
    }

    function _POST(url, data) {
        return $.ajax({
            type: 'POST',
            url: url,
            data: data
        });
    }

    function _ensureIssueIsValid(payload) {
        var validationError;

        payload = payload ? payload : {};

        if(_.isEmpty(payload)) {
            validationError += 'A Payload must be supplied to create an issue.';
        }

        if(!validationError && payload.title && !_.isString(payload.title)) {
            validationError += 'Github issue title must be a string.';
        }

        if(!validationError && payload.body && !_.isString(payload.body)) {
            validationError += 'Github issue body must be a string.';
        }

        if(!validationError && payload.assignee && !_.isString(payload.assignee)) {
            validationError += 'Github issue assignee must be a string.';
        }

        if(!validationError && payload.milestone && !_.isNumber(payload.milestone)) {
            validationError += 'Github issue milestone must be a number.';
        }

        if(!validationError && payload.labels && !_.isArray(payload.labels)) {
            validationError += 'Github issue labels must be an array.';
        }
        payload.validationError = validationError;

        return payload;
    }

});