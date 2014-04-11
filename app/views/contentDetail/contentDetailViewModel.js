define(['grasshopperModel', 'resources', 'constants', 'masseuse'],
    function (Model, resources, constants, masseuse) {
        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            idAttribute : '_id',
            defaults : {
                resources : resources,
                href : new ComputedProperty(['_id'], function (id) {
                    return constants.internalRoutes.contentDetail.replace(':id', id);
                }),
                label : new ComputedProperty(['fields'], function() {
                    return this.get('fields.' + this.get('meta.labelfield'));
                })
            },
            urlRoot : constants.api.content.url
        });
    });