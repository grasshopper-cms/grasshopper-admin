define(['nodeDetailViewConfig', 'jquery', 'text!views/nodeDetail/nodeDetailRow/template.html'],
    function(nodeDetailViewConfig, $, template) {
        'use strict';

        return $.extend(true, {}, nodeDetailViewConfig, {
            template : template
        });
    });