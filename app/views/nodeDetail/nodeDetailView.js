/*global define:false*/
define(['baseView', 'resources', 'underscore', 'jquery', 'api'], function (BaseView, resources, _, $, Api) {

    return BaseView.extend({
        deleteNode : deleteNode,
        handleRowClick : handleRowClick,
        editNode : editNode,
        addContentTypesToFolder : addContentTypesToFolder
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

        console.log(this.model);

        this.displayModal('Edit Folder name:', 'input', this.model.get('label'))
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
                        self.displayModal('Edit allowed Content Types', 'addContent', self.model.get('allowedTypes'))
                            .done(function(data) {
                                self.addContentTypesToFolder(data)
                                    .done(function () {
                                        console.log('it  worked!');
                                    })
                                    .fail(function() {
                                        console.log('it did not work');
                                    });
                            });
                    });
            });
    }

    function addContentTypesToFolder(data) {
        var contentTypes = [],
            $deferred = new $.Deferred();

        _.each(data.results, function(contentType) {
            if(contentType.checked) {
                contentTypes.push(
                    {
                        id: contentType._id
                    }
                );
            }
        });

        Api.addContentTypesToNode(this.model.get('parent')._id, contentTypes)
            .done(function() {
                $deferred.resolve();
            })
            .fail(function(xhr) {
                $deferred.reject(xhr.responseJSON.message);
            });

        return $deferred.promise();
    }

});

