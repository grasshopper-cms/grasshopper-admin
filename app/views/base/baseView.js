define(['backbone', 'underscore', 'channels'], function (Backbone, _, channels) {

    var BaseView = Backbone.View.extend({
        options: {
            name:"BaseView"
        },
        start : function() {
            var $deferred = new $.Deferred();
            $.when(function() {
                // TODO: Refactor this.
                var event = this.options.name + ":beforeRender",
                    promise;
                this.channels.views.trigger(event);
                if (this.beforeRender) {
                    promise = this.beforeRender();
                }
                return promise;
                }.bind(this)())
                .done(function() {
                    var event = this.options.name + ":render";
                    this.channels.views.trigger(event)
                    this.render();
                }.bind(this));
            return $deferred.promise();
        },
        render : function() {
            this.$el.html(this.template(this.dataToJSON()));
        },
        dataToJSON : function() {
            return this.model ? this.model.toJSON() : {};
        },
        initialize : function() {
            this.template = _.template(this.templateHtml);
        }
    });
    BaseView.prototype.channels = channels;
    return BaseView;
});