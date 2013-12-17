/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker', 'nodeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker, nodeWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.node.enterName,
                    type: 'input'
                })
            .done(function(data) {
                nodeWorker.createFolder(self.model.get('nodeId'), data)
                    .done(function() {
                        self.channels.views.trigger('refreshContentBrowseView');
                        contentTypeWorker.getAvailableContentTypes()
                            .done(function(availableContentTypes) {
                                self.displayModal(
                                        {
                                            msg: resources.contentType.addContentTypes,
                                            type: 'checkbox',
                                            data: availableContentTypes
                                        })
                                    .done(function(data) {
                                        contentTypeWorker.addContentTypesToFolder(self.model.get('nodeId'), data)
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
                    })
                    .always(function() {
                        navigateBack.call(self);
                    });
            })
            .fail(function() {
                navigateBack.call(self);
            });
    }

    function navigateBack(trigger) {
        this.app.router.navigateBack(trigger);
        this.app.router.removeThisRouteFromBreadcrumb();
        this.remove();
    }

});