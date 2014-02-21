/*global define:false*/
define(['grasshopperBaseView', 'plugins/contentreference/nodeTree/config'],
    function (GrasshopperBaseView, NodeTreeConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            afterRender : afterRender,
            openFolder : openFolder,
            sendSelectedContentToParent : sendSelectedContentToParent
        });

        function afterRender() {
            console.log(this);
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

            sendSelectedNodeToParent.call(this);
        }

        function sendSelectedNodeToParent() {
            this.channels.views.trigger('contentReferenceFolderSelected', this.model);
        }


        function sendSelectedContentToParent(e, context) {
            this.channels.views.trigger('contentReferenceSelected', context.item);
        }

    });