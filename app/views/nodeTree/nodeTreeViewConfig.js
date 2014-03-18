/*global define:false*/
define(['text!views/nodeTree/template.html', 'nodeTreeViewModel',
    'nodeTreeViewBinders', 'appBinders'],
    function (nodeTreeTemplate, nodeTreeModel, appBinders, nodeTreeViewBinders) {
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
                binders : [appBinders, nodeTreeViewBinders]
            }
        };
    });


