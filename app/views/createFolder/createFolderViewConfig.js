/*global define:false*/
define(['createFolderViewModel'], function (createFolderViewModel) {
    'use strict';

    return {
        name : 'createFolderView',
        modelType : createFolderViewModel,
        modelData : {},
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'editor']
    };
});