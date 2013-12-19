/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker', 'nodeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker, nodeWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender
    });

    function afterRender() {
        getFolderName.call(this);
    }

    function getFolderName() {
        var self = this;
        this.displayModal(
            {
                msg: resources.node.enterName,
                type: 'input'
            })
            .done(function(modalData) {
                createFolder.call(self, modalData.data)
                    .done(function() {
                        self.displayTemporaryAlertBox(
                            {
                                msg: resources.node.successfullyCreated,
                                status: true
                            }
                        );
                        self.channels.views.trigger('refreshContentBrowseView');
                        contentTypeWorker.getAvailableContentTypes()
                            .done(function(availableContentTypes) {
                                self.displayModal(
                                    {
                                        msg: resources.contentType.addContentTypes,
                                        type: 'checkbox',
                                        data: availableContentTypes
                                    })
                                    .done(function(modalData) {
                                        contentTypeWorker
                                            .addContentTypesToFolder(self.model.get('nodeId'), modalData.data)
                                            .done(function() {
                                                self.displayTemporaryAlertBox(
                                                    {
                                                        msg: resources.contentType.contentTypeAdded,
                                                        status: true
                                                    }
                                                );
                                            })
                                            .fail(function(msg) {
                                                self.displayTemporaryAlertBox(
                                                    {
                                                        msg: msg
                                                    }
                                                );
                                            });
                                    })
                                    .always(function() {
                                        navigateBack.call(self);
                                    });
                            });
                    })
                    .fail(function() {
                        self.displayTemporaryAlertBox(
                            {
                                msg: resources.node.errorCreating
                            }
                        );
                    });
            })
            .fail(function() {
                navigateBack.call(self);
            });
    }


    function createFolder(folderName) {
        return nodeWorker.createFolder(this.model.get('nodeId'), folderName);
    }

    function navigateBack(trigger) {
        this.app.router.navigateBack(trigger);
        this.app.router.removeThisRouteFromBreadcrumb();
        this.remove();
    }

});