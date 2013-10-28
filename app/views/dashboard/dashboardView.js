/*global define:false*/
define(['baseView', 'rivetView','jquery', 'cirque'], function (BaseView, rivetView, $, cirque) {
    'use strict';

    var DashboardView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#dashboard', rivetPrefix : 'dashboard'}),
        afterRender: afterRender
    });

    function afterRender() {
        $('.report-cirque').cirque ({
            radius: 60,
            total: 7630,
            lineWidth: 10,
            trackColor: '#CCCCCC'
        });
    }
    return DashboardView;
});