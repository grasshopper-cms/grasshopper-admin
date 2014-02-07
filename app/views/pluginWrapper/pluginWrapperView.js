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
            _handleMulti.call(this);
            console.log(this);
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

        function _handleMulti() {
            var values = this.model.get('value'),
                self = this;

            if(values && _.isArray(values)) {
                _.each(values, function(value) {
                    _addPlugin.call(self, value);
                });
            } else {
                _addPlugin.call(this, values);
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