/*global define:false*/
define(['text!plugins/dropdown/template.html', 'plugins/dropdown/model', 'text!plugins/dropdown/setupTemplate.html',
'backbone'],
    function (dropdownPluginTemplate, dropdownPluginModel, setupTemplate, Backbone) {
        'use strict';

        return {
            name : 'dropdownPlugin',
            ModelType : dropdownPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : true,
                label : '',
                type : 'dropdown',
                required : false,
                validation : false,
                value : ''
            },
            wrapper: false,
            template : dropdownPluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #addOptionToDropdown' : 'addOptionToDropdown',
                'blur .optionInput' : 'reduceCollection'
            },
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : [],
            collection : new Backbone.Collection()
        };
    });