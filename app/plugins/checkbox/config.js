/*global define:false*/
define(['text!plugins/checkbox/template.html', 'plugins/checkbox/model', 'text!plugins/checkbox/setupTemplate.html',
    'backbone'],
    function (checkboxPluginTemplate, checkboxPluginModel, setupTemplate,
              Backbone) {

        'use strict';

        return {
            name : 'checkboxPlugin',
            ModelType : checkboxPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : true,
                label : '',
                type : 'checkbox',
                dataType : 'boolean',
                required : false,
                validation : [],
                value : ''
            },
            template : checkboxPluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #addOption' : 'addOption',
                'blur .optionInput' : 'reduceCollection',
                'click .checkboxListCheckbox' : 'buildValues'
            },
            wrapper: false,
            listeners : [],
            mastheadButtons : [],
            collection : new Backbone.Collection()
        };
    });