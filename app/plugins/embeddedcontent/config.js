/*global define:false*/
define(['text!plugins/embeddedcontent/template.html', 'plugins/embeddedcontent/model',
    'text!plugins/embeddedcontent/setupTemplate.html', 'backbone',
    'plugins/embeddedcontent/embeddedcontentBinders'],
    function (embeddedcontentPluginTemplate, embeddedcontentPluginModel,
              setupTemplate, Backbone, embeddedcontentBinders) {
        'use strict';

        return {
            name : 'embeddedcontentPlugin',
            ModelType : embeddedcontentPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : true,
                label : '',
                type : 'embeddedcontent',
                required : false,
                validation : false,
                value : ''
            },
            template : embeddedcontentPluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #nodeTree' : 'stopAccordionPropagation'
            },
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : [],
            rivetsBinders : [embeddedcontentBinders]
        };
    });


