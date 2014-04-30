/*global define:false*/
define(['grasshopperBaseView', 'contentTypeIndexViewConfig', 'contentTypeDetailView',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'underscore', 'resources', 'constants'],
    function (GrasshopperBaseView, contentTypeIndexViewConfig, ContentTypeDetailView,
              rowTemplate,
              _, resources, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentTypeIndexViewConfig,
            beforeRender : beforeRender,
            insertContentTypeDetailRow : insertContentTypeDetailRow,
            newContentType : newContentType
        });

        function beforeRender ($deferred) {
            var self = this;
            this.model.fetch()
                .done(function () {
                    _.each(self.model.get('results'), function (data) {
                        self.insertContentTypeDetailRow(data);
                    });
                    $deferred.resolve();
                })
                .fail(function (xhr) {
                    self.fireErrorModal(resources.contentType.serverError + ' ' + xhr.responseJSON.message);
                });
        }

        function insertContentTypeDetailRow (data) {

            var contentTypeDetailView = new ContentTypeDetailView({
                    name : 'contentDetailrow',
                    appendTo : '#contentTypeIndexTable',
                    wrapper : false,
                    template : rowTemplate,
                    modelData : data,
                    mastheadButtons : null
                });
            this.addChild(contentTypeDetailView);
        }

        function newContentType() {
            this.app.router.navigateTrigger(constants.internalRoutes.newContentType);
        }

    });