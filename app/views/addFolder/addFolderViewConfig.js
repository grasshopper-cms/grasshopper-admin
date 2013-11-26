/*global define:false*/
define(['addFolderViewModel'], function (addFolderViewModel) {
    'use strict';

    return {
        name : 'addFolderView',
        modelType : addFolderViewModel,
        modelData : {},
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'editor']
    };
});