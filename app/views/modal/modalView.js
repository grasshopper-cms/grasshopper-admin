/*global define:false*/
define(['baseView', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html'], function (BaseView, imageModalViewTemplate, inputModalViewTemplate) {
    'use strict';

    var ModalView = BaseView.extend({
        initialize : initialize,
        confirmModal : confirmModal,
        cancelModal : cancelModal
    });

    function initialize(options) {
        switch (options.type) {
            case 'image':
                options.templateHtml = imageModalViewTemplate;
                break;
            case 'input':
                options.templateHtml = inputModalViewTemplate;
                break;
        }
        BaseView.prototype.initialize.apply(this, arguments);
    }

    function confirmModal() {
        this.options.$deferred.resolve();
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