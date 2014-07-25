define(['userDetailViewConfig', 'jquery', 'text!views/userDetail/userDetailRow/template.html'],
    function(userDetailViewConfig, $, template) {
        'use strict';

        return $.extend(true, {}, userDetailViewConfig, {
            template : template
        });
    });