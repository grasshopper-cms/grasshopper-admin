/*global define:false*/
define(['baseView', 'rivetView', 'app'], function (BaseView, rivetView, app) {

        var NavbarView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#navbar-partial', rivetPrefix : 'navbar'}),
            beforeRender:beforeRender,
            updateNavbarModel : updateNavbarModel
        });

        // TODO: capitalization matters this.BeforeRender with not get fired by the BaseView, but this.beforeRender will
        function beforeRender() {
            // TODO: this should go into the config file for this view
            // BaseView hasn't implemented auto setting up listeners, but this is something we discussed and as an
            // example you can look at SamsungFrameworkV2 where it is alread implemented.
            // Base view should be modified to support:
//            actions: {
//                [app.user, 'change', 'updateNavbarModel'],
//                ...
//            }
            // the above would be setup on initialize.

            // Also, each time app is used it returns a new user model, not sure if this is desired
            // userModel - if it's going to be shared across all views - should be attached to the view prototype
            this.listenTo(app.user, 'change', updateNavbarModel);
        }

        function updateNavbarModel() {
            this.model.set('user', app.user.id);
        }

        return NavbarView;
    });