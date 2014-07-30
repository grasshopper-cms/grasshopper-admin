define([], function () {
    'use strict';

    return {
        setUrl: setUrl
    };

    function setUrl(size, skip, contentSearchValue) {
        var url = this.app.router.getCurrentBreadcrumb();

        if (url.indexOf('/limit') !== -1) {
            url = url.slice(0, url.indexOf('/limit'));
        }

        if (!contentSearchValue) {
            url += '/limit/' + size + '/skip/' + skip;
        } else {
            url += '/limit/' + size + '/skip/' + skip + '/query/' + contentSearchValue;
        }

        this.app.router.navigateNinja(url);
    }
});