/*global define:false*/
define(['baseView', 'api', 'constants', 'underscore', 'contentDetailView', 'contentDetailViewConfig', 'text!views/contentDetail/_contentDetailRow.html'],
    function (BaseView, Api, constants, _, ContentDetailView, contentDetailViewConfig, contentDetailRowTemplate) {
    'use strict';

    var contentIndexView = BaseView.extend({
        beforeRender: beforeRender,
        appendContentDetailRow: appendContentDetailRow
    });

    function beforeRender() {
        var self = this;

        Api.makeQuery(
            {
                nodes: this.options.nodeId,
                types: [],
                filters: [],
                options: {
                    fake : true
                }
            })
            .done(function(data) {
                self.model.set('nodeContent', data);
                _.each(data, function(content) {
                    self.appendContentDetailRow(content);
                });
                self.channels.views.trigger('updateContentData', 'itemsCount', _.size(self.model.attributes.nodeContent));
            });
    }

    function appendContentDetailRow(content) {
        var contentDetailView = new ContentDetailView(_.extend({}, contentDetailViewConfig,
            {
                name: 'nodeDetailRow',
                modelData: content,
                el: '#nodeDetailRow',
                templateHtml: contentDetailRowTemplate,
                mastheadButtons: this.options.mastheadButtons
            }));
        contentDetailView.start();
    }

    return contentIndexView;
});