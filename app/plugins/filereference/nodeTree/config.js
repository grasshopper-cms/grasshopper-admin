/*global define:false*/
define(['text!plugins/filereference/nodeTree/template.html', 'plugins/filereference/nodeTree/model',
    'plugins/filereference/binders'],
    function (nodeTreeTemplate, nodeTreeModel, fileReferenceBinders) {
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
                binders : [fileReferenceBinders]
            }
        };
    });


