/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {
    'use strict';
    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        deleteContent : deleteContent,
        handleRowClick : handleRowClick
    });

    function beforeRender($deferred) {
        if(!this.model.has('label')) {
            _fetchContentDetails.call(this, $deferred);
        } else {
            $deferred.resolve();
        }
    }

    function deleteContent () {
        _confirmDeletion.call(this)
            .then(_destroyThisModel.bind(this));
    }

    function _confirmDeletion() {
        return this.displayModal(
            {
                msg : resources.contentItem.deletionWarning
            });
    }

    // TODO: Refactor this. I believe that this.model.destroy can take the .done and .fail callbacks.
    function _destroyThisModel() {
        var self = this;
        this.model.destroy(
            {
                success : function (model) {
                    _handleSuccessfulDeletion.call(self, model);
                },
                error : function (model) {
                    _handleFailedDeletion.call(self, model);
                }
            });
    }

    function _handleFailedDeletion(model) {
        this.displayAlertBox(
            {
                msg : resources.contentItem.errorDeleted + model.get('label')
            }
        );
    }

    function _handleSuccessfulDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                msg : resources.contentItem.successfullyDeletedPre + model.get('label') +
                    resources.contentItem.successfullyDeletedPost,
                status : true
            }
        );
        this.remove();
    }

    function handleRowClick () {
        this.app.router.navigateTrigger(this.model.get('href'));
        return false;
    }

    function _fetchContentDetails($deferred) {
        this.model.fetch()
            .done(function() {
                $deferred.resolve();
            })
            .fail(function() {
                this.displayAlertBox({
                    msg : 'Could not retrieve content.'
                });
                $deferred.reject();
            });
    }
});