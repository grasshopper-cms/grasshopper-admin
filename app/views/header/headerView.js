/*global define:false*/
define(['grasshopperBaseView', 'headerViewConfig', 'jquery', 'constants','sparkmd5'],
                                function (GrasshopperBaseView, headerViewConfig, $, constants, sparkmd5) {

    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : headerViewConfig,
        toogleNavigation : toogleNavigation,
        checkHeaderTab: checkHeaderTab,
        setActive: setActive
    });

    function toogleNavigation(e) {
        e.preventDefault();
        $('#main-nav').slideToggle('fast');
    }

    function checkHeaderTab(breadcrumb) {
        var currentTab = '#' + breadcrumb.split('/')[0];

        switch (currentTab) {
        case constants.internalRoutes.user:
        case constants.internalRoutes.users:
        case constants.internalRoutes.addUser:
            this.setActive('#users');
            break;
        case constants.internalRoutes.items:
        case constants.internalRoutes.item:
            this.setActive('#items');
            break;
        case constants.internalRoutes.contentTypes:
            this.setActive('#contentTypes');
            break;
        default:
            this.setActive('#items');
        }
    }

    function setActive(el) {
        $('.nav-item-link').removeClass('active');
        $(el).addClass('active');
    }

});
