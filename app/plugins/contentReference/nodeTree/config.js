/*global define:false*/
define(['text!plugins/contentreference/nodeTree/template.html', 'plugins/contentreference/nodeTree/model',
    'plugins/contentreference/binders'],
    function (nodeTreeTemplate, nodeTreeModel, contentReferenceBinders) {
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
            rivetsBinders : [contentReferenceBinders]
        };
    });


