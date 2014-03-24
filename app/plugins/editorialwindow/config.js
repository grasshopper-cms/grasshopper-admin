/*global define:false*/
define(['text!plugins/editorialwindow/template.html', 'plugins/editorialwindow/model',
        'text!plugins/editorialwindow/setupTemplate.html'],
    function (editorialWindowPluginTemplate, editorialWindowPluginModel,
              setupTemplate) {
        'use strict';

        return {
            name : 'editorialWindowPlugin',
            ModelType : editorialWindowPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'editorialwindow',
                dataType : 'datetime',
                required : false,
                validation : false,
                value : ''
            },
            template : editorialWindowPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });