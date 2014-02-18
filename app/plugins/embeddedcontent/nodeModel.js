define(['grasshopperModel', 'resources', 'constants'],
    function (Model, resources, constants) {
        'use strict';

        return Model.extend({
            defaults : {
                resources : resources,
                showTree : false,
                _id : '0'
            },
            urlRoot : constants.api.node.url
        });
    });