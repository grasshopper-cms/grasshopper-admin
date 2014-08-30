define(['jquery', 'underscore'], function ($, _) {

    'use strict';

    return {
        breadcrumb : breadcrumb
    };

    function breadcrumb(el, breadcrumbs) {
        var $el = $(el);

        $el.empty();

        _.each(_.initial(breadcrumbs), function(crumb) {
            $el.append('<a href='+ crumb.href +'>'+ crumb.text +' / </a>');
        });

        $el.append('<span>'+ _.last(breadcrumbs).text +'</span>');
    }
});
