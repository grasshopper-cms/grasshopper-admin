/*global define:false*/
define(['text!plugins/embeddedcontent/template.html', 'plugins/embeddedcontent/model',
    'text!plugins/embeddedcontent/setupTemplate.html', 'backbone',
    'plugins/embeddedcontent/embeddedcontentBinders', 'formatters'],
    function (embeddedcontentPluginTemplate, embeddedcontentPluginModel,
              setupTemplate, Backbone, embeddedcontentBinders, formatters) {
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
            listeners : [
                ['channels.views', 'embeddedContentSelected', 'embeddedContentSelected']
            ],
            mastheadButtons : [],
            rivetsBinders : [embeddedcontentBinders],
            rivetsFormatters : [formatters]
        };
    });


