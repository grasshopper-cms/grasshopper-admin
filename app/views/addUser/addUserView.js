/*global define:false*/
define(['baseView'], function (BaseView) {

    var addUserView = BaseView.extend({
//        afterRender : afterRender
//        beforeRender : beforeRender
        applyFoundationForms : applyFoundationForms
    });

    function applyFoundationForms () {
        this.$el.foundation('forms');
    }

    return addUserView;
});