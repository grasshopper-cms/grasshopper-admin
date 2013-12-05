/*global define:false*/
define(['addContentViewModel'], function (addContentViewModel) {
    'use strict';

    return {
        name : 'addContentView',
        modelType : addContentViewModel,
        modelData : {},
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'editor']
    };
});