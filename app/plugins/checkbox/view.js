/*global define:false*/
define(['grasshopperBaseView', 'underscore'],
    function (GrasshopperBaseView, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            addOption : addOption,
            removeOption : removeOption,
            reduceCollection : reduceCollection,
            buildValues : buildValues
        });

        function beforeRender() {
            if(!_.isUndefined(this.model.get('value'))) {
                _hydrateOptionsWithValue.call(this);
            }

            this.collection.reset(this.model.get('options'));
        }

        function addOption() {
            this.collection.add({ _id: '', label: ''});
            this.reduceCollection();
        }

        function removeOption(evt, context) {
            this.collection.remove(context.option);
            this.reduceCollection();
        }

        function reduceCollection() {
            var collection = [];

            this.collection.each(function(model) {
                var option = model.toJSON();
                collection.push(option);
            });
            this.model.set('options', collection);
        }

        function buildValues() {
            var options = this.model.get('options'),
                obj = {};

            _.each(options, function(option) {
                obj[option._id] = !_.isUndefined(option.checked) ? option.checked : false;
            });

            this.model.set('value', obj);
        }

        function _hydrateOptionsWithValue() {
            var options = this.model.get('options'),
                value = this.model.get('value');

            _.each(options, function(option) {
                option.checked = value[option._id];
            });

            this.model.set('options', options);
        }

    });