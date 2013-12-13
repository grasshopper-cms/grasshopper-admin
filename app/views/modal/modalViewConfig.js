/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel'], function (templateHtml, modalViewModel) {
    'use strict';

    return {
        name : 'modalView',
        ModelType : modalViewModel,
        el : '#modal',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        events : {
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal',
            'click #dropZone' : 'fireClickOnUploadFileInput',
            'change #uploadFileInput' : 'handleFileSelect',
            'dragover #dropZone' : 'handleDragOver',
            'drop #dropZone' : 'handleFileDrop',
            'dragleave #dropZone' : 'handleDragLeave'
        }
    };
});