/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {
        "use strict";

        var NavbarView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#navbar-partial', rivetPrefix : 'navbar'})
        });

        return NavbarView;
    });