define(['jquery', 'constants', 'base64', 'masseuse', 'helpers'], function ($, constants, base64, masseuse, helpers) {
    'use strict';

    var LocalStorage = helpers.localStorage;
    return {
        getToken : function (username, password) {
            return $.ajax({
                dataType : 'json',
                url : constants.api.login.url,
                type : 'GET',
                headers : {'Authorization' : 'Basic ' + base64.encode(username + ':' + password)}
            });
        },
        request : function (url) {
            var token = LocalStorage.get('authToken');
            return $.ajax({
                dataType : 'json',
                url : url,
                type : 'GET',
                headers : {'Authorization' : 'Token ' + token}
            });
        },
        getUsers : function () {
            return this.request(constants.api.users.url);
        },
        getContentTypes : function () {
            return this.request(constants.api.contentTypes.url);
        },
        getContentType : function(id) {
            return this.request(constants.api.contentTypes.url +'/'+ id);
        },
        getContentDetail : function(id) {
            return this.request(constants.api.content.url +'/'+ id);
        },
        getNodeDetail : function (nodeId) {
            return this.request(constants.api.node.url + '/' + nodeId);
        },
        getNodesChildren : function (nodeId) {
            return this.request(constants.api.nodesChildren.url.replace(':id', nodeId));
        },
        getNodesContent : function(nodeId) {
            return this.request(constants.api.nodesContent.url.replace(':id', nodeId));
        },
        authenticateToken : function () {
            return this.request(constants.api.user.url);
        },
        removeAuthToken : function () {
            return this.request(constants.api.logout.url);
        },
        post : function (url, data) {
            var token = LocalStorage.get('authToken');
            return $.ajax({
                dataType : 'json',
                url : url,
                type : 'POST',
                data : data,
                headers : {'Authorization' : 'Token ' + token}
            });
        },
        makeQuery : function (data) {
            return this.post(constants.api.contentQuery.url, data);
        },
        postFolder : function (data) {
            return this.post(constants.api.node.url, data);
        },
        renameAsset : function (url, originalName, newName) {
            return this.post(url + '/rename', {
                original : originalName,
                updated : newName
            });
        }
    };

});

