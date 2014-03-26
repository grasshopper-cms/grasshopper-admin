/*global define:false*/
define(['text!plugins/editorialwindow/template.html', 'plugins/editorialwindow/model',
        'text!plugins/editorialwindow/setupTemplate.html', 'plugins/editorialwindow/formatters'],
    function (editorialWindowPluginTemplate, editorialWindowPluginModel,
              setupTemplate, formatters) {
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
                defaultValueType : 'datetime',
                required : false,
                validation : false,
                value : {
                    validFrom : '',
                    validTo : ''
                }
            },
            template : editorialWindowPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            rivetsConfig : {
                formatters : formatters
            }
        };
    });