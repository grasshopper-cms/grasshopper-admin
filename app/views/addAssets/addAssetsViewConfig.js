/*global define:false*/
define(['addAssetsViewModel'], function (addAssetsViewModel) {
    'use strict';

    return {
        name : 'addAssetsView',
        ModelType : addAssetsViewModel,
        modelData : {},
        rivetConfig : 'auto',
        bindings : [],
        events : {},
        permissions : ['admin', 'editor']
    };
});