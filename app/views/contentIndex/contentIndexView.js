/*global define:false*/
define(['baseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig'], function (BaseView, $, NodeIndexView, nodeIndexViewConfig) {
    'use strict';

    var ContentIndexView = BaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {
        //TODO: What is this and what is it doing? maybe it should be moved.
        $(document).foundation('section', 'reflow');

        var nodeIndexView = new NodeIndexView(nodeIndexViewConfig);
        nodeIndexView.start();
    }

    return ContentIndexView;
});