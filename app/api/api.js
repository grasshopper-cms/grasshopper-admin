define(['constants', 'base64', 'masseuse'], function (constants, base64, masseuse) {
    'use strict';

    var LocalStorage = masseuse.localStorage;
    return {
        getToken : function (username, password) {
            return $.ajax({
                dataType : 'json',
                url : constants.api.login.url,
                type : 'GET',
                headers : {'Authorization' : 'Basic ' + base64.encode(username + ':' + password)}
            });
        },
        authenticateToken : function () {
            return this.request(constants.api.user.url);
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
        getUsers : function() {
            return this.request(constants.api.users.url);
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
        makeQuery : function(data) {
            return this.post(constants.api.contentQuery.url, data);
        },
        postFolder : function(data) {
            return this.post(constants.api.node.url, data);
        },
        getContentTypes : function() {
            return this.request(constants.api.contentTypes.url);
        },
        addContentTypesToNode : function(nodeId, contentTypes) {
            return this.post(constants.api.nodesContentTypes.url.replace(':id', nodeId), JSON.stringify(contentTypes));
        },
        getNodeDetail : function(nodeId) {
            return this.request(constants.api.node.url + '/' + nodeId);
        },
        renameAsset : function(url, originalName, newName) {
            return this.post(url + '/rename', {
                original: originalName,
                updated: newName
            });
        }
    };

});

