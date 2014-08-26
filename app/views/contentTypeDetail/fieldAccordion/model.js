define(['grasshopperModel', 'resources', 'plugins', 'masseuse', 'underscore', 'validationTypes',
        'fieldAccordionValidationCollection', 'helpers'],
    function (Model, resources, plugins, masseuse, _, validationTypes,
              FieldAccordionValidationCollection, helpers) {
        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize: initialize,
            updateValidationRulesOnModel : updateValidationRulesOnModel,
            defaults : function() {
                return {
                    _id : '',
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
            this.on('change:label', _generateSlug, this);

            _toggleMultiFieldset.call(this);

            _ensureMaxIsAlwaysGreaterThanOrEqualToMin.call(this);
            this.on('change:min', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);
            this.on('change:max', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);

            this.get('validationCollection').on('change add remove', this.updateValidationRulesOnModel, this);
        }

        function _generateSlug(model, newValue) {
            if(newValue && !model.get('_id')) {
                model.set('_id', newValue.toLowerCase().trim().replace(/[\s]+/g, '-').replace(/[^-a-zA-Z0-9._~]/g, ''));
            }
            return '';
        }

        function _toggleMultiFieldset() {
            var min = this.get('min'),
                max = this.get('max');

            this.set('multi', (max > 1 || min !== 1));
        }

        function _ensureMaxIsAlwaysGreaterThanOrEqualToMin() {
            var min = this.get('min'),
                max = this.get('max');

            if(max <= min) {
                this.set('max', min);
            }
        }

        function updateValidationRulesOnModel() {
            this.set('validation', helpers.cleanCollection(this.get('validationCollection').toJSON()));
        }
    });
