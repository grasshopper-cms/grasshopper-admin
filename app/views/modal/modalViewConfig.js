/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel'], function (templateHtml, modalViewModel) {
    'use strict';

    return {
        name : 'modalView',
        ModelType : modalViewModel,
        el : '#modal',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        prependView : false,
        events : {
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal'
        }
    };
});