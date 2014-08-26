/*global define:false*/
define(['pluginBaseView', 'moment', 'jquery', 'datetimepicker', 'resources'],
    function (PluginBaseView, moment, $, datetimepicker, resources) {
        'use strict';

        return PluginBaseView.extend({
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
                    timepicker : true,
                    formatTime: 'h:mm a',
                    /*formatDate: 'YYYY/MM/DD',*/
                    format: resources.plugins.editorialWindow.dateFormat,
                    step: 1
                });
            });
            $deferred.resolve();
        }

        function setValidFromToNow () {
            this.model.set('value.validFrom', moment().format(resources.plugins.editorialWindow.dateFormat));
        }

        function setValidToToNow () {
            this.model.set('value.validTo', moment().format(resources.plugins.editorialWindow.dateFormat));
        }

        function setValidToNeverExpire () {
            this.model.set('value.validTo', moment('December 31 3000').format(resources.plugins.editorialWindow.dateFormat));
        }

    });
