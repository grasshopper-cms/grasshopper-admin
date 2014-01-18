/*global define:false*/
define(['text!views/pluginWrapper/pluginWrapperView.html', 'pluginWrapperViewModel', 'grasshopperBinders'],
    function (pluginWrapperTemplate, pluginWrapperViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'pluginWrapperView',
            ModelType : pluginWrapperViewModel,
            modelData : {},
            el : '#stage',
            template : pluginWrapperTemplate,
            events : {
                'click addField' : 'addField',
                'click removeField' : 'removeField'
            },
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });