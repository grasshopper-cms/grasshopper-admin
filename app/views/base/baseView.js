define(['backbone', 'underscore'], function (Backbone, _) {

    var BaseView = Backbone.View.extend({
        render : function() {
            this.beforeRender()
            .then(
                this.actuallyRender(), // success from beforeRender
                console.log('error'), // error from beforeRender
                console.log('notification')) // notification
            .then(
                this.afterRender(), // success from actuallyRender
                console.log('error'), // error from actuallyRender
                console.log('notification')) // notification
            .then(
                this.afterRender(), // success from afterRender
                console.log('error'), // success from
                console.log('notification')) // Notification
            .done(
                console.log('done'))
            .fail( function() {
                console.log('failure')
            })
        },
        beforeRender : function() {
            var $deferred = new $.Deferred();
            _.defer(function() {
                // Do Stuff Before Render
                console.log('beforeRender');
            })
            return $deferred.promise();
        },
        actuallyRender : function() {
            var $deferred = new $.Deferred();
            _.defer(function() {
                console.log('actually render');
                this.$el.html(this.template(this.dataToJSON()))
            });
            return $deferred.promise();
        },
        afterRender : function() {
            var $deferred = new $.Deferred();
            _.defer(function() {
                console.log('AfterRender');
                // Do Stuff After Render
            })
            return $deferred.promise();
        },
        dataToJSON : function() {
            return this.model ? this.model.toJSON() : {};
        },
        initialize : function() {
            this.template = _.template(this.templateHtml);
        }
    });
    return BaseView;
});