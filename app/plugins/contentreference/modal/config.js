/*global define:false*/
define(['text!plugins/contentreference/modal/template.html', 'plugins/contentreference/modal/model',
    'appBinders', 'resources', 'constants', 'plugins/contentreference/modal/binders'],
    function (template, modalModel, appBinders, resources, constants, contentRefModalBinders) {
    'use strict';

    return {
        name : 'contentReferenceModal',
        ModelType : modalModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        rivetsConfig : {
            instaUpdate: true,
            binders : [appBinders, contentRefModalBinders]
        },
        privateBreadcrumbs : true,
        breadcrumbs : [
            {
                text : resources.root,
                nodeId : '0'
            }
        ],
        events : {
            'click #nodeTree' : 'stopAccordionPropagation',
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal',
            'click .modalBreadcrumb' : 'navigateToFolder'
        }
    };
});