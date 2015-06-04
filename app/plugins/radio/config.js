/*global define:false*/
define(['text!plugins/radio/template.html', 'plugins/radio/model', 'text!plugins/radio/setupTemplate.html'],
    function (radioPluginTemplate, radioPluginModel, setupTemplate) {

        'use strict';

        return {
            name : 'radioPlugin',
            ModelType : radioPluginModel,
            modelData : function() {
                return {
                    min : 1,
                    max : 1,
                    options : true,
                    label : '',
                    type : 'radio',
                    dataType : 'boolean',
                    validation : []
                };
            },
            template : radioPluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #addOption' : 'addOption',
                'blur .optionInput' : 'reduceOptions',
                'click .radioListCheckbox' : 'reduceValues'
            },
            wrapper: false
        };
    });
