define(['jquery', 'underscore', 'constants'],
    function ($, _, constants) {
        'use strict';
        var requestsMidflight = 0;
        return {
            setupCounter: setupCounter
        };

        function setupCounter() {
            $.ajaxSetup({
                /* jslint unused: false */
                beforeSend: function (jqXHR, settings) {
                    requestsMidflight++;
                    var $deferred = new $.Deferred(), showSpinnerLoading = function () {
                        if (requestsMidflight > 0) {
                            $('body').addClass('spinner-loading');
                        }
                    }, hideSpinnerLoading = function () {
                        if (requestsMidflight <= 0) {
                            $('body').removeClass('spinner-loading');
                        }
                    };
                    $deferred.then(showSpinnerLoading);
                    setTimeout(function () {
                        $deferred.resolve();
                    }, constants.timeouts.showSpinnerLoadingTimeout);
                    jqXHR.always(function (jqXHR, textStatus) {
                        requestsMidflight--;
                        $deferred.reject();
                        hideSpinnerLoading();
                    });
                }
            });
        }

    });