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
        console.log('AFTER RENDER');
        this.model.set({
            limit : this.collection.limit,
            total : this.collection.total
        }, true);
    }

    function setLimit(e, context) {
        e.preventDefault();
        this.model.set('limit', context.size);
        this.collection.setLimit(context.size, this.model.get('contentSearchValue'))
            .done(
                paginationWorker.setUrl.bind(this, context.size, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }

    function goToPage(e) {
        e.preventDefault();
        this.collection.doSkip(3, this.model.get('contentSearchValue'), true)
            .done(
                paginationWorker.setUrl.bind(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }

    function next(e) {
        e.preventDefault();
        this.collection.doSkip(1, this.model.get('contentSearchValue'))
            .done(
                paginationWorker.setUrl.bind(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }

    function prev(e) {
        e.preventDefault();
        this.collection.doSkip(-1, this.model.get('contentSearchValue'))
            .done(
                paginationWorker.setUrl.bind(this, this.collection.limit, this.collection.skip, this.model.get('contentSearchValue'))
            );
    }
});