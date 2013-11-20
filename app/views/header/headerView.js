/*global define:false*/
define(['baseView'], function (BaseView) {

    var HeaderView = BaseView.extend({
        initialize : initialize
    });

    function initialize () {
        BaseView.prototype.initialize.apply(this, arguments);
    }

    return HeaderView;
});
