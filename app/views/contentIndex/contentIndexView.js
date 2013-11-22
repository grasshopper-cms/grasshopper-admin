/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    var contentIndexView = BaseView.extend({
        beforeRender: beforeRender
    });

    function beforeRender() {
        var self = this;

//        if(this.options.nodeId) {
//            this.model.url = this.model.url.replace(':id', this.options.nodeId);
//        } else {
//            this.model.url = this.model.url.replace(':id', 0);
//        }

        console.log('YEAH BUDDY');

//        this.model.fetch()
//            .done(function() {
//                console.log(self.model);
//            });
    }

    return contentIndexView;
});


//function afterRender() {
//    Api.makeQuery(constants.api.contentQuery.url,
//        {
//            nodes: '526d5179966a883540000006',
//            types: [],
//            filters: [],
//            options: {
//                fake : true
//            }
//        })
//        .done(function(data) {
//            console.log('yeahhhhh buddyyyy');
//            console.log(data);
//        });
//}