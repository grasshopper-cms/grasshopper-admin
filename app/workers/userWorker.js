define(['api', 'jquery', 'resources', 'userModel'],
    function (api, $, resources, userModel) {
        'use strict';

        return {
            getUser : getUser
        };

        function getUser(userModel) {
            api.getUser(userModel)
                .done()
                .fail();
        }
    });