/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {
    "use strict";

    var AlertBoxView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#alertBoxPartial', rivetPrefix : 'alertbox'})
    });

    return AlertBoxView;
});