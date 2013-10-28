/*global define:false*/
define(['baseView', 'rivetView', 'jquery'], function (BaseView, rivetView, $) {

    var MastheadView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#masthead', rivetPrefix : 'masthead'}),
        afterRender: afterRender,
        setIcon: setIcon
    });

    function afterRender () {
        this.setIcon();
    }

    function setIcon() {
        if(this.model.get('icon')) {
            $('#MastheadIcon').addClass(this.model.get('icon'));
        }
    }
    return MastheadView;
});