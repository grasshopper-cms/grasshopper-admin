define(['constants', 'paginationWorker', 'jquery', 'underscore'],
    function (constants, paginationWorker, $, _) {

    'use strict';

    return {
        searchContent: searchContent
    };

    function searchContent(e, context, modelName, isNotUpdateUrl, isFirstQuery) {
        var model,
            contentSearchValue;

        isNotUpdateUrl = isNotUpdateUrl || false;
        isFirstQuery = isFirstQuery || false;

        if (!_.isUndefined(e) && !_.isUndefined(constants.controlKeyCodeMap[e.keyCode])) {
            return false;
        }

        model = this.model.get(modelName);
        contentSearchValue = $.trim(this.model.get('contentSearchValue'));

        if (isFirstQuery) {
            return model.query(contentSearchValue);
        } else {
            _toggleSearchSpinner.call(this);
            return model.searchQuery(contentSearchValue)
                .done(
                    isNotUpdateUrl && paginationWorker.setUrl.bind(this, model.limit, model.skip, contentSearchValue),
                    _toggleSearchSpinner.bind(this, true)
                );
        }
    }

    function _toggleSearchSpinner(revert) {
        var $searchIcon = this.$('.contentSearchIcon');

        if (revert) {
            $searchIcon.removeClass('fa-refresh fa-spin');
            $searchIcon.addClass('fa-search');
        } else {
            $searchIcon.removeClass('fa-search');
            $searchIcon.addClass('fa-refresh fa-spin');
        }
    }
});
