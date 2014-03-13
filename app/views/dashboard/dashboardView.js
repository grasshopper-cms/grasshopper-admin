/*global define:false*/
define(['grasshopperBaseView', 'dashboardViewConfig', 'ace'],
    function (GrasshopperBaseView, dashboardViewConfig, ace) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : dashboardViewConfig,
        afterRender : afterRender
    });

    function afterRender() {
        var editor = ace.edit('editor');
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');
    }

});