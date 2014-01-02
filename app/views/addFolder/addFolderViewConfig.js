/*global define:false*/
define(['addFolderViewModel'], function (addFolderViewModel) {
    'use strict';

    return {
        name : 'addFolderView',
        ModelType : addFolderViewModel,
        modelData : {},
        rivetConfig : 'auto',
        bindings : [],
        appendView : true,
        events : {},
        permissions : ['admin', 'editor']
    };
});