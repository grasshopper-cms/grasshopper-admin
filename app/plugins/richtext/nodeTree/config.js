/*global define:false*/
define(['text!plugins/richtext/nodeTree/template.html', 'plugins/richtext/nodeTree/model',
    'plugins/richtext/binders'],
    function (nodeTreeTemplate, nodeTreeModel, richTextBinders) {
        'use strict';

        return {
            name : 'nodeTreePlugin',
            ModelType : nodeTreeModel,
            modelData : {},
            template : nodeTreeTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            rivetsConfig : {
                binders : [richTextBinders]
            }
        };
    });


