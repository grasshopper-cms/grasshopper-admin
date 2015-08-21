/*global define:false*/
define(['pluginBaseView', 'momentTimezoneWithData', 'jquery', 'datetimepicker', 'resources', 'constants'],
    function (PluginBaseView, moment, $, datetimepicker, resources, constants) {
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
                if(constants.timeZone) {
                    return moment(input, format).tz(constants.timeZone).format();
                } else {
                    return moment(input, format).toDate();
                }
            };

            Date.prototype.dateFormat = function (format) {
                if(constants.timeZone) {
                    return moment(this).tz(constants.timeZone).format(format);
                } else {
                    return moment(this).format(format);
                }
            };
        }

        function afterRender ($deferred) {
            setTimeout(_addDateTimePickers.bind(this, $deferred), 100);
        }

        function _addDateTimePickers ($deferred) {
            var startDate;

            if(constants.timeZone) {
                startDate = moment().tz(constants.timeZone);
            } else {
                startDate = moment();
            }

            this.$el.find('.datetimepicker').each(function () {
                $(this).datetimepicker({
                    startDate : startDate,
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
            var validFrom;

            if(constants.timeZone) {
                validFrom = moment().tz(constants.timeZone).format(resources.plugins.editorialWindow.dateFormat);
            } else {
                validFrom = moment().format(resources.plugins.editorialWindow.dateFormat);
            }

            this.model.set('value.validFrom', validFrom);
        }

        function setValidToToNow () {
            var validTo;

            if(constants.timeZone) {
                validTo = moment().tz(constants.timeZone).format(resources.plugins.editorialWindow.dateFormat);
            } else {
                validTo = moment().format(resources.plugins.editorialWindow.dateFormat);
            }

            this.model.set('value.validTo', validTo);
        }

        function setValidToNeverExpire () {
            var neverExpireDate;

            if(constants.timeZone) {
                neverExpireDate = moment().add(1000, 'y').tz(constants.timeZone).format(resources.plugins.editorialWindow.dateFormat);
            } else {
                neverExpireDate = moment().add(1000, 'y').format(resources.plugins.editorialWindow.dateFormat);
            }

            this.model.set('value.validTo', neverExpireDate);
        }

    });
