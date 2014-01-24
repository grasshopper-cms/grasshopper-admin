/*global define:false*/
define(['grasshopperBaseView', 'plugins', 'underscore', 'backbone', 'require'],
    function (GrasshopperBaseView, plugins, _, Backbone, require) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function beforeRender($deferred) {
            _getPlugin.call(this, $deferred);
        }

        function afterRender() {
            _handleMulti.call(this);
        }

        function _getPlugin($deferred) {
            var plugin = _.find(plugins.fields, {type : this.model.get('type')}),
                self = this;

            require([plugin.view, plugin.config], function(ViewModule, configModule) {
                self.model.set({
                    ViewModule : ViewModule,
                    configModule : configModule
                });
                $deferred.resolve();
            });
        }


        function addField() {
            _addPlugin.call(this, undefined);
        }

        function removeField(e, context) {
            this.collection.remove(context.field);
        }

        function _handleMulti() {
            var values = this.model.get('value'),
                self = this;

            if(values && values instanceof Array) {
                _.each(values, function(value) {
                    _addPlugin.call(self, value);
                });
            } else {
                _addPlugin.call(this, values);
            }
        }

        function _addPlugin(value) {
            var model = _.extend({} , _.omit(this.model.attributes, ['value', 'multiCollection', 'viewId']), {
                value : value
            });

            this.collection.add(model);
        }
    });