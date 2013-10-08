/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {
    'use strict';

    var DashboardView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#dashboard', rivetPrefix : 'dashboard'})
    });

    return DashboardView;
});