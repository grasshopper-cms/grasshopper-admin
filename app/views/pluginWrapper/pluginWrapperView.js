/*global define:false*/
define(['grasshopperBaseView', 'pluginWrapperViewConfig', 'plugins', 'underscore'],
    function (GrasshopperBaseView, pluginWrapperViewConfig, plugins, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : pluginWrapperViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function beforeRender() {
            _getPlugin.call(this);
        }

        function afterRender() {
            _handleMultiple.call(this);
        }

        function _getPlugin() {
            var plugin = _.find(plugins.fields, {type : this.model.get('type')});

            this.model.set({
                ViewModule : plugin.view,
                configModule : plugin.config
            });
        }


        function addField() {
            _addPlugin.call(this, undefined);
        }

        function removeField(e, context) {
            this.collection.remove(context.field);
        }

        function _handleMultiple() {
            var values = this.model.get('value'),
                minimum = this.model.get('min'),
                i = 0,
                self = this;

            if(values && _.isArray(values)) { // If values exists and is array
                _.each(values, function(value) {
                    _addPlugin.call(self, value);
                });
            } else if(values !== undefined) { // if values exists
                _addPlugin.call(this, values);
            } else { // if values does not exist and there is a minimum
                while(i < minimum) {
                    _addPlugin.call(self);
                    i++;
                }
            }
        }

        function _addPlugin(value) {
            var model = {
                value : value,
                options : this.model.get('options')
            };

            this.collection.add(model);
        }
    });