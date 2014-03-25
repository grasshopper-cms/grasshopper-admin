/*global define:false*/
define(['grasshopperBaseView', 'underscore'],
    function (GrasshopperBaseView, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender() {
            _splitValue.call(this);
        }

        function _splitValue() {
            if(!_.isUndefined(this.model.get('value'))) {
                this.model.set('validTo', this.model.get('value.validTo'));
                this.model.set('validFrom', this.model.get('value.validFrom'));
            } else {
                _setToTodaysDate.call(this);
            }
        }

        function _setToTodaysDate() {
            var today = new Date();

            this.model.set({
                validFrom: today,
                validTo: today
            });
        }

    });