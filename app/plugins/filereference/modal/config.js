/*global define:false*/
define(['text!plugins/filereference/modal/template.html', 'plugins/filereference/modal/model',
    'appBinders'],
    function (template, modalModel, appBinders) {
    'use strict';

    return {
        name : 'fileReferenceModal',
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
        listeners : []
    };
});


