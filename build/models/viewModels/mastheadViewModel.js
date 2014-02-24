define(['grasshopperModel', 'plugins', 'masseuse'], function (Model, plugins, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
            plugins : plugins.fields,
            inRoot : new ComputedProperty(['nodeId'], _toggleBoolean)
        }
    });

    function initialize() {
        this.on('contentBrowseNodeId', _setNodeId.bind(this));
    }

    function _setNodeId(nodeId) {
        this.set('nodeId', nodeId);
    }

    function _toggleBoolean(nodeId) {
        return !nodeId ? true : false;
    }

});