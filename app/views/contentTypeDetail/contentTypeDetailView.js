/*global define:false*/
define(['grasshopperBaseView', 'resources', 'plugins'], function (GrasshopperBaseView, resources, plugins) {
    'use strict';
    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        afterRender : afterRender,
        prepareToDeleteContentType : prepareToDeleteContentType,
        handleRowClick : handleRowClick,
        addNewFieldToContentType : addNewFieldToContentType
    });

    function beforeRender ($deferred) {
        if (!this.model.has('label')) {
            this.model.fetch()
                .done($deferred.resolve)
                .fail($deferred.reject);
        } else {
            $deferred.resolve();
        }
        this.model.set('plugins', plugins);
    }

    function afterRender() {
        this.$el.foundation();
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

    function addNewFieldToContentType() {
        console.log('rivet click biotch');
    }

});