define(['resources', 'base64', 'underscore'], function (resources, base64, _) {
    'use strict';

    return {
        getToken : function (username, password) {
            return $.ajax({
                dataType : 'json',
                url : resources.api.login.url,
                type : 'GET',
                headers : {'Authorization' : 'Basic ' + base64.encode(username + ':' + password)}
            });
        },
        authenticateToken : function () {
            return this.request(resources.api.user.url);
        },
        getUser : function (userModel) {
            return userModel.fetch();
        },
        saveUser : function (userModel) {
            return this.post(resources.api.users.url, _.omit(userModel.attributes, ['roles', 'isAdmin', 'enabledText']));
        },
        request : function (url) {
            var token = localStorage.authToken;
            return $.ajax({
                dataType : 'json',
                url : url,
                type : 'GET',
                headers : {'Authorization' : 'Token ' + token}
            });
        },
        getRequestedUserDetails : function(id) {
            return this.request(resources.api.users.url + '/' + id);
        },
        getMyUserDetails : function() {
            return this.request(resources.api.user.url);
        },
        getUsers : function() {
            return this.request(resources.api.users.url);
        },
        post : function(url, payload) {
            var token = localStorage.authToken;
            return $.ajax({
                dataType : 'json',
                url : url,
                type : 'PUT',
                headers : {'Authorization' : 'Token ' + token},
                data : payload
            });
        }
    };

});

