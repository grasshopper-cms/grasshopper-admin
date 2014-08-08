/*global define:false*/
define(['text!views/itemSelectModal/template.html', 'itemSelectModal/model',
    'appBinders', 'resources', 'itemSelectModal/binders'],
    function (template, Model, appBinders, resources, binders) {
    'use strict';

    return {
        name : 'itemSelectModal',
        ModelType : Model,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        rivetsConfig : {
            binders : [appBinders, binders]
        },
        privateBreadcrumbs : true,
        breadcrumbs : [
            {
                text : resources.root,
                nodeId : '0'
            }
        ],
        events : {
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal',
            'click .modalBreadcrumb' : 'navigateToFolder'
        }
    };
});