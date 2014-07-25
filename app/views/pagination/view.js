/*global define:false*/
define(['grasshopperBaseView', 'pagination/options'],
    function (GrasshopperBaseView, options) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : options,
        goToPage : goToPage,
        next : next,
        prev : prev,
        setLimit : setLimit,
        setUrl : setUrl
    });

    function setLimit(e, context) {
        e.preventDefault();
        this.collection.setLimit(context.size, this.model.get('contentSearchValue'))
            .done(
                setUrl.call(this, context.size, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }

    function goToPage(e) {
        e.preventDefault();
        this.collection.doSkip(3, this.model.get('contentSearchValue'), true)
            .done(
            setUrl.call(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
        );
    }

    function next(e) {
        e.preventDefault();
        this.collection.doSkip(1, this.model.get('contentSearchValue'))
            .done(
                setUrl.call(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }

    function prev(e) {
        e.preventDefault();
        this.collection.doSkip(-1, this.model.get('contentSearchValue'))
            .done(
            setUrl.call(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
        );
    }

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