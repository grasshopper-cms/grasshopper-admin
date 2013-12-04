/*global define:false*/
define(['baseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig', 'assetIndexView', 'assetIndexViewConfig', 'underscore', 'contentIndexView', 'contentIndexViewConfig'],
    function (BaseView, $, NodeIndexView, nodeIndexViewConfig, AssetIndexView, assetIndexViewConfig, _, ContentIndexView, contentIndexViewConfig) {
    'use strict';

    return BaseView.extend({
        afterRender: afterRender,
        addChildIndexViews : addChildIndexViews,
        refreshIndexViews : refreshIndexViews
    });

    function afterRender() {
        //TODO: What is this and what is it doing? maybe it should be moved.
        $(document).foundation('section', 'reflow');

        this.addChildIndexViews();
    }

    function addChildIndexViews() {
        addNodeIndexView.call(this);
        addAssetIndexView.call(this);
        addContentIndexView.call(this);
    }

    function refreshIndexViews() {
        this.refreshChildren();
    }

    function addNodeIndexView() {
        var nodeIndexView = new NodeIndexView(_.extend({}, nodeIndexViewConfig,
            {
                nodeId: this.model.get('nodeId'),
                mastheadButtons: null
            }
        ));
        this.addChild(nodeIndexView);
    }

    function addAssetIndexView() {
        var assetIndexView = new AssetIndexView(_.extend({}, assetIndexViewConfig,
            {
                nodeId: this.model.get('nodeId'),
                mastheadButtons: null
            }
        ));
        this.addChild(assetIndexView);
    }

    function addContentIndexView() {
        if(!this.model.get('nodeId')){
            this.model.set('inRoot', true);
        } else {
            this.model.set('inRoot', false);
            var contentIndexView = new ContentIndexView(_.extend({}, contentIndexViewConfig,
                {
                    nodeId: this.model.get('nodeId'),
                    mastheadButtons: null
                }));
            this.addChild(contentIndexView);
        }
    }
});