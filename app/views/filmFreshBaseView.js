/*global define:false*/
define(['masseuseBaseView', 'input', 'alertBoxView', 'alertBoxViewConfig'], function (BaseView, input, AlertBoxView, alertBoxViewConfig) {
    'use strict';

    var oldSet = Backbone.Collection.prototype.set;

    return BaseView.extend({
        displayAlertBox : displayAlertBox,
        hideAlertBox : hideAlertBox,
        initialize : initialize,
        alertBoxView : '',
        childViews : {},
        start : start,
        addToChildren : addToChildren,
        removeFromChildren : removeFromChildren,
        removeAllChildren : removeAllChildren,
        startChildView : startChildView,
        startChildren : startChildren,
        swapChildren : swapChildren
    });

    function initialize() {
        Backbone.Collection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };

        // This apply focus on mouse hover
        $('.canFocus').hover(function(){
            input.setFocus($(this));
        }, function(){
            //
        });

        BaseView.prototype.initialize.apply(this, arguments);
    }

    function start() {
        var $promise = BaseView.prototype.start.apply(this, arguments),
            self = this;

        $promise.progress(function(event){
            switch (event) {
            case BaseView.afterRenderDone:
                if (self.options.rivetConfig) {
                    self.rivetView();
                }
                self.channels.views.trigger('findDefaultFocus', self.$el);
                break;
            }
        });

        return $promise;
    }

    function displayAlertBox (msg) {
        var alertBoxView;
        if (msg.responseText) {
            msg = msg.responseText;
        }
        else if (msg.status && msg.statusText){
            msg = msg.status +' : '+ msg.statusText;
        }
        this.hideAlertBox();
        alertBoxView = new AlertBoxView(alertBoxViewConfig);
        alertBoxView.model.set('error', msg);
        alertBoxView.start().done(function(){
            alertBoxView.rivetView();
            this.alertBoxView = alertBoxView;
        }.bind(this));

    }

    function hideAlertBox () {
        if (this.alertBoxView && this.alertBoxView.remove) {
            this.alertBoxView.remove();
        }
    }

    function addToChildren(childViews) {
        _.each(childViews, function(childView){
            this.childViews[childView.cid] = childView;
        });
    }

    function removeFromChildren(childView) {
        _.omit(this.childViews, childView.cid);
        childView.remove();
    }


    function removeAllChildren() {
        _.each(this.childViews, function(childView){
            _.each(childView.childViews, function(subChildView){
                subChildView.remove();
            });
            childView.remove();
        });
    }

    function swapChildren(newView) {
        this.removeAllChildren();
        this.addToChildren(newView);
    }

    function startChildView(childView) {
        var thisChildView = this.childViews[childView.cid];
        return thisChildView.start();
    }

    function startChildren() {
        _.each(this.childViews, function(childView){
            childView.start();
        });
    }

});