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
                collection = this.model.get('multiCollection');

            model.set(_.omit(_.clone(this.model.attributes), ['value', 'multiCollection']));

            collection.add(model);
            console.log(this);
        }
    });