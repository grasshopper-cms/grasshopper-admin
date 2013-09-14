define(['backbone', 'underscore', 'channels'], function (Backbone, _, channels) {

    var BaseView = Backbone.View.extend({
        options : {
            name : 'BaseView'
        },
        initialize : initialize,
        start : start,
        render : render,
        dataToJSON : dataToJSON
    });

    function initialize () {
        if (this.options.templateHtml) {
            this.template = _.template(this.options.templateHtml);
        }
        if (this.options.modelData) {
            this.model = new Backbone.Model(this.options.modelData);
        }
    }

    function start () {
        var $deferred = new $.Deferred();

        $
            .when(_beforeRender.call(this))
            .then(_render.call(this), _rejectStart.call(this, $deferred))
            .then(_afterRender.call(this), _rejectStart.call(this, $deferred))
            .then(_resolveStart.call(this, $deferred), _rejectStart.call(this, $deferred));
        //TODO: implement fail method that is called if before or after render is rejected
        return $deferred.promise();
    }

    function render () {
        if (this.$el && this.template) {
            this.$el.html(this.template(this.dataToJSON()));
        }
    }

    function dataToJSON () {
        return this.model ? this.model.toJSON() : {};
    }

    // Share channels among all Views
    BaseView.prototype.channels = channels;

    // --------------------------
    // Private Methods

    function _beforeRender() {
        // TODO: create a method to generate the event name from the views name + the event name
        var event = this.options.name + ':onBeforeRender';
        this.channels.views.trigger(event);
        return this.beforeRender ? this.beforeRender() : undefined;
    }

    function _render() {
        return function() {
            var event = this.options.name + ':render';
            this.channels.views.trigger(event);
            this.render();
        }.bind(this);
    }

    function _afterRender() {
        return function() {
            var event = this.options.name + ':onAfterRender';
            this.channels.views.trigger(event);
            return this.afterRender ? this.afterRender() : undefined;
        }.bind(this);
    }

    function _resolveStart ($deferred) {
        return function() {
            $deferred.resolve();
        }.bind(this);
    }

    function _rejectStart ($deferred) {
        return function() {
            $deferred.reject();
        }.bind(this);
    }

    return BaseView;
});