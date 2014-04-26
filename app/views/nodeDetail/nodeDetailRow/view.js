define(['nodeDetailView', 'nodeDetailRowConfig'], function(NodeDetailView, nodeDetailRowConfig) {
    'use strict';

    return NodeDetailView.extend({
        defaultOptions : nodeDetailRowConfig
    });

});