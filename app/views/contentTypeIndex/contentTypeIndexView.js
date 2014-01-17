/*global define:false*/
define(['grasshopperBaseView', 'contentTypeDetailView', 'contentTypeDetailViewConfig',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html', 'underscore', 'resources'],
    function (GrasshopperBaseView, ContentTypeDetailView, contentTypeDetailViewConfig, rowTemplate, _, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            insertContentTypeDetailRow : insertContentTypeDetailRow
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
                    self.displayAlertBox(
                        {
                            msg : resources.contentType.serverError + ' ' + xhr.responseJSON.message
                        }
                    );
                });
        }

        function insertContentTypeDetailRow (data) {

            var contentTypeDetailView = new ContentTypeDetailView(_.extend({}, contentTypeDetailViewConfig,
                {
                    name : 'contentDetailrow',
                    el : '#contentTypeIndexTable',
                    template : rowTemplate,
                    modelData : data,
                    mastheadButtons : null
                }));
            this.addChild(contentTypeDetailView);
        }

    });