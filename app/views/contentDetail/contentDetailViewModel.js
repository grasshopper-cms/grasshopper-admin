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
                label : ''
            },
            urlRoot : constants.api.content.url,
            toJSON : toJSON,
            resetContentLabel : resetContentLabel
        });

        function toJSON() {
            return cleanCollection(_.pick(this.attributes, ['fields', 'meta', '_id']));
        }

        function resetContentLabel() {
            if(this.get('isNew')) {
                this.set('label', resources.contentItem.createContent);
            } else {
                this.set('label', this.get('fields.' + this.get('meta.labelfield')));
            }
        }
    });