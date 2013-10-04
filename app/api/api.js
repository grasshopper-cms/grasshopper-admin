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
        getUser : function (userModel) {
            return userModel.fetch();
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
        getRequestedUserDetails : function(id) {
            return this.request(constants.api.users.url + '/' + id);
        },
        getMyUserDetails : function() {
            return this.request(constants.api.user.url);
        },
        getUsers : function() {
            return this.request(constants.api.users.url);
        }

    };

});

