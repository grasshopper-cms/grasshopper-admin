define(['userDetail/view', 'userDetailRow/options'], function(UserDetailView, options) {
    'use strict';

    return UserDetailView.extend({
        defaultOptions : options,
        beforeRender : noop
    });

    function noop() {}

});