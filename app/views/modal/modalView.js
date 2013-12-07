/*global define:false*/
define(['grasshopperBaseView', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html',
    'text!views/modal/_checkboxModalView.html'],
    function (GrasshopperBaseView, imageModalTemplate, inputModalTemplate, checkboxTemplate) {
    'use strict';

    return GrasshopperBaseView.extend({
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
            case 'checkbox':
                options.templateHtml = checkboxTemplate;
                break;
        }
        GrasshopperBaseView.prototype.initialize.apply(this, arguments);
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