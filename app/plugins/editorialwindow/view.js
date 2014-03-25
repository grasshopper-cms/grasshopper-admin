/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
//                _startDatePickers.call(this);
            }
            var self = this;
            setInterval(function() {
                console.log(self.model.attributes);
            }, 2000);
        }

//        function _startDatePickers() {
//            var self = this;
//
//            _toggleLoadingSpinner.call(this);
//
//            require(['moment'], function(Moment) {
//                _toggleLoadingSpinner.call(self);
//                _setToTodaysDate.call(self, Moment);
//            });
//        }
//
//        function _toggleLoadingSpinner() {
//            this.model.toggle('loading');
//        }

//        function _splitValue() {
//            if(!_.isUndefined(this.model.get('value'))) {
//                this.model.set('validTo', this.model.get('value.validTo'));
//                this.model.set('validFrom', this.model.get('value.validFrom'));
//            } else {
//                _setToTodaysDate.call(this);
//            }
//        }

//        function _setToTodaysDate(Moment) {
//            var today = Moment().format('YYYY-MM-DDThh:mm:ss');
//
//            this.model.set({
//                validFrom: today,
//                validTo: today
//            });
//        }
//        YYYY-MM-DDThh:mm:ss



//        d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()

    });