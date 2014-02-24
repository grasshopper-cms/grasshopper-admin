define(['grasshopperModel', 'resources', 'masseuse'], function (Model, resources, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            accordionOpen : false,
            expandArrow : new ComputedProperty(['accordionOpen'], function(status) {
                return status ? 'icon-chevron-down' : 'icon-chevron-right';
            })
        }
    });

});