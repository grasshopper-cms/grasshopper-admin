/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'grasshopperBinders'],
    function (addContentTemplate, addContentViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            el : '#stage',
            template : addContentTemplate,
            events : {
                'click #saveContentButton' : 'saveContent'
            },
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });