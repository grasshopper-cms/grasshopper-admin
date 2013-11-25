/*global define:false*/
define(['baseView', 'rivetView', 'jquery'], function (BaseView, rivetView, $) {

    var MastheadView = BaseView.extend({
        beforeRender : beforeRender,
        afterRender: afterRender,
        setIcon: setIcon,
        setButtons : setButtons,
        setBreadcrumbs : setBreadcrumbs
    });

    function beforeRender() {
        this.setButtons();
        this.setBreadcrumbs();
    }

    function afterRender () {
        this.setIcon();
    }

    function setIcon() {
        if(this.model.get('icon')) {
            // TODO: What is this and why is it here?
            $('#MastheadIcon').addClass(this.model.get('icon'));
        }
    }

    function setButtons(buttonArray) {
        if(!buttonArray) {
            this.model.set('buttons', this.options.defaultMastheadButtons);
        } else {
            this.model.set('buttons', buttonArray);
        }

    }

    function setBreadcrumbs(breadcrumbs) {
        if(!breadcrumbs) {
            this.model.set('breadcrumbs', this.options.defaultBreadcrumbs);
        } else {
            this.model.set('breadcrumbs', breadcrumbs);
        }
    }

    return MastheadView;
});