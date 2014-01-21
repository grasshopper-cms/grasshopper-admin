/*global define:false*/
define(['grasshopperBaseView', 'plugins', 'underscore', 'backbone'],
    function (GrasshopperBaseView, plugins, _, Backbone) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function afterRender() {
            _addPlugin.call(this);
        }

        function addField() {
            console.log('add field');
            _addPlugin.call(this);
        }

        function removeField() {
            var lastChild = _.last(this.children);

            lastChild.remove();
            this.removeChild(lastChild);
        }

        function _addPlugin() {

            var model = new Backbone.Model(),
                collection = this.collection;

            model.set(_.omit(_.clone(this.model.attributes), ['value', 'multiCollection']));

            collection.add(model);
            // TODO: When I walked away. I cannot call the _addField Method. There is some error.
            // It seems like rivets needs to be re-riveted in order for the custom binders to work.
        }
    });