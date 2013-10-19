/* Some theme functions require boostrap - using this as a place to add those functions */

/* DROPDOWN CLASS DEFINITION
 * ========================= */

var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open')
        })
    }

Dropdown.prototype = {

    constructor: Dropdown

    , toggle: function (e) {
        var $this = $(this)
            , $parent
            , selector
            , isActive

        if ($this.is('.disabled, :disabled')) return

        selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = $(selector)
        $parent.length || ($parent = $this.parent())

        isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) $parent.toggleClass('open')

        return false
    }

}