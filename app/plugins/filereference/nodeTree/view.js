/*global define:false*/
define(['grasshopperBaseView', 'plugins/filereference/nodeTree/config'],
    function (GrasshopperBaseView, NodeTreeConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            openFolder : openFolder,
            setSelectedNode : setSelectedNode
        });

        function openFolder() {
            var self = this;

            this.model.toggle('folderOpen');

            if (!this.model.get('hasFetchedContent')) {
                _toggleLoadingSpinner.call(this);
                _fetchChildNodes.call(this)
                    .then(_fetchChildContent.bind(this))
                    .then(function() {
                        self.$el.foundation();
                        _toggleLoadingSpinner.call(self);
                        self.model.toggle('hasFetchedContent');
                    });
            }

            _sendSelectedNodeToParent.call(this);
        }

        function _sendSelectedNodeToParent() {
            this.parent.setSelectedNode(null, this.model.toJSON());
            this.model.set('selectedNode', this.model.get('_id'));
        }

        function setSelectedNode(doNotUse, selectedNode) {
            this.parent.setSelectedNode(null, selectedNode);
        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _fetchChildContent() {
            return this.model.get('content').fetch();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

    });