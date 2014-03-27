/*global define:false*/
define(['grasshopperBaseView', 'underscore'],
    function (GrasshopperBaseView, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender() {
            _collectAvailableSluggables.call(this);
            _attachRefreshListenerToParentCollection.call(this);
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

    });