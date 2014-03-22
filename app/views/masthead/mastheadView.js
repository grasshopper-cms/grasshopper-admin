/*global define:false*/
define(['grasshopperBaseView', 'mastheadViewConfig', 'underscore'],
    function (GrasshopperBaseView, mastheadViewConfig, _) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : mastheadViewConfig,
        beforeRender : beforeRender,
        setButtons : setButtons,
        setBreadcrumbs : setBreadcrumbs,
        interpolateMastheadButtons : interpolateMastheadButtons,
        clickMastheadDropdown : clickMastheadDropdown
    });

    function beforeRender () {
        this.setButtons();
        this.setBreadcrumbs();
    }

    function setButtons (buttonArray) {
        if (!buttonArray) {
            this.model.set('buttons', this.defaultMastheadButtons);
        } else {
            buttonArray = _filterButtonArrayOfDoNotDisplayInRoot.call(this, buttonArray);
            this.model.set('buttons', this.interpolateMastheadButtons(buttonArray));
            this.$el.foundation();
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
        var nodeId = this.model.get('nodeId'),
            newButton = {},
            key;

        for (key in thisButton) {
            if( _.isBoolean(thisButton[key]) ) {
                newButton[key] = thisButton[key];
                continue;
            }

            if(key === 'dropdown' && _.isArray(thisButton[key])) {
                newButton[key] = this.interpolateMastheadButtons(thisButton[key]);
                continue;
            }

            if (nodeId) {
                newButton[key] = thisButton[key].replace(':id', nodeId);
            } else {
                newButton[key] = thisButton[key].replace(':id', 0);
            }

        }
        return newButton;
    }

    function _filterButtonArrayOfDoNotDisplayInRoot(buttonArray) {
        if(this.model.get('inRoot')) {
            buttonArray = _.filter(buttonArray, function(button) {
                return !_.has(button, 'displayInRoot') || button.displayInRoot !== false;
            });
        }

        return buttonArray;
    }

    function clickMastheadDropdown(e, context) {
        this.$el.click();
        e.preventDefault();
        this.channels.views.trigger('mastheadDropdownClicked', context);
    }

});


