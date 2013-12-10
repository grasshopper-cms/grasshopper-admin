/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html',
    'text!views/modal/_checkboxModalView.html', 'text!views/modal/_uploadModalView.html'],
    function (GrasshopperBaseView, _, imageModalTemplate, inputModalTemplate, checkboxTemplate, uploadModalView) {
    'use strict';

    return GrasshopperBaseView.extend({
        initialize : initialize,
        beforeRender : beforeRender,
        handleFileSelect : handleFileSelect,
        handleFileDrop : handleFileDrop,
        handleDragOver : handleDragOver,
        handleDragLeave : handleDragLeave,
        confirmModal : confirmModal,
        cancelModal : cancelModal
    });

    function initialize(options) {
        switch (options.type) {
            case 'image':
                options.templateHtml = imageModalTemplate;
                break;
            case 'input':
                options.templateHtml = inputModalTemplate;
                break;
            case 'checkbox':
                options.templateHtml = checkboxTemplate;
                break;
            case 'upload':
                options.templateHtml = uploadModalView;
                break;
        }
        GrasshopperBaseView.prototype.initialize.apply(this, arguments);
    }

    function beforeRender() {
        this.model.get('data').files = [];
    }

    function handleFileSelect(e) {
        var files = _.clone(this.model.attributes.files);
        files.push(e.target.files[0]);

        updateFileModel.call(this, files);
    }

    function handleFileDrop(e) {
        e.stopPropagation();
        e.preventDefault();

        this.handleDragLeave(e);

        var files = _.clone(this.model.attributes.files);
        files.push(e.originalEvent.dataTransfer.files[0]);

        updateFileModel.call(this, files);
    }

    function updateFileModel(files) {
        this.model.get('data').files.push(files);
        this.model.set('files', files);
    }

    function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.target.className != 'active') {
            e.target.classList.add('active');
        }
        e.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    function handleDragLeave(e) {
        e.target.classList.remove('active');
    }

    function confirmModal() {
        this.options.$deferred.resolve(this.model.get('data'));
        _removeModal.call(this);
    }

    function cancelModal() {
        this.options.$deferred.reject();
        _removeModal.call(this);
    }

    function _removeModal() {
        this.remove();
    }

});