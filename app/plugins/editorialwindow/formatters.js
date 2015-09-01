define(['moment','resources', 'constants'], function (moment, resources, constants) {
    'use strict';

    return {
        asEditorialDate : {
            read : readAsEditorialDate,
            publish : publishAsEditorialDate
        }
    };

    function readAsEditorialDate(value) {
        if(value) {
            if (/Z$/i.test(value)) {
                return moment.tz(value, constants.timeZone).format(resources.plugins.editorialWindow.dateFormat);
            } else {
                return moment.tz(new Date(value), constants.timeZone).format(resources.plugins.editorialWindow.dateFormat);
            }

        }
    }

    function publishAsEditorialDate(value) {
        if(value) {
            return moment.tz(value, resources.plugins.editorialWindow.dateFormat, constants.timeZone).toISOString();
        }
    }

});
