/*global define:false*/
define(['baseView', 'underscore'], function (BaseView, _) {

    return BaseView.extend({
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
            var crumbs = _.clone(this.model.get('breadcrumbs')),
                newCrumb = view.model.get('breadcrumbs');

            crumbs.push(newCrumb);
            this.model.set('breadcrumbs', crumbs);
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
                    obj[key] = buttonArray[i][key].replace('/:id', '');
                }
                interpolatedArray.push(obj);
                obj = {};
            }
        }

        return interpolatedArray;
    }

});