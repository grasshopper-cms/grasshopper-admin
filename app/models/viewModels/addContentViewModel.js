define(['grasshopperModel', 'resources', 'constants', 'masseuse'], function (Model, resources, constants, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            fields : {},
            slug : new ComputedProperty(['label'], function(label) {
                return toUnderscore(label);
            }, true)
        },
        urlRoot : constants.api.content.url
    });

    function toUnderscore(string){
        return string.trim().toLowerCase().replace(/ /g, '_');
    }
});