/*global define:false*/
define(['baseView', 'rivetView', 'app'], function (BaseView, rivetView, app) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header-partial', rivetPrefix : 'header'}),
        beforeRender:BeforeRender,
        updateHeaderModel : updateHeaderModel
    });

    function BeforeRender() {
        this.listenTo(app.user, 'change', updateHeaderModel);
    }

    function updateHeaderModel() {
        this.model.set('user', app.user.id);
    }

    return HeaderView;
});