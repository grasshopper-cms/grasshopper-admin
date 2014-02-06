define(['backbone'],
    function (Backbone) {
        'use strict';

        return Backbone.Model.extend({
            initialize: function() {
                _generateSlug.call(this, this, this.get('label'));
                this.on('change:label', _generateSlug, this);
            },
            defaults : {
                _id : '',
                useAsLabel : false
            }
        });

        function _generateSlug(model, newValue) {
            if(newValue) {
                model.set('_id', newValue.replace(/ /g,'').toLowerCase());
            }
            return '';
        }

    });