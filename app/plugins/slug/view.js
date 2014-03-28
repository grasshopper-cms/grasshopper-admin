/*global define:false*/
define(['grasshopperBaseView', 'underscore'],
    function (GrasshopperBaseView, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            calculateSlug : calculateSlug,
            askAddContentViewForFields : askAddContentViewForFields
        });

        function afterRender() {
            if(this.model.get('inSetup')) {
                _collectAvailableSluggables.call(this);
                _attachRefreshListenerToParentCollection.call(this);
            } else {
                this.channels.views.once('contentFieldsChange', calculateSlug, this);
            }
        }

        function _collectAvailableSluggables() {
            var allStringFields = this.parent.collection.where({ dataType : 'string' }),
                allSluggableFields = _.filter(allStringFields, function(model) {
                    return model.get('type') !== 'slug';
                });

            this.model.get('possibleFieldsToSlug').reset(allSluggableFields);
        }

        function _attachRefreshListenerToParentCollection() {
            this.parent.collection.on('add remove reset change', _collectAvailableSluggables.bind(this));
        }

        function calculateSlug(fields) {
            var fieldId = this.model.get('options'),
                fieldValue = fields[fieldId];

            this.model.set('value', fieldValue);
        }

        function askAddContentViewForFields() {
            this.channels.views.trigger('returnFields');
        }

    });