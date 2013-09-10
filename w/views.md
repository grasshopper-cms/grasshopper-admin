## Views

* Views should be simple with shallow class hierarchies
* Functionality only need for a few views should be mixed in and not inherited

### Base View

* Base view should allow the usage of field definition conventions to speed up coding
* Base view will have a defined life cycle:
    * Base view life cycle:
* Each base view will render itself first and then all children
* Parent and child view are both Base views
* The `$node`
    * Each base view will have a `$('<div/>')`, the `this.$node`
    * This views will be structured as an off document DOM tree to aid in communication and organization
    * This allows us to leverage the DOM as an organizational helper and event bus
* Channels
    * If needed channels can be created out of empty objects using `_` and `Backbone`
        * A global `channels` object would be created with `channels.visible`, etc.
    * `$node` can also be used as a channel and can support event bubbling
* Templates will be `requirejs` `text` dependencies

### Rough Base View Pattern

```
define(['backbone'], function(Backbone) {
    var BaseView = Backbone.view.extend({
        initialize: initialize,
        attachChild: attachChild,
        getNode: getNode
    });

    function initialize() {
        this.$node = $('<div/>');

        if (this.children) {
            _.forEach(this.children, this.attachChild);
        }
    }

    function attachChild(view) {
        this.$node.append(view.getNode());
    }

    function getNode() {
        return this.$node;
    }


    return BaseView;
});
```

* Setting as many things up with fields as possible

```
define(['baseView', 'oneView', 'otherView', 'text!newViewTemplate', 'xyz'], function(BaseView, OneView, OtherView, template, XYZ) {
    var NewView = BaseView.extend({
        template: template,
        children: [OneView, OtherView],
        actions: [
            [XYZ, 'change:blah', this.aMethod]
        ]
    });

    return NewView;
});
```

### General AMD pattern
```
define(['underscore', 'jquery', 'backbone'], function(_, $, Backbone) {

    // Compact class definition listing all fields for readability
    var NewView = Backbone.View.extend(
        variable: 42
        initialize: initialize,
        render: render
        aMethod: aMethod
    );

    // Methods defined as function declarations for ease of scoping
    function initialize() { ... }
    function render() { ... }
    function aMethod() {
        ...
        // Use appply or call with private methods, to make them really private
        _privateMethod.call(this, x, y, z);
    }

    // -----------------------------------------
    // Private methods protected by this closure
    function _privateMethod() {
        // e.g.
        this.render();
    }

    return NewView;
});
```

### All children
```
function setupListeners() {
    this.$node.on('trigger', )
}
```

```
function render() {
    // render self
    ...
    // render children
    this.$node.children().trigger('render');
}
```