/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel'],
    function (addContentTemplate, addContentViewModel) {
    'use strict';

    return {
        name : 'addContentView',
        ModelType : addContentViewModel,
        modelData : {},
        el : '#stage',
        templateHtml : addContentTemplate,
        events: {},
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        mastheadButtons : [],
        permissions: ['admin', 'editor']
    };
});