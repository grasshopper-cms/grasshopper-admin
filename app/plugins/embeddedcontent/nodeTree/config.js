/*global define:false*/
define(['text!plugins/embeddedcontent/nodeTree/template.html', 'plugins/embeddedcontent/nodeTree/model',
    'plugins/embeddedcontent/embeddedcontentBinders'],
    function (nodeTreeTemplate, nodeTreeModel, embeddedcontentBinders) {
        'use strict';

        return {
            name : 'nodeTreePlugin',
            ModelType : nodeTreeModel,
            modelData : {},
            template : nodeTreeTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : [],
            rivetsBinders : [embeddedcontentBinders]
        };
    });


