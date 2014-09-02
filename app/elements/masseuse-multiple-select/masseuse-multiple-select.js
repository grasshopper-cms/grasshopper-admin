Polymer('masseuse-multiple-select', {
    created: function() {
        console.log('CREATED');
        console.log(this);
        window.polymerElement = this;
    },
    ready: function() {
        console.log('ready');
        console.log(this);
    },
    attached: function () {
        console.log('attached');
        console.log(this);
    },
    domReady: function() {
        console.log('domReady');
        console.log(this);
    },
    detached: function() {
        console.log('detached');
        console.log(this);
    },
    attributeChanged: function(attrName, oldVal, newVal) {
        //var newVal = this.getAttribute(attrName);
        console.log(attrName, 'old: ' + oldVal, 'new:', newVal);
    }
});
