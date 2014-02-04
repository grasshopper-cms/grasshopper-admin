define(['grasshopperModel', 'masseuse', 'resources'], function (Model, masseuse, resources) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            _id : new ComputedProperty(['label'], generateSlug)
        }
    });

    function generateSlug(label) {
        if(label) {
            return label.replace(/ /g,'').toLowerCase();
        }
        return '';
    }
});