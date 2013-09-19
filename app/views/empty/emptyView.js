/*global define:false*/
define(['baseView', 'rivetView']
    , function (BaseView, rivetView) {
        "use strict";

        var EmptyView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#empty', rivetPrefix : 'empty'}),
        });


        return EmptyView;
    });