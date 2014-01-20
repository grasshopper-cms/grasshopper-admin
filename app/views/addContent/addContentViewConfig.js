/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'grasshopperBinders'],
    function (addContentTemplate, addContentViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : addContentTemplate,
            events : {
                'click #saveContentButton' : 'saveContent'
            },
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });