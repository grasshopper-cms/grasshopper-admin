/*global define:false*/
define(['baseView'], function (BaseView) {

    var HeaderView = BaseView.extend({
        beforeRender : beforeRender
    });

    function beforeRender() {
        console.log(this.app.user);
    }


    return HeaderView;
});
