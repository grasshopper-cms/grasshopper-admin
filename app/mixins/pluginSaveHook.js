/*global define:false*/
define(['underscore'], function(_) {
    'use strict';

    return {
        activeSubscribers : [],
        register : register,
        remove : remove
    };

    function register(view) {
        this.activeSubscribers.push(view);

//        console.log('Adding SUBSCRIBERS');
//        console.log(activeSubscribers);
    }

    function remove(view) {
        this.activeSubscribers = _.reject(this.activeSubscribers, function(subscriber) {
            return subscriber.cid === view.cid;
        });

//        console.log('Removing SUBSCRIBERS');
//        console.log(activeSubscribers);
    }
});
