define(['grasshopperModel', 'plugins'], function (Model, plugins) {
    'use strict';
    return Model.extend({
        defaults : {
            plugins : plugins.fields
        }
    });
});