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
        var self = this;

        _confirmDeletion.call(self)
            .done(function () {
                _destroyThisModel.call(self);
            });
    }

    function _confirmDeletion() {
        return this.displayModal(
            {
                msg : resources.contentItem.deletionWarning
            });
    }

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