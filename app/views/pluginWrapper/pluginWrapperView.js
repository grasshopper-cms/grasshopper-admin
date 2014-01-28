/*global define:false*/
define(['grasshopperBaseView', 'plugins', 'underscore'],
    function (GrasshopperBaseView, plugins, _) {
        'use strict';

        return GrasshopperBaseView.extend({
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
        }

        function _getPlugin() {
            var plugin = _.find(plugins.fields, {type : this.model.get('type')}),
                self = this;

            // TODO: this can probably be some kind of extend.
            self.model.set({
                ViewModule : plugin.view,
                configModule : plugin.config,
                pluginHelpText: plugin.helpText,
                pluginName : plugin.name,
                pluginId : plugin.id
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