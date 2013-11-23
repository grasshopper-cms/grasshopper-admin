/*global define:false*/
define(['baseView', 'nodeDetailView', 'nodeDetailViewConfig', 'underscore', 'text!views/nodeDetail/_nodeDetailRow.html'], function (BaseView, NodeDetailView, nodeDetailViewConfig, _, nodeDetailRowTemplate) {
    'use strict';

    var nodeIndexView = BaseView.extend({
        beforeRender: beforeRender,
        appendNodeDetailRow : appendNodeDetailRow
    });

    function beforeRender() {
        var self = this;

        // determines if this is the root or not (if it is root then the nodeId will be null)
        if(this.options.nodeId) {
            this.model.url = this.model.url.replace(':id', this.options.nodeId);
            this.options.root = false;
        } else {
            this.model.url = this.model.url.replace(':id', 0);
            this.options.root = true;
        }

        this.model.fetch()
            .done(function() {
                _.each(self.model.attributes, function(node) {
                    if(_.has(node, '_id')) {
                        self.appendNodeDetailRow(node);
                    }
                });
            });
    }

    function appendNodeDetailRow(node) {
        var nodeDetailView = new NodeDetailView(_.extend({}, nodeDetailViewConfig,
            {
                name: 'nodeDetailRow',
                modelData: node,
                el: '#nodeDetailRow',
                templateHtml: nodeDetailRowTemplate,
                mastheadButtons: this.options.mastheadButtons
            }));
        nodeDetailView.start();
    }

    return nodeIndexView;
});
