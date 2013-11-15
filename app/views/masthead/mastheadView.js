/*global define:false*/
define(['baseView', 'rivetView', 'jquery'], function (BaseView, rivetView, $) {

    var MastheadView = BaseView.extend({
        beforeRender : beforeRender,
        afterRender: afterRender,
        setIcon: setIcon,
        setButtons : setButtons
    });

    function beforeRender() {
        this.setButtons();
    }

    function afterRender () {
        this.setIcon();
    }

    function setIcon() {
        if(this.model.get('icon')) {
            $('#MastheadIcon').addClass(this.model.get('icon'));
        }
    }

    function setButtons(buttonArray) {
        if(!buttonArray) {
            this.model.set('buttons', this.options.mastheadButtons);
        } else {
            this.model.set('buttons', buttonArray);
        }

    }

    return MastheadView;
});