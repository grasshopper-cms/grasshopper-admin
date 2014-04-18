/*global define:false*/
define(['grasshopperBaseView', 'nodeTreeViewConfig', 'jquery'],
    function (GrasshopperBaseView, NodeTreeViewConfig, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeViewConfig,
            afterRender : afterRender,
            setSelectedNode : setSelectedNode
        });

        function afterRender() {
            _initializeAccordions.call(this);
            _buildSubNodeAccordions.call(this);
            console.log(this.model.get('_id'));
        }

        function _openFolder() {
            var self = this;

            if (!this.model.get('hasFetchedContent')) {
                _toggleLoadingSpinner.call(this);
                _fetchChildContent.call(this)
                    .then(function() {
                        self.$el.foundation();
                        _toggleLoadingSpinner.call(self);
                        self.model.toggle('hasFetchedContent');
                        return true;
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
            var $deferred = new $.Deferred();

            if(this.model.get('inSetup')) {
                $deferred.resolve();
            } else {
                return this.model.get('content').fetch()
                    .done($deferred.resolve);
            }

            return $deferred.promise();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

        function _initializeAccordions() {
            var $accordion = this.$el;

            $accordion
                .accordion(
                {
                    header : '#nodeTreeAccordionHeader' + this.model.cid,
                    icons : {
                        header : 'fa fa-folder',
                        activeHeader : 'fa fa-folder-open'
                    },
                    active : false,
                    collapsible : true,
                    heightStyle : 'content',
                    beforeActivate: _openFolder.bind(this)
                });
        }

        function _buildSubNodeAccordions() {
            _toggleLoadingSpinner.call(this);
            _fetchChildNodes.call(this)
                .done(_toggleLoadingSpinner.bind(this));
        }

    });