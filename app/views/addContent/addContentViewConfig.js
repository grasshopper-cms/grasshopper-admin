/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'addContentViewBinders'],
    function (addContentTemplate, addContentViewModel, addContentViewBinders) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            el : '#stage',
            templateHtml : addContentTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [addContentViewBinders]
        };
    });