/*global define:false*/
define(['baseView', 'contentTypeDetailView', 'contentTypeDetailViewConfig', 'text!views/contentTypeDetail/_contentTypeDetailRow.html'],
    function (BaseView, ContentTypeDetailView, contentTypeDetailViewConfig, rowTemplate) {
    'use strict';

    return BaseView.extend({
        beforeRender : beforeRender,
        insertContentTypeDetailRow : insertContentTypeDetailRow
    });

    function beforeRender() {
        var self = this;
        this.model.fetch()
            .done(function() {
                self.model.get('results').each(function(data){
                    self.insertContentTypeDetailRow(data);
                });
            })
            .fail(function() {
                this.displayAlertBox('BLAH BLAH BLAH, CONTENT TYPES DID NOT WORK, BLAH BLAH BLAH');
            });
    }

    function insertContentTypeDetailRow(data) {
        console.log(data);

//      var contentTypeDetailView = new ContentTypeDetailView(_.extend({}, contentTypeDetailViewConfig,
//            {
//                name : 'contentDetailrow',
//                el : '#contentTypeIndexTable',
//                templateHtml : rowTemplate,
//                modelData : {
//
//                },
//                mastheadButtons : this.options.mastheadButtons
//            });
//        contentTypeDetailView.start();
    }

});