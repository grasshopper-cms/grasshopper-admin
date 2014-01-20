/*global define:false*/
define(['text!views/pluginWrapper/pluginWrapperView.html', 'pluginWrapperViewModel', 'grasshopperBinders'],
    function (pluginWrapperTemplate, pluginWrapperViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'pluginWrapperView',
            ModelType : pluginWrapperViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : pluginWrapperTemplate,
            events : {
                'click #addField' : 'addField',
                'click #removeField' : 'removeField'
            },
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });