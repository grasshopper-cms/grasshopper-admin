/*global define:false*/
define(['text!plugins/contentreference/modal/template.html', 'plugins/contentreference/modal/model',
    'appBinders'],
    function (template, modalModel, appBinders) {
    'use strict';

    return {
        name : 'contentReferenceModal',
        ModelType : modalModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        rivetsConfig : {
            binders : [appBinders]
        },
        events : {
            'click #nodeTree' : 'stopAccordionPropagation',
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal'
        },
        listeners : [],
        mastheadButtons : []
    };
});


