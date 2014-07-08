/*global define:false*/
define(['grasshopperBaseView', 'moment', 'jquery', 'datetimepicker'],
    function (GrasshopperBaseView, moment, $, datetimepicker) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender: afterRender,
            setValidFromToNow: setValidFromToNow,
            setValidToToNow: setValidToToNow,
            setValidToNeverExpire: setValidToNeverExpire
        });

        function beforeRender () {
            Date.parseDate = function (input, format) {
                return moment(input, format).toDate();
            };

            Date.prototype.dateFormat = function (format) {
                return moment(this).format(format);
            };
        }

        function afterRender ($deferred) {
            setTimeout(_addDateTimePickers.bind(this, $deferred), 100);
        }

        function _addDateTimePickers ($deferred) {
            this.$el.find('.datetimepicker').each(function () {
                $(this).datetimepicker({
                    startDate : moment(),
                    format: 'YYYY/MM/DD h:mm a',
                    formatTime: 'h:mm a',
                    formatDate: 'YYYY/MM/DD'
                });
            });
            $deferred.resolve();
        }

        function setValidFromToNow () {
            this.model.set('value.validFrom', moment());
        }

        function setValidToToNow () {
            this.model.set('value.validTo', moment());
        }

        function setValidToNeverExpire () {
            this.model.set('value.validTo', moment('December 31 3000'));
        }

    });