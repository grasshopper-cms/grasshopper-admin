/*global define:false*/
define(['grasshopperBaseView', 'plugins/richtext/nodeTree/config', 'jquery'],
    function (GrasshopperBaseView, NodeTreeConfig, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            afterRender : afterRender,
            openFolder : openFolder
        });

        function afterRender() {
            this.$el.foundation();
        }

        function openFolder() {
            var self = this;

            this.model.toggle('folderOpen');

            if (!this.model.get('hasFetchedContent')) {
                _toggleLoadingSpinner.call(this);
                _fetchChildNodes.call(this)
                    .then(_fetchChildFiles.bind(this))
                    .then(function() {
                        self.$el.foundation();
                        _toggleLoadingSpinner.call(self);
                        self.model.toggle('hasFetchedContent');
                    });
            }

        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _fetchChildFiles() {
            var $deferred = new $.Deferred();

            if (this.model.get('inSetup')) {
                $deferred.resolve();
            } else {
                this.model.get('files').fetch()
                    .done($deferred.resolve);
            }

            return $deferred.promise();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

    });