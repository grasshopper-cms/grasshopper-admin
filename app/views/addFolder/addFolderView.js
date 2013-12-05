/*global define:false*/
define(['baseView', 'resources', 'contentTypeWorker', 'nodeWorker'],
    function (BaseView, resources, contentTypeWorker, nodeWorker) {
    'use strict';

    return BaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(resources.node.enterName, 'input')
            .done(function(data) {
                nodeWorker.createFolder(self.model.get('nodeId'), data)
                    .done(function() {
                        self.channels.views.trigger('refreshContentBrowseView');
                        contentTypeWorker.getAvailableContentTypes()
                            .done(function(availableContentTypes) {
                                self.displayModal(resources.contentType.addContentTypes, 'checkbox', availableContentTypes)
                                    .done(function(data) {
                                        contentTypeWorker.addContentTypesToFolder(self.model.get('nodeId'), data)
                                            .done(function() {
                                                self.displayTemporaryAlertBox(resources.contentType.contentTypeAdded, true);
                                            })
                                            .fail(function(msg) {
                                                self.displayTemporaryAlertBox(msg);
                                            });
                                    })
                                    .always(function() {
                                        self.navigateBack();
                                    });
                            });
                    })
                    .fail(function() {
                        self.displayTemporaryAlertBox(resources.node.errorCreating);
                    })
                    .always(function() {
                        self.navigateBack();
                    });
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
    }

});