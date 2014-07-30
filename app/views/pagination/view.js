/*global define:false*/
define(['grasshopperBaseView', 'pagination/options', 'paginationWorker'],
    function (GrasshopperBaseView, options, paginationWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : options,
        afterRender : afterRender,
        goToPage : goToPage,
        next : next,
        prev : prev,
        setLimit : setLimit
    });

    function afterRender() {
        this.model.set({
            limit : this.collection.limit,
            total : this.collection.total,
            currentPage : this.collection.skip
        }, true);
    }

    function setLimit(e, context) {
        e.preventDefault();
        var contentSearchValue = this.model.get('contentSearchValue');

        this.model.set('limit', context.size);
        this.collection.setLimit(context.size, contentSearchValue)
            .done(
                paginationWorker.setUrl.bind(this, context.size, this.collection.skip, contentSearchValue)
            );
    }

    function goToPage(e, context) {
        e.preventDefault();
        var contentSearchValue = this.model.get('contentSearchValue'),
            pageNumbersLength = this.model.get('pageNumbers').length;

        _toPage.call(this, context.number.linkTo, contentSearchValue, pageNumbersLength, true);
    }

    function next(e) {
        e.preventDefault();
        var contentSearchValue = this.model.get('contentSearchValue'),
            pageNumbersLength = this.model.get('pageNumbers').length;

        _toPage.call(this, 1, contentSearchValue, pageNumbersLength);
    }

    function prev(e) {
        e.preventDefault();
        var contentSearchValue = this.model.get('contentSearchValue'),
            pageNumbersLength = this.model.get('pageNumbers').length;

        _toPage.call(this, -1, contentSearchValue, pageNumbersLength);
    }

    function _toPage(page, contentSearchValue, pageNumbersLength, isGoToPage) {
        isGoToPage = isGoToPage || false;

        this.collection.doSkip(page, contentSearchValue, pageNumbersLength, isGoToPage)
            .done(
                this.model.set('currentPage', this.collection.skip),
                paginationWorker.setUrl.bind(this, this.collection.limit, this.collection.skip, contentSearchValue)
            );
    }
});