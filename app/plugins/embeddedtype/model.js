define(['grasshopperModel', 'resources', 'constants'], function (Model, resources, constants) {
    'use strict';

    return Model.extend({
        idAttribute : 'options',
        defaults : function() {
            return {
                resources : resources,
                accordionLabel : '',
                fields : {},
                value : {},
                availableContentTypes : null,
                activeContentType : null,
                invalidContentType : null
            };
        },
        urlRoot : constants.api.contentTypes.url
    });

});
