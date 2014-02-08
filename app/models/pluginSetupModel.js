define(['backbone'],
    function (Backbone) {
        'use strict';

        return Backbone.Model.extend({
            initialize: function() {
                _generateSlug.call(this, this, this.get('label'));
                this.on('change:label', _generateSlug, this);

                _toggleMulti.call(this, this);
            },
            defaults : {
                _id : '',
                useAsLabel : false,
                multi : false
            }
        });

        function _generateSlug(model, newValue) {
            if(newValue) {
                model.set('_id', newValue.replace(/ /g,'').toLowerCase());
            }
            return '';
        }

        function _toggleMulti(model) {
            var min = model.get('min'),
                max = model.get('max');

            if (max > 1 || min > 1) {
                model.set('multi', true);
            } else {
                model.set('multi', false);
            }
        }
    });