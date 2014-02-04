/*global define:false*/
define(['grasshopperBaseView', 'contentTypeIndexViewConfig', 'contentTypeDetailView',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'underscore', 'resources'],
    function (GrasshopperBaseView, contentTypeIndexViewConfig, ContentTypeDetailView,
              rowTemplate,
              _, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentTypeIndexViewConfig,
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

    });