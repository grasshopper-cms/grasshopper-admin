/*global define:false*/
define(['text!plugins/filereference/modal/template.html', 'plugins/filereference/modal/model',
    'plugins/filereference/binders'],
    function (template, modalModel, fileReferenceBinders) {
    'use strict';

    return {
        name : 'fileReferenceModal',
        ModelType : modalModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        rivetsConfig : {
            binders : [fileReferenceBinders]
        },
        events : {
            'click #nodeTree' : 'stopAccordionPropagation',
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal'
        },
        listeners : []
    };
});


