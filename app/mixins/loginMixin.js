define(['mixin', 'jquery'], function (mixin, $) {

    return mixin({
        async: true
    }, function (deferred, async, username, password, userModel) {
        //request the token
        $.ajax({
            dataType: "json",
            url:'http://localhost:8080/token',
            async: false,
            type: 'GET',
            headers: {"Authorization": "Basic " + window.btoa(username + ":" + password)},
            success: function(data) {
                if (data.token_type == "Token") {
                    //store the token in localstorage
                    localStorage.setItem('authToken', data.access_token);
                    deferred.resolve();
                } else {
                    deferred.reject('Did not receive a token from request.');
                }
            },
            error : function(jqXHR, textStatus, errorThrown){
                deferred.reject(textStatus + ' : ' +errorThrown);
            }

        });
    });
});
