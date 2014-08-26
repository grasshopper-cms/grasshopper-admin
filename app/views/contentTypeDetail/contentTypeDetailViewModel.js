define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'plugins', 'underscore'],
    function (GrasshopperModel, resources, constants, masseuse, plugins, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return GrasshopperModel.extend({
        idAttribute : '_id',
        defaults : {
            resources : resources,
            plugins : plugins.fields,
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.contentTypes + '/' + id;
            }),
            saving : false
        },
        toJSON : toJSON,
        validate : validate,
        isFirstFieldDataTypeAString : isFirstFieldDataTypeAString,
        urlRoot : constants.api.contentTypes.url
    });

    function toJSON() {
        var json = GrasshopperModel.prototype.toJSON.apply(this);

        return _.omit(json, []);
    }

    function validate(attrs) {
        var err;


        if(_.isEmpty(attrs.label)) {
            err = resources.contentType.validation.mustHaveLabel;
        }

        if(!err) {
            _.each(attrs.fields, function(field) {
                if(_.isEmpty(field.label)) { // field name presence
                    err = resources.contentType.validation.fieldsMustHaveLabel;
                }
                if(_.isEmpty(field._id)) { // field id presence
                    err = resources.contentType.validation.fieldsMustHaveIds;
                }
                if(_.where(attrs.fields, {_id: field._id}).length > 1) { // uniqueness
                    err = resources.contentType.validation.fieldsMustBeUnique;
                }
            });
        }


        if(err) {
            return err;
        }
    }

    function isFirstFieldDataTypeAString() {
        var firstFieldType = _.first(this.attributes.fields).type,
            thisPluginConfig = _.findWhere(plugins.fields, { type : firstFieldType }).config,
            modelData = _.result(thisPluginConfig, 'modelData');

        return modelData.dataType === 'string';
    }
});
