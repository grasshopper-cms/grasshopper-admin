define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            min : 0,
            max : 100
        }
    });

});