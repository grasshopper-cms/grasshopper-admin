/*global define:false*/
define(['grasshopperBaseView', 'mastheadViewConfig', 'underscore'],
    function (GrasshopperBaseView, mastheadViewConfig, _) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : mastheadViewConfig,
        beforeRender : beforeRender,
        setButtons : setButtons,
        setBreadcrumbs : setBreadcrumbs,
        interpolateMastheadButtons : interpolateMastheadButtons
    });

    function beforeRender () {
        this.setButtons();
        this.setBreadcrumbs();
    }

    function setButtons (buttonArray) {
        //TODO: This resets the mastheadbuttons each time.
        // I should do a check to see if anything has changed before updating it again.
        if (!buttonArray) {
            this.model.set('buttons', this.defaultMastheadButtons);
        } else {
            this.model.set('buttons', this.interpolateMastheadButtons(buttonArray));
        }
    }

    function setBreadcrumbs (view) {
        if (view && view.model.has('breadcrumbs')) {
            this.model.set('breadcrumbs', _.flatten(_.clone(view.model.get('breadcrumbs'))));
        } else if (view && view.breadcrumbs) {
            this.model.set('breadcrumbs', view.breadcrumbs);
        } else {
            this.model.set('breadcrumbs', this.defaultBreadcrumbs);
        }
    }

    function interpolateMastheadButtons (buttonArray) {
        var interpolatedArray = [],
            max = buttonArray.length,
            i = 0;

        for (i, max; i < max; i++) {
            interpolatedArray.push(_interpolateButton.call(this, buttonArray[i]));
        }
        return interpolatedArray;
    }

    function _interpolateButton(thisButton) {
        var nodeId = this.app.router.contentBrowserNodeId,
            newButton = {},
            key;
        for (key in thisButton) {
            if (nodeId) {
                newButton[key] = thisButton[key].replace(':id', nodeId);
            } else {
                newButton[key] = thisButton[key].replace(':id', 0);
            }
        }
        return newButton;
    }

});


