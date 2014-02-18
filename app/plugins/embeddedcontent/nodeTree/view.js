/*global define:false*/
define(['grasshopperBaseView', 'plugins/embeddedcontent/nodeTree/config', 'underscore'],
    function (GrasshopperBaseView, NodeTreeConfig, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            afterRender : afterRender
        });

        function afterRender() {
            if(_.isNull(this.model.get('parent'))) {
                _fetchChildren.call(this);
            }
        }

        function _fetchChildren() {
            _toggleLoadingSpinner.call(this);
            this.model.get('children').fetch()
                .done(_toggleLoadingSpinner.bind(this));
        }

        function _toggleLoadingSpinner() {
            if(this.model.get('loading')) {
                this.model.set('loading', false);
            } else {
                this.model.set('loading', true);
            }
        }

    });