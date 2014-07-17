/*global define:false*/
define(['grasshopperBaseView', 'headerViewConfig', 'jquery', 'constants'],
                                function (GrasshopperBaseView, headerViewConfig, $, constants) {

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
        console.log(currentTab);

        switch (currentTab) {
            case constants.internalRoutes.user:
            case constants.internalRoutes.users:
            case constants.internalRoutes.addUser:
                this.setActive('#users');
                break;
            case constants.internalRoutes.items:
            case constants.internalRoutes.item:
                console.log();
                this.setActive('#items');
                break;
            case constants.internalRoutes.contentTypes:
                console.log();
                this.setActive('#contentTypes');
                break;
            default:
                console.log('default tab');
                this.setActive('#items');
        }
    }

    function setActive(el) {
        $('.nav-item-link').removeClass('active');
        $(el).addClass('active');
        console.log(el);
    }

});
