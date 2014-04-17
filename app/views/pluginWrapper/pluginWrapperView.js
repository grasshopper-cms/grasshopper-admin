/*global define:false*/
define(['grasshopperBaseView', 'pluginWrapperViewConfig', 'underscore', 'require', 'jquery'],
    function (GrasshopperBaseView, pluginWrapperViewConfig, _, require, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : pluginWrapperViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function beforeRender($deferred) {
            _getPlugin.call(this, $deferred);
        }

        function afterRender() {
            _handleMultiple.call(this);
        }

        function _getPlugin($deferred) {
            var self = this;

            require(['plugins'], function(plugins) {
                var plugin = _.find(plugins.fields, {type : self.model.get('type')});

                self.model.set({
                    ViewModule : plugin.view,
                    configModule : plugin.config
                });

                $deferred.resolve();
            });

        }

        function addField() {
            _addPlugin.call(this, undefined);
        }

        function removeField(e, context) {
            this.collection.remove(context.field);
            _evaluateMultiButtons.call(this);
        }

        function _handleMultiple() {
            var values = this.model.get('value'),
                minimum = this.model.get('min'),
                i = 0,
                self = this;

            if (values && _.isArray(values)) { // If values exists and is array
                _.each(values, function (value) {
                    _addPlugin.call(self, value);
                });
            } else if (values) { // if values exists
                _addPlugin.call(this, values);
            } else if (minimum === 0) { // if values does not exist and minimum is zero
                this.collection.setValuesOnParentFieldsObject();
                _evaluateMultiButtons.call(this);
            } else { // if values does not exist and there is a minimum
                _evaluateMultiButtons.call(this);
                while(i < minimum) {
                    _addPlugin.call(self);
                    i++;
                }
            }
        }

        function _addPlugin(value) {
            var model = {
                value : _handleDefaultValue.call(this, value),
                options : this.model.get('options'),
                fieldId : this.model.get('_id')
            };

            this.collection.add(model);
            _initializeSortableMulti.call(this);
            _evaluateMultiButtons.call(this);
        }

        function _handleDefaultValue(value) {
            var defaultValue = this.model.get('defaultValue') || this.model.get('configModule.modelData.value');
            if (_.isUndefined(value)) {
                return defaultValue;
            } else {
                return value;
            }
        }

        function _evaluateMultiButtons() {
            _canShowAdditionButton.call(this);
            _canShowSubtractionButton.call(this);
            _canShowSortableMultiButton.call(this);
        }

        function _canShowAdditionButton() {
            this.model.set('showAdditionButton', this.collection.length < this.model.get('max'));
        }

        function _canShowSubtractionButton() {
            this.model.set('showSubtractionButton', this.collection.length > this.model.get('min'));
        }

        function _canShowSortableMultiButton() {
            this.model.set('showSortableButton', this.model.get('max') > 1 && this.collection.length > 1);
        }

        function _initializeSortableMulti() {
            var $sortable = this.$('#sortableMulti'+ this.model.cid);

            if(this.model.get('max') > 1) {
                $sortable
                    .sortable(
                    {
                        revert : true,
                        handle : '.sortableMultiHandle',
                        axis : 'y',
                        stop : _applyMultiSort.bind(this, $sortable)
                    }
                );
            }
        }

        function _applyMultiSort($sortable) {
            var fields = [],
                elements = {},
                $children = $sortable.children(),
                childLength = $children.length,
                i,
                self = this;

            $sortable.find('.sortableMulti').each(function() {
                fields.push(self.collection.get($(this).attr('modelid')));
            });

            $children.each(function() {
                elements[$(this).attr('sortIndex')] = this;
            });

            for(i = 0; i < childLength; ++i) {
                $sortable.append(elements['sort'+ i]);
            }

            this.collection.reset(fields);
        }
    });