define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers', 'underscore'],
    function (Model, resources, constants, masseuse, helpers, _) {
        'use strict';

        var ComputedProperty = masseuse.ComputedProperty,
            cleanCollection = helpers.cleanCollection;

        return Model.extend({
            idAttribute : '_id',
            defaults : {
                resources : resources,
                href : new ComputedProperty(['_id'], function (id) {
                    return constants.internalRoutes.contentDetail.replace(':id', id);
                }),
                label : new ComputedProperty(['fields'], function() {
                    if(this.get('isNew')) {
                        return resources.contentItem.createContent;
                    }
                    return this.get('fields.' + this.get('meta.labelfield'));
                })
            },
            urlRoot : constants.api.content.url,
            toJSON : toJSON
        });

        function toJSON() {
            return cleanCollection(_.pick(this.attributes, ['fields', 'meta', '_id']));
        }
    });