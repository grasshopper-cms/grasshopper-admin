/*global define:false*/
define(['baseView', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html', 'text!views/modal/_addContentModalView.html'],
    function (BaseView, imageModalTemplate, inputModalTemplate, addContentTemplate) {
    'use strict';

    var ModalView = BaseView.extend({
        initialize : initialize,
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
            case 'addContent':
                options.templateHtml = addContentTemplate;
                break;
        }
        BaseView.prototype.initialize.apply(this, arguments);
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

    return ModalView;
});