define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers'],
    function (Model, resources, constants, masseuse, helpers) {
        'use strict';
        var ComputedProperty = masseuse.ComputedProperty,
            validation = helpers.validation;


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
                slug : new ComputedProperty(['label'], _toUnderscore, true),
                labelHasError : new ComputedProperty(['label'], _validatePresence, true)
            },
            urlRoot : constants.api.content.url
        });

        function _toUnderscore(string){
            return string.trim().toLowerCase().replace(/ /g, '_');
        }

        function _validatePresence(string) {
            return !validation.stringHasLength(string);
        }

    });