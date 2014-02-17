define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            showTree : false,
            _id : '0'
        }
    });

});