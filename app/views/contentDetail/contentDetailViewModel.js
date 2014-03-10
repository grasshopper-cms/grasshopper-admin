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
                statusClass : new ComputedProperty(['status'], function (status) {
                    return (status != 'Live') ? 'inactive' : '';
                }),
                slug : new ComputedProperty(['label'], _toUnderscore, true)
            },
            urlRoot : constants.api.content.url
        });

        function _toUnderscore(string){
            return string.trim().toLowerCase().replace(/ /g, '_');
        }

    });