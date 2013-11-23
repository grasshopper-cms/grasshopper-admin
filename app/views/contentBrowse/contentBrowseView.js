/*global define:false*/
define(['baseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig', 'assetIndexView', 'assetIndexViewConfig', 'underscore', 'contentIndexView', 'contentIndexViewConfig'],
    function (BaseView, $, NodeIndexView, nodeIndexViewConfig, AssetIndexView, assetIndexViewConfig, _, ContentIndexView, contentIndexViewConfig) {
    'use strict';

    var ContentBrowseView = BaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {
        //TODO: What is this and what is it doing? maybe it should be moved.
        $(document).foundation('section', 'reflow');

        var nodeIndexView = new NodeIndexView(_.extend({}, nodeIndexViewConfig,
                {
                    nodeId: this.model.get('nodeId'),
                    mastheadButtons: this.options.mastheadButtons
                }
             ));
        nodeIndexView.start();

        var assetIndexView = new AssetIndexView(_.extend({}, assetIndexViewConfig,
                {
                    nodeId: this.model.get('nodeId'),
                    mastheadButtons: this.options.mastheadButtons
                }
            ));
        assetIndexView.start();

        if(!this.model.get('nodeId')){
            this.model.set('inRoot', true);
        } else {
            this.model.set('inRoot', false);
            var contentIndexView = new ContentIndexView(_.extend({}, contentIndexViewConfig,
                {
                    nodeId: this.model.get('nodeId'),
                    mastheadButtons: this.options.mastheadButtons
                }));
            contentIndexView.start();
        }
    }

    return ContentBrowseView;
});