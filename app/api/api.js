define(['constants', 'base64', 'LocalStorage'], function (constants, base64, LocalStorage) {
    'use strict';

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
        }
    };

});

