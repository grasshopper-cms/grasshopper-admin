/*global define:false*/
define(['grasshopperBaseView', 'plugins', 'underscore', 'masseuse'],
    function (GrasshopperBaseView, plugins, _, masseuse) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function beforeRender() {
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
                    appendTo : self.el.getElementById('#field')
                }));

                self.addChild(viewInstance);
            });
        }

        function afterRender() {
            console.log(this.el);
        }

        function addField() {
            console.log('ADDDD FIELD');
            return false;
        }

        function removeField() {
            console.log('REMOVE FIELD');
            return false;
        }
    });