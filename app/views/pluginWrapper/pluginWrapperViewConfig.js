/*global define:false*/
define(['text!views/pluginWrapper/pluginWrapperView.html', 'pluginWrapperViewModel', 'binders'],
    function (pluginWrapperTemplate, pluginWrapperViewModel, binders) {
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
            rivetsBinders : [binders]
        };
    });