/*global define:false*/
define(['underscore'], function(_) {
    'use strict';

    var activeSubscribers = [];

    return {
        activeSubscribers : activeSubscribers,
        register : register,
        remove : remove
    };

    function register(view) {
        activeSubscribers.push(view);

//        console.log('Adding SUBSCRIBERS');
//        console.log(activeSubscribers);
    }

    function remove(view) {
        activeSubscribers = _.reject(activeSubscribers, function(subscriber) {
            return subscriber.cid === view.cid;
        });

//        console.log('Removing SUBSCRIBERS');
//        console.log(activeSubscribers);
    }
});