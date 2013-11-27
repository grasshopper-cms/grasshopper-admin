/*global define:false*/
define(['baseView', 'rivetView', 'jquery', 'underscore'], function (BaseView, rivetView, $, _) {

    var MastheadView = BaseView.extend({
        beforeRender : beforeRender,
        afterRender: afterRender,
        setIcon: setIcon,
        setButtons : setButtons,
        setBreadcrumbs : setBreadcrumbs,
        interpolateMastheadButtons : interpolateMastheadButtons
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
            this.model.set('buttons', this.interpolateMastheadButtons(buttonArray));
        }
    }

    function setBreadcrumbs(breadcrumbs) {
        if(!breadcrumbs) {
            this.model.set('breadcrumbs', this.options.defaultBreadcrumbs);
        } else {
            this.model.set('breadcrumbs', breadcrumbs);
        }
    }

    function interpolateMastheadButtons(buttonArray) {
        var self = this;
        // TODO: The intention here was to reset the mastheadButtons with new information when new info is avail...though.. for some reason rivets is not updating...
        if (this.app.router.contentBrowserNodeId) {
            _.each(buttonArray, function(button) {
                for(var key in button) {
                    if(_.isString(button[key])) {
                        button[key] = button[key].replace(':id', self.app.router.contentBrowserNodeId);
                    }
                }
            });
        }
        return buttonArray;
    }

    return MastheadView;
});