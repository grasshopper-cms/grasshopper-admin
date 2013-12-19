/*global define:false*/
define(['grasshopperBaseView', 'resources', 'underscore', 'jquery', 'api', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, _, $, Api, contentTypeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            deleteNode : deleteNode,
            handleRowClick : handleRowClick,
            editNode : editNode
        });

        function deleteNode () {
            var self = this;

            this.displayModal(
                {
                    msg : resources.node.deletionWarning
                })
                .done(function () {
                    self.model.destroy()
                        .done(function () {
                            self.displayTemporaryAlertBox(
                                {
                                    msg : resources.node.successfullyDeletedPre + self.model.get('label') +
                                        resources.node.successfullyDeletedPost,
                                    status : true
                                }
                            );
                            self.remove();
                        })
                        .fail(function () {
                            self.displayAlertBox(
                                {
                                    msg : resources.node.errorDeleted + self.model.get('label')
                                }
                            );
                        });
                });
        }

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
        }

        function editNode () {
            var self = this;

            this.displayModal(
                {
                    msg : resources.node.editName,
                    type : 'input',
                    data : this.model.get('label')
                })
                .done(function (modalData) {
                    self.model.set('label', modalData.data);
                    self.model.save()
                        .done(function () {
                            self.displayTemporaryAlertBox(
                                {
                                    msg : resources.node.successfullyUpdated,
                                    status : true
                                }
                            );
                            contentTypeWorker.getAvailableContentTypes(self.model.get('allowedTypes'))
                                .done(function (availableContentTypes) {
                                    self.displayModal(
                                        {
                                            msg : resources.contentType.editContentTypes,
                                            type : 'checkbox',
                                            data : availableContentTypes
                                        })
                                        .done(function (modalData) {
                                            contentTypeWorker.addContentTypesToFolder(self.model.get('_id'),
                                                    modalData.data)
                                                .done(function () {
                                                    self.displayTemporaryAlertBox(
                                                        {
                                                            msg : resources.contentType.contentTypeAdded,
                                                            status : true
                                                        }
                                                    );
                                                })
                                                .fail(function (msg) {
                                                    self.displayAlertBox(
                                                        {
                                                            msg : msg
                                                        }
                                                    );
                                                });
                                        });
                                });
                        })
                        .fail(function () {
                            self.displayAlertBox(
                                {
                                    msg : resources.node.errorUpdated
                                }
                            );
                        });
                });
        }
    });