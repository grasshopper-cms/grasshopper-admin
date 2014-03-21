define(['grasshopperModel'], function (Model) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {}
    });

    function initialize() {
        this.on('contentBrowseNodeId', _setNodeId.bind(this));
    }

    function _setNodeId(nodeId) {
        this.set('nodeId', nodeId);
        this.set('inRoot', !nodeId);
    }

});