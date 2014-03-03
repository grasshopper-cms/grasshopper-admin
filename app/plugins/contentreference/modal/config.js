/*global define:false*/
define(['text!plugins/contentreference/modal/template.html', 'plugins/contentreference/modal/model',
    'plugins/contentreference/binders'],
    function (template, modalModel, contentReferenceBinders) {
    'use strict';

    return {
        name : 'contentReferenceModal',
        ModelType : modalModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        rivetsConfig : {
            binders : [contentReferenceBinders]
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


