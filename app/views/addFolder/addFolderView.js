/*global define:false*/
define(['baseView', 'api', 'jquery', 'resources', 'underscore'],
    function (BaseView, Api, $, resources, _) {
    'use strict';

    return BaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack,
        createFolder : createFolder,
        addContentTypesToFolder : addContentTypesToFolder
    });

    function afterRender() {
        var self = this;

        this.displayModal(resources.node.create.enterName, 'input')
            .done(function(data) {
                self.createFolder(data)
                    .done(function() {
                        self.channels.views.trigger('refreshContentBrowseView');
                        self.displayModal('Add Content Types: ', 'addContent')
                            .done(function(data) {
                                self.addContentTypesToFolder(data)
                                    .done(function() {
                                        self.displayTemporaryAlertBox('Content Type Added', true);
                                    })
                                    .fail(function(msg) {
                                        self.displayTemporaryAlertBox(msg);
                                    });
                            })
                            .always(function() {
                                self.navigateBack();
                            });
                    })
                    .fail(function() {
                        self.displayTemporaryAlertBox('folder could not be added');
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

    function createFolder(folderName) {
        var $deferred = new $.Deferred(),
            data = {
                label : folderName,
                // TODO: Slug is no longer working, double check with Travis regarding API updates.
//                slug : folderName,
                parent : this.model.get('nodeId')
            };

        Api.postFolder(data)
            .done(function() {
                $deferred.resolve();
            })
            .fail(function() {
                $deferred.reject();
            });

        return $deferred.promise();
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

        Api.addContentTypesToNode(this.model.get('nodeId'), contentTypes)
            .done(function() {
                $deferred.resolve();
            })
            .fail(function(xhr) {
                $deferred.reject(xhr.responseJSON.message);
            });

        return $deferred.promise();
    }

});