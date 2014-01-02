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

        this.displayModal(
            {
                msg : resources.contentItem.deletionWarning
            })
            .done(function () {
                self.model.destroy(
                    {
                        success : function (model) {
                            self.displayTemporaryAlertBox(
                                {
                                    msg : resources.contentItem.successfullyDeletedPre + model.get('label') +
                                        resources.contentItem.successfullyDeletedPost,
                                    status : true
                                }
                            );
                            self.remove();
                        },
                        error : function (model) {
                            self.displayAlertBox(
                                {
                                    msg : resources.contentItem.errorDeleted + model.get('label')
                                }
                            );
                        }
                    });
            });
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