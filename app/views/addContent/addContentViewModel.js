define(['grasshopperModel', 'resources', 'constants'],
    function (GrasshopperModel, resources, constants) {
    'use strict';

    return GrasshopperModel.extend({
        defaults : {
            resources : resources,
            fields : null
        },
        urlRoot : constants.api.content.url
    });

});