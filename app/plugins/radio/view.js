/*global define:false*/
define(['pluginBaseView', 'underscore', 'plugins/radio/optionsCollection'],
    function (PluginBaseView, _, OptionsCollection) {
        'use strict';

        return PluginBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender,
            addOption : addOption,
            removeOption : removeOption,
            reduceOptions : reduceOptions,
            reduceValues : reduceValues,
            onlyCheckThisOne : onlyCheckThisOne
        });

        function beforeRender($deferred) {
            this.collection = new OptionsCollection(this.model.get('options'));

            if(this.model.get('inSetup')) {
                _addSetupListeners.call(this);
            } else {
                _addNormalEventListeners.call(this);
            }

            _.defer($deferred.resolve);
        }

        function afterRender() {
            var hasDefaultCheckedIndex;

            if(this.model.get('value')) {
                this.collection.hydrateOptionsWithValues(this.model.get('value'));
            } else {
                this.reduceValues();
            }

            if(this.model.get('options')) {
                hasDefaultCheckedIndex = this.collection.indexOf(this.collection.findWhere({ isDefault: true }));
                hasDefaultCheckedIndex >= 0 && this.$el.find('.isDefaultRadio')[hasDefaultCheckedIndex].click();
            }
        }

        function addOption() {
            this.collection.add({ _id: '', label: '', isDefault : false});
        }

        function removeOption(evt, context) {
            this.collection.remove(context.option);
        }

        function reduceOptions() {
            this.model.set('options', this.collection.reduceOptions());
        }

        function reduceValues() {
            this.model.set('value', this.collection.reduceValues());
        }

        function _addSetupListeners() {
            this.collection.on('all', this.reduceOptions.bind(this));
        }

        function _addNormalEventListeners() {
            this.collection.on('all', this.reduceValues.bind(this));
        }

        function onlyCheckThisOne(event, context) {
            this.collection.each(function(option) {
                option.set('isDefault', option === context.option);
            });
        }

    });
