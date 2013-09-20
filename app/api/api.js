define([], function(login) {
    'use strict';

    return {
        getToken : function(username, password) {
            return $.ajax({
                dataType: "json",
                // TODO: we should get the base url from some sort of config file / model
                url:'http://localhost:8080/token',
                type: 'GET',
                headers: {"Authorization": "Basic " + window.btoa(username + ":" + password)}
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

