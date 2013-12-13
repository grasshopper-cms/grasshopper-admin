/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html',
    'text!views/modal/_checkboxModalView.html', 'text!views/modal/_uploadModalView.html', 'text!views/modal/modalView.html'],
    function (GrasshopperBaseView, _, imageModalTemplate, inputModalTemplate, checkboxTemplate, uploadTemplate, defaultTemplate) {
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
                options.templateHtml = uploadTemplate;
                break;
            default:
                options.templateHtml = defaultTemplate;
                break;
        }
        GrasshopperBaseView.prototype.initialize.apply(this, arguments);
    }

    function beforeRender() {
        if(this.model.has('data')){
            this.model.get('data').files = [];
        }
    }

    function handleFileSelect(e) {
        var files = _.clone(this.model.attributes.files);

        _.each(e.target.files, function(file) {
            files.push(file);
        });

        updateFileModel.call(this, files);
    }

    function handleFileDrop(e) {
        e.stopPropagation();
        e.preventDefault();

        this.handleDragLeave(e);

        var files = _.clone(this.model.attributes.files);

        _.each(e.originalEvent.dataTransfer.files, function(file) {
            files.push(file);
        });

        updateFileModel.call(this, files);
    }

    function updateFileModel(files) {
        this.model.get('data').files = files;
        this.model.set('files', files);
    }

    function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.target.className != 'active') {
            e.target.classList.add('active');
        }
        e.originalEvent.dataTransfer.dropEffect = 'copy';
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