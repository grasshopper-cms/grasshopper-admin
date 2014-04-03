define(['grasshopperModel', 'resources', 'plugins', 'masseuse', 'underscore', 'validationTypes',
        'fieldAccordionValidationCollection'],
    function (Model, resources, plugins, masseuse, _, validationTypes,
              FieldAccordionValidationCollection) {
        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize: initialize,
            updateValidationRulesOnModel : updateValidationRulesOnModel,
            defaults : function() {
                return {
                    _id : '',
                    useAsLabel : false,
                    multi : false,
                    resources : resources,
                    plugins : plugins.fields,
                    validation : [],
                    validationCollection : new FieldAccordionValidationCollection(),
                    hasValidation : false,
                    validationTypes : validationTypes,
                    dataType : new ComputedProperty(['type'], function(type) {
                        if(type) {
                            return _.findWhere(this.get('plugins'), { type : type }).config.modelData.dataType;
                        }
                    })
                };
            }
        });

        function initialize() {
            _generateSlug.call(this, this, this.get('label'));
            this.on('change:label', _generateSlug, this);

            _toggleMultiFieldset.call(this);

            _ensureMaxIsAlwaysGreaterThanOrEqualToMin.call(this);
            this.on('change:min', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);
            this.on('change:max', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);
            this.on('change:useAsLabel', _ensureIsRequired, this);
            this.on('change:useAsLabel', _ensureMinMaxIsOne, this);
            this.on('change:required', _ensureIsNotUseAsLabel, this);

            this.get('validationCollection').on('change add remove', this.updateValidationRulesOnModel, this);
        }

        function _generateSlug(model, newValue) {
            if(newValue) {
                model.set('_id', newValue.replace(/ /g,'').toLowerCase());
            }
            return '';
        }

        function _toggleMultiFieldset() {
            var min = this.get('min'),
                max = this.get('max');

            this.set('multi', (max > 1 || min > 1));
        }

        function _ensureMaxIsAlwaysGreaterThanOrEqualToMin() {
            var min = this.get('min'),
                max = this.get('max');

            if(max <= min) {
                this.set('max', min);
            }
        }

        function _ensureIsRequired() {
            if(this.get('useAsLabel')) {
                this.set('required', true);
            }
        }

        function _ensureMinMaxIsOne() {
            if(this.get('useAsLabel')) {
                this.set('min', 1);
                this.set('max', 1);
            }
        }

        function _ensureIsNotUseAsLabel() {
            if(this.get('useAsLabel')) {
                this.set('required', true);
            }
        }

        function updateValidationRulesOnModel() {
            this.set('validation', this.get('validationCollection').toJSON());
        }
    });