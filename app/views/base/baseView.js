define(['backbone', 'underscore', 'channels'], function (Backbone, _, channels) {

    var BaseView = Backbone.View.extend({
        options : {
            name : "BaseView"
        },
        initialize : initialize,
        start : start,
        render : render,
        dataToJSON : dataToJSON
    });

    function start () {
        var $deferred = new $.Deferred(),
            self = this;
        $
            .when(_beforeRender.call(this))
            .done(_render.call(this))
            //TODO: implement _afterRender
            .done(_resolveStart.call(this, $deferred));
        //TODO: implement fail method that is called if before or after render is rejected
        return $deferred.promise();
    }

    function render () {
        this.$el.html(this.template(this.dataToJSON()));
    }

    function dataToJSON () {
        return this.model ? this.model.toJSON() : {};
    }

    function initialize () {
        this.template = _.template(this.templateHtml);
    }

    // Share channels among all Views
    BaseView.prototype.channels = channels;

    // --------------------------
    // Private Methods

    function _beforeRender () {
        // TODO: create a method to generate the event name from the views name + the event name
        var event = this.options.name + ":onBeforeRender";
        this.channels.views.trigger(event);
        return this.beforeRender ? this.beforeRender() : undefined;
    }

    function _render () {
        var event = this.options.name + ":render";
        this.channels.views.trigger(event)
        this.render();
    }

    function _resolveStart ($deferred) {
        $deferred.resolve();
    }

    return BaseView;
});