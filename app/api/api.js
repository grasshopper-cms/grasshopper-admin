define(['resources', 'base64'], function (resources, base64) {
    'use strict';

    return {
        getToken : function (username, password) {
            return $.ajax({
                dataType : "json",
                url : resources.api.login.url,
                type : 'GET',
                headers : {"Authorization" : "Basic " + base64.encode(username + ":" + password)}
            });
        },
        authenticateToken : function () {
            return this.request(resources.api.user.url);
        },
        getUser : function (userModel) {
            return userModel.fetch();
        },
        saveUser : function (userModel) {
            return userModel.save();
        },
        request : function (url) {
            var token = localStorage.authToken;
            return $.ajax({
                dataType : "json",
                url : url,
                type : 'GET',
                headers : {"Authorization" : "Token " + token}
            });
        },
        getRequestedUserDetail : function(id) {
            return this.request(resources.api.users.url + '/' + id);
        }
    };

});

