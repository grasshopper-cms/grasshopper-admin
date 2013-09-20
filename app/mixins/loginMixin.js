define(['mixin', 'jquery'], function (mixin, $) {

    return mixin({
    }, function (deferred, async, username, password, userModel) {
        //request the token
        promise = $.ajax({
            dataType: "json",
            // TODO: we should get the base url from some sort of config file / model
            url:'http://localhost:8080/token',
            type: 'GET',
            headers: {"Authorization": "Basic " + window.btoa(username + ":" + password)},
            success: function(data) {
                // Good practice to put variable second to prevent accidental assignment
                // Also use === if possible
                console.log("success");
                if ("Token" === data.token_type) {
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
        return promise;
    });
});
