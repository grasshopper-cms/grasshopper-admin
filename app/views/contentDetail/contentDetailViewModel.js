define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers', 'underscore', 'jquery', 'backbone'],
    function (Model, resources, constants, masseuse, helpers, _, $, Backbone) {
        'use strict';

        var ComputedProperty = masseuse.ComputedProperty,
            cleanCollection = helpers.cleanCollection;

        return Model.extend({
            idAttribute : '_id',
            defaults : function() {
                return {
                    resources : resources,
                    href : new ComputedProperty(['_id'], function (id) {
                        return constants.internalRoutes.contentDetail.replace(':id', id);
                    }),
                    label : '',
                    fields: {}
                };
            },
            urlRoot : constants.api.content.url,
            toJSON : toJSON,
            parse : parse,
            resetContentLabel : resetContentLabel
        });

        function toJSON() {
            var json = Backbone.Model.prototype.toJSON.apply(this);

            return cleanCollection($.extend(true, {}, _.pick(json, ['fields', 'meta', '_id'])));
        }

        function parse(response, options) {
            if(options.parse === false) {
                return _.omit(response, ['fields']);
            }
            return response;
        }

        function resetContentLabel() {
            if(this.get('isNew')) {
                this.set('label', resources.contentItem.createContent);
            } else {
                this.set('label', this.get('fields.' + this.get('meta.labelfield')));
            }
        }
    });