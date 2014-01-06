/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {
    'use strict';
    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        prepareToDeleteContentType : prepareToDeleteContentType,
        handleRowClick : handleRowClick
    });

    function beforeRender () {
        // TODO: I think this can be refactored with if(this.model.isNew()) {}
        if (!this.model.has('_id')) {
            this.model
                .fetch()
                .done(function () {})
                .fail(function () { /* TODO: Error Handling */ });
        }
    }

    function prepareToDeleteContentType () {
        _warnUserBeforeDeleting.call(this)
            .then(_actuallyDeleteContentType.bind(this));
    }

    function _warnUserBeforeDeleting() {
        return this.displayModal(
            {
                msg : resources.contentType.deletionWarning
            });
    }

    function _actuallyDeleteContentType() {
        this.model.destroy(
            {
                success : _handleSuccessfulContentTypeDeletion.bind(this),
                error : _handleFailedContentTypeDeletion.bind(this)
            });
    }

    function _handleSuccessfulContentTypeDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                msg : resources.contentType.successfullyDeletedPre + model.get('label') +
                    resources.contentType.successfullyDeletedPost,
                status : true
            }
        );
        this.remove();
    }

    function _handleFailedContentTypeDeletion(model) {
        this.displayAlertBox(
            {
                msg : resources.contentType.errorDeleted + model.get('label')
            }
        );
    }

    function handleRowClick (e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

});