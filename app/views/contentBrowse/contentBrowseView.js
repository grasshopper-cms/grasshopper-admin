/*global define:false*/
define(['baseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig', 'assetIndexView', 'assetIndexViewConfig', 'underscore', 'contentIndexView', 'contentIndexViewConfig'],
    function (BaseView, $, NodeIndexView, nodeIndexViewConfig, AssetIndexView, assetIndexViewConfig, _, ContentIndexView, contentIndexViewConfig) {
    'use strict';

    return BaseView.extend({
        afterRender: afterRender,
        startIndexViews : startIndexViews,
        startNodeIndexView : startNodeIndexView,
        startAssetIndexView : startAssetIndexView,
        startContentIndexView : startContentIndexView,
        refreshIndexViews : refreshIndexViews
    });

    function afterRender() {
        //TODO: What is this and what is it doing? maybe it should be moved.
        $(document).foundation('section', 'reflow');

        this.startIndexViews();
    }

    function startIndexViews() {
        this.startNodeIndexView();
        this.startAssetIndexView();
        this.startContentIndexView();
    }

    function refreshIndexViews() {
        // TODO: Does emptying they el that contains the Backbone view actually delete the View? If not, then there would be a memory leak here.
        $('#nodeIndex').empty();
        $('#assetIndex').empty();
        this.startIndexViews();
    }

    function startNodeIndexView() {
        var nodeIndexView = new NodeIndexView(_.extend({}, nodeIndexViewConfig,
            {
                nodeId: this.model.get('nodeId'),
                mastheadButtons: null
            }
        ));
        nodeIndexView.start();
    }

    function startAssetIndexView() {
        var assetIndexView = new AssetIndexView(_.extend({}, assetIndexViewConfig,
            {
                nodeId: this.model.get('nodeId'),
                mastheadButtons: null
            }
        ));
        assetIndexView.start();
    }

    function startContentIndexView() {
        if(!this.model.get('nodeId')){
            this.model.set('inRoot', true);
        } else {
            this.model.set('inRoot', false);
            var contentIndexView = new ContentIndexView(_.extend({}, contentIndexViewConfig,
                {
                    nodeId: this.model.get('nodeId'),
                    mastheadButtons: null
                }));
            contentIndexView.start();
        }
    }
});