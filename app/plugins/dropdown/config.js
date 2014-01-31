/*global define:false*/
define(['text!plugins/dropdown/template.html', 'plugins/dropdown/model', 'text!plugins/dropdown/setupTemplate.html',
'backbone'],
    function (dropdownPluginTemplate, dropdownPluginModel, setupTemplate, Backbone) {
        'use strict';

        return {
            name : 'dropdownPlugin',
            ModelType : dropdownPluginModel,
            modelData : {},
            wrapper: false,
            template : dropdownPluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #addOptionToDropdown' : 'addOptionToDropdown',
                'blur .optionInput' : 'reduceCollection'
            },
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : [],
            collection : new Backbone.Collection()
        };
    });