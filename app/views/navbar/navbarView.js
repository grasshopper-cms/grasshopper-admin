/*global define:false*/
define(['baseView', 'rivetView', 'app'], function (BaseView, rivetView, app) {

        var NavbarView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#navbar-partial', rivetPrefix : 'navbar'}),
            beforeRender:BeforeRender,
            updateNavbarModel : updateNavbarModel
        });

        function BeforeRender() {
            this.listenTo(app.user, 'change', updateNavbarModel);
        }

        function updateNavbarModel() {
            this.model.set('user', app.user.id);
        }

        return NavbarView;
    });