define(['moment'], function (moment) {
    'use strict';

    return {
        asEditorialDate : {
            read : readAsEditorialDate,
            publish : publishAsEditorialDate
        }
    };

    function readAsEditorialDate(value) {
        console.log('read');
        console.log(moment(value).format('YYYY-MM-DDThh:mm:ss'));
        return moment(value).format('YYYY-MM-DDThh:mm:ss');
    }

    function publishAsEditorialDate(value) {
        console.log('publish');
        console.log(moment(value).toISOString());
        return moment(value).toISOString();
    }

});