define(['loginMixin'], function(login) {

    function Api() {}

    Api.prototype = {
        login: login.call(this)
    };

    return new Api();

});

