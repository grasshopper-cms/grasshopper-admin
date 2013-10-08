/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {
    'use strict';

    var MastheadView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#masthead', rivetPrefix : 'masthead'})
    });


    return MastheadView;
});