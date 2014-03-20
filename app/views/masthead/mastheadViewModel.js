define(['grasshopperModel', 'plugins'], function (Model, plugins) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            plugins : plugins.fields
        }
    });

    function initialize() {
        this.on('contentBrowseNodeId', _setNodeId.bind(this));
    }

    function _setNodeId(nodeId) {
        this.set('nodeId', nodeId);
        this.set('inRoot', !nodeId);
    }

});