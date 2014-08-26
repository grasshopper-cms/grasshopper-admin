define(['moment','resources'], function (moment, resources) {
    'use strict';

    return {
        asEditorialDate : {
            read : readAsEditorialDate,
            publish : publishAsEditorialDate
        }
    };

    function readAsEditorialDate(value) {
        if(value) {
            return moment(value).format(resources.plugins.editorialWindow.dateFormat);
        }
    }

    function publishAsEditorialDate(value) {
        if(value) {
            return moment(value).toISOString();
        }
    }

});
