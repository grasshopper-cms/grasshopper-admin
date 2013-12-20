/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            if (this.model.get('nodeId') !== '0') {
                handleCreateContent.call(this, $deferred);
            } else {
                createContentInRoot.call(this, $deferred);
            }
        }

        function handleCreateContent ($deferred) {
            var self = this;
            contentTypeWorker.getNodesContentTypes(this.model.get('nodeId'))
                .done(function (data) {
                    // TODO: Remove this stub when the API Works.
                    data = resources.dummyContentTypeData;
                    self.displayModal(
                        {
                            msg : resources.contentType.selectContentType,
                            data : data,
                            type : 'radio'
                        })
                        .done(function (modalData) {
                            self.model.set('contentTypeId', modalData.selectedType);
                            $deferred.resolve();
                        })
                        .fail(function () {
                            $deferred.reject();
                            navigateBack.call(self);
                        });
                })
                .fail(function (data) {
                    $deferred.reject();
                    console.log(data);
                });
        }

        function createContentInRoot ($deferred) {
            var self = this;
            this.displayModal(
                {
                    msg : resources.contentType.contentInRoot
                })
                .always(function () {
                    $deferred.reject();
                    navigateBack.call(self);
                });
        }

        function navigateBack (trigger) {
            this.app.router.navigateBack(trigger);
            this.app.router.removeThisRouteFromBreadcrumb();
        }

    });