/*global define:false*/
define(['text!plugins/embeddedcontent/nodeTree/template.html', 'plugins/embeddedcontent/nodeTree/model'],
    function (nodeTreeTemplate, nodeTreeModel) {
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
            rivetsBinders : []
        };
    });


