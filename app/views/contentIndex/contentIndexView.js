/*global define:false*/
define(['baseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig', 'assetIndexView', 'assetIndexViewConfig', 'underscore'],
    function (BaseView, $, NodeIndexView, nodeIndexViewConfig, AssetIndexView, assetIndexViewConfig, _) {
    'use strict';

    var ContentIndexView = BaseView.extend({
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
    }

    return ContentIndexView;
});