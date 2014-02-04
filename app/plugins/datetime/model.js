define(['grasshopperModel', 'resources', 'masseuse'], function (Model, resources, masseuse) {
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