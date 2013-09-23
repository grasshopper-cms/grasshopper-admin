define(['resources', 'base64'], function(resources, base64) {
    'use strict';

    return {
        getToken : function(username, password) {
            return $.ajax({
                dataType : "json",
                url : resources.api.login.url,
                type : 'GET',
                headers : {"Authorization" : "Basic " + base64.encode(username + ":" + password)}
            });
        },
        authenticateToken : function(token) {
            return $.ajax({
                dataType : "json",
                url : resources.api.user.url,
                type : 'GET',
                headers : {"Authorization" : "Token " + base64.encode(token)}
            });
        },
        getUser: function(userModel) {
            return userModel.fetch();
        },
        saveUser: function(userModel) {
            return userModel.save();
        }
    };

});

