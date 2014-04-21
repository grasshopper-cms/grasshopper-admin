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
                    var sort = function(a, b) {
                        if (a.label < b.label) { return -1; }
                        if (a.label > b.label) { return  1; }
                        return 0;
                    };
                    _.each(self.model.get('results').sort(sort), function (data) {
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

    });