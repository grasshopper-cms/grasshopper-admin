define(['grasshopperModel', 'resources'],
    function (Model, resources) {
        'use strict';

        return Model.extend({
            initialize: function() {
                _generateSlug.call(this, this, this.get('label'));
                this.on('change:label', _generateSlug, this);

                _toggleMultiFieldset.call(this);

                _ensureMaxIsAlwaysGreaterThanOrEqualToMin.call(this);
                this.on('change:min', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);
                this.on('change:max', _ensureMaxIsAlwaysGreaterThanOrEqualToMin, this);
                this.on('change:useAsLabel', _ensureIsRequired, this);
                this.on('change:useAsLabel', _ensureMinMaxIsOne, this);
                this.on('change:required', _ensureIsNotUseAsLabel, this);
            },
            defaults : {
                _id : '',
                useAsLabel : false,
                multi : false,
                resources : resources
            }
        });

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
    });