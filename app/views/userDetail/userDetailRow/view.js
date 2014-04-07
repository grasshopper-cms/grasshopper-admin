define(['userDetailView', 'userDetailRowConfig'], function(UserDetailView, userDetailRowConfig) {
    'use strict';

    return UserDetailView.extend({
        defaultOptions : userDetailRowConfig,
        beforeRender : noop
    });

    function noop() {}

});