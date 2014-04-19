/*global define:false*/
define(['grasshopperBaseView', 'modalViewConfig', 'underscore', 'jquery', 'text!views/modal/_imageModalView.html',
    'text!views/modal/_inputModalView.html', 'text!views/modal/_checkboxModalView.html',
    'text!views/modal/_uploadModalView.html', 'text!views/modal/modalView.html',
    'text!views/modal/_radioModalView.html', 'text!views/modal/_listModalView.html',
    'text!views/modal/_errorModalView.html'],
    function (GrasshopperBaseView, modalViewConfig, _, $, imageModalTemplate,
              inputModalTemplate, checkboxTemplate,
              uploadTemplate, defaultTemplate,
              radioTemplate, listTemplate,
              errorTemplate) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : modalViewConfig,
            initialize : initialize,
            afterRender : afterRender,
            fireClickOnUploadFileInput : fireClickOnUploadFileInput,
            handleFileSelect : handleFileSelect,
            handleFileDrop : handleFileDrop,
            handleDragOver : handleDragOver,
            handleDragLeave : handleDragLeave,
            selectUrlText : selectUrlText,
            confirmModal : confirmModal,
            cancelModal : cancelModal
        });

        function initialize (options) {
            switch (options.type) {
            case 'image':
                options.template = imageModalTemplate;
                break;
            case 'input':
                options.template = inputModalTemplate;
                break;
            case 'checkbox':
                options.template = checkboxTemplate;
                break;
            case 'upload':
                options.template = uploadTemplate;
                break;
            case 'radio':
                options.template = radioTemplate;
                break;
            case 'list':
                options.template = listTemplate;
                break;
            case 'error':
                options.template = errorTemplate;
                break;
            default:
                options.template = defaultTemplate;
                break;
            }
            GrasshopperBaseView.prototype.initialize.apply(this, arguments);
        }

        function afterRender () {
            this.$el.foundation();
        }

        function fireClickOnUploadFileInput (e) {
            e.stopPropagation();
            e.preventDefault();
            document.querySelector('#uploadFileInput').click();
        }

        function handleFileSelect (e) {
            var files = _.clone(this.model.attributes.files);

            _.each(e.target.files, function (file) {
                files.push(file);
            });

            updateFileModel.call(this, files);
        }

        function handleFileDrop (e) {
            e.stopPropagation();
            e.preventDefault();

            this.handleDragLeave(e);

            var files = _.clone(this.model.attributes.files);

            _.each(e.originalEvent.dataTransfer.files, function (file) {
                files.push(file);
            });

            updateFileModel.call(this, files);
        }

        function updateFileModel (files) {
            this.model.set('files', files);
        }

        function handleDragOver (e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.target.className != 'active') {
                e.target.classList.add('active');
            }
            e.originalEvent.dataTransfer.dropEffect = 'copy';
        }

        function handleDragLeave (e) {
            e.target.classList.remove('active');
        }

        function selectUrlText() {
            $('#imageURL').select();
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.attributes);
            _removeModal.call(this);
        }

        function cancelModal () {
            this.$deferred.reject();
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

    });