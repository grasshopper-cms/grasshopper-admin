/*global define:false*/
define(['text!views/nodeTree/template.html', 'nodeTreeViewModel',
    'nodeTreeViewBinders', 'appBinders', 'formatters'],
    function (nodeTreeTemplate, nodeTreeModel, appBinders, nodeTreeViewBinders, formatters) {
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
                formatters : [formatters],
                binders : [appBinders, nodeTreeViewBinders]
            }
        };
    });


