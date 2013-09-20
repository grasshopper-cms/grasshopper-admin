define(['resources'], function(resources) {
    'use strict';

    return {
        getToken : function(username, password) {
            return $.ajax({
                dataType : "json",
                url : resources.api.login.url,
                type : 'GET',
                headers : {"Authorization" : "Basic " + window.btoa(username + ":" + password)}
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

