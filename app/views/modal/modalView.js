/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    var ModalView = BaseView.extend({
        confirmModal : confirmModal,
        cancelModal : cancelModal
    });

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