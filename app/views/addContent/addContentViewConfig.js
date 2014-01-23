/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'binders'],
    function (addContentTemplate, addContentViewModel, binders) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : addContentTemplate,
            events : {
                'click #saveContentButton' : 'saveContent',
                'blur input' : 'consoleLogIt'
            },
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetsBinders : [binders]
        };
    });