/*global define:false*/
define(['grasshopperBaseView', 'underscore'], function (GrasshopperBaseView, _) {

    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        setButtons : setButtons,
        setBreadcrumbs : setBreadcrumbs,
        interpolateMastheadButtons : interpolateMastheadButtons
    });

    function beforeRender() {
        this.setButtons();
        this.setBreadcrumbs();
    }

    function setButtons(buttonArray) {
        if(!buttonArray) {
            this.model.set('buttons', this.options.defaultMastheadButtons);
        } else {
            this.model.set('buttons', this.interpolateMastheadButtons(buttonArray));
        }
    }

    function setBreadcrumbs(view) {
        if (view && view.model.has('breadcrumbs')) {
            this.model.set('breadcrumbs', _.flatten(_.clone(view.model.get('breadcrumbs'))));
        } else if (view && view.options.breadcrumbs){
            this.model.set('breadcrumbs', view.options.breadcrumbs);
        } else {
            this.model.set('breadcrumbs', this.options.defaultBreadcrumbs);
        }
    }

    function interpolateMastheadButtons(buttonArray) {
        // TODO: Tons of repetition here. Refactor this.
        var self = this,
            interpolatedArray = [],
            obj = {},
            max = buttonArray.length,
            i = 0,
            key;

        if (this.app.router.contentBrowserNodeId) {
            for(i, max; i < max; i++) {
                for(key in buttonArray[i]) {
                    obj[key] = buttonArray[i][key].replace(':id', self.app.router.contentBrowserNodeId);
                }
                interpolatedArray.push(obj);
                obj = {};
            }
        } else {
            for(i, max; i < max; i++) {
                for(key in buttonArray[i]) {
                    obj[key] = buttonArray[i][key].replace(':id', 0);
                }
                interpolatedArray.push(obj);
                obj = {};
            }
        }

        return interpolatedArray;
    }

});