/*global define:false*/
define(['grasshopperBaseView', 'contentTypeDetailView', 'contentTypeDetailViewConfig', 'text!views/contentTypeDetail/_contentTypeDetailRow.html', 'underscore'],
    function (GrasshopperBaseView, ContentTypeDetailView, contentTypeDetailViewConfig, rowTemplate, _) {
    'use strict';

    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        insertContentTypeDetailRow : insertContentTypeDetailRow
    });

    function beforeRender($deferred) {
        var self = this;
        this.model.fetch()
            .done(function() {
                _.each(self.model.get('results'), function(data){
                    self.insertContentTypeDetailRow(data);
                });
                $deferred.resolve();
            })
            .fail(function() {
                //TODO: Error handling here.
                this.displayAlertBox('BLAH BLAH BLAH, CONTENT TYPES DID NOT WORK, BLAH BLAH BLAH');
            });
    }

    function insertContentTypeDetailRow(data) {

        var contentTypeDetailView = new ContentTypeDetailView(_.extend({}, contentTypeDetailViewConfig,
            {
                name : 'contentDetailrow',
                el : '#contentTypeIndexTable',
                templateHtml : rowTemplate,
                modelData : data,
                mastheadButtons : null
            }));
        this.addChild(contentTypeDetailView);
    }

});