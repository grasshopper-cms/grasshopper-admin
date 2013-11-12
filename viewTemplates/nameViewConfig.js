/*global define:false*/
define(['text!views/<%= viewName %>/<%= viewName %>View.html', '<%= viewName %>ViewModel'], function (templateHtml, <%= viewName %>ViewModel) {
    'use strict';

    return {
        name : '<%= viewName %>View',
        permanentView : false,
        ModelType : <%= viewName %>ViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : {
            scope : '#<%= viewName %>',
            prefix : 'rv'
        },
        bindings : [
        ],
        appendView : false,
        events : {

        }
    };
});

// Use rivetConfig : 'auto' to create a view that will be appended. Set appendView to true, and remove the domEL attribute.
