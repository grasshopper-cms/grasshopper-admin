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
        getUser: function(userModel) {
            return userModel.fetch();
        },
        saveUser: function(userModel) {
            return userModel.save();
        }
    };

});

