/*global define:false*/
define(['grasshopperBaseView', 'plugins', 'underscore', 'masseuse'],
    function (GrasshopperBaseView, plugins, _, masseuse) {
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
            _addPlugin.call(this);
        }

        function removeField() {
            var lastChild = _.last(this.children);

            lastChild.remove();
            this.removeChild(lastChild);
        }

        function _addPlugin() {
            var plugin = _.find(plugins.fields, {type : this.model.get('type')}),
                self = this;

            require([plugin.view, plugin.config], function(ViewModule, configModule) {

                var viewInstance = new ViewModule(_.extend({}, configModule, {
                    modelData : {
                        value: masseuse.ProxyProperty('value', self.model),
                        label: self.model.get('label'),
                        _id: self.model.get('_id'),
                        type: self.model.get('type'),
                        required : self.model.get('required')
                    },
                    appendTo : self.$el.find('#field')
                }));

                self.addChild(viewInstance);
                viewInstance.start();
            });
        }
    });