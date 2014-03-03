/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel'], function (template, modalViewModel) {
    'use strict';

    return {
        name : 'modalView',
        ModelType : modalViewModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
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