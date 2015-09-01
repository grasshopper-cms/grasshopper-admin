define(['moment','resources', 'constants'], function (moment, resources, constants) {
    'use strict';

    return {
        asEditorialDate : {
            read : readAsEditorialDate,
            publish : publishAsEditorialDate
        }
    };

    function readAsEditorialDate(value) {
        if (value) {
            return _adjustReadIfTimeZone().format(resources.plugins.editorialWindow.dateFormat);
        }

        function _adjustReadIfTimeZone() {
            if (constants.timeZone) {
                if (/Z$/i.test(value)) {
                    return moment.tz(value, constants.timeZone);
                } else {
                    return moment.tz(new Date(value), constants.timeZone);
                }
            } else {
                return moment(new Date(value));
            }
        }
    }

    function publishAsEditorialDate(value) {
        if (value) {
            return _adjustPublishIfTimeZone().toISOString();
        }

        function _adjustPublishIfTimeZone() {
            if (constants.timeZone) {
                return moment.tz(value, resources.plugins.editorialWindow.dateFormat, constants.timeZone);
            } else {
                return moment(new Date(value));
            }
        }
    }

});
