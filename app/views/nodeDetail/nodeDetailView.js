/*global define:false*/
define(['grasshopperBaseView', 'resources', 'underscore', 'jquery', 'api', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, _, $, Api, contentTypeWorker) {

    return GrasshopperBaseView.extend({
        deleteNode : deleteNode,
        handleRowClick : handleRowClick,
        editNode : editNode
    });

    function deleteNode() {
        var self = this;

        this.displayModal(resources.node.deletionWarning)
            .done(function() {
                self.model.destroy(
                    {
                        success: function(model) {
                            self.remove();
                            self.displayTemporaryAlertBox(resources.node.successfullyDeletedPre + model.get('label') + resources.node.successfullyDeletedPost, true);
                        },
                        error: function(model) {
                            self.displayAlertBox(resources.node.errorDeleted + model.get('label'));
                        }
                    });
            });
    }

    function handleRowClick() {
        this.app.router.navigateTrigger(this.model.get('href'));
    }

    function editNode() {
        var self = this;

        this.displayModal(resources.node.editName, 'input', this.model.get('label'))
            .done(function(data) {
                self.model.set('label', data);
                self.model.save()
                    .done(function() {
                        console.log('the model saved');
                    })
                    .fail(function() {
                        console.log('the model did not save');
                    })
                    .always(function() {
                        contentTypeWorker.getAvailableContentTypes(self.model.get('allowedTypes'))
                            .done(function(availableContentTypes) {
                                self.displayModal(resources.contentType.editContentTypes, 'checkbox', availableContentTypes)
                                    .done(function(data) {
                                        contentTypeWorker.addContentTypesToFolder(self.model.get('_id'), data)
                                            .done(function () {
                                                console.log('it  worked!');
                                            })
                                            .fail(function() {
                                                console.log('it did not work');
                                            });
                                    });
                            });
                    });
            });
    }



});

