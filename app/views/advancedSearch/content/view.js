/*global define:false*/
define(['grasshopperBaseView', 'advancedSearch/content/config', 'jquery'],
    function (GrasshopperBaseView, config, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender,
            afterRender : afterRender,
            addFilterToFiltersCollection : addFilterToFiltersCollection,
            removeFilterFromFiltersCollection : removeFilterFromFiltersCollection,
            resetNewFilter : resetNewFilter
        });

        function beforeRender($deferred) {
            $.when(
                this.model.get('contentTypeCollection').fetch(),
                this.model.get('nodesCollection').fetch()
            )
                .then($deferred.resolve);
        }

        function afterRender() {
            this.model.query()
                .done(this.model.setupChangeListeners.bind(this.model));
        }

        function addFilterToFiltersCollection() {
            this.model.get('filtersCollection').add(this.model.get('newFilterModel').toJSON());
            this.resetNewFilter();
        }

        function removeFilterFromFiltersCollection(event, context) {
            this.model.get('filtersCollection').remove(context.filter);
        }

        function resetNewFilter() {
            this.model.get('newFilterModel').clear();
            this.$('#newFilterKeys').add('#newFilterComparator').select2('val', '');
        }

    });
