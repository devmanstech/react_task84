
!function(H) {

    var Accordion = function(element) {
        this.$e = element;
        this.$pn = element.parentElement;
        this.$body = H.nextElementSibling(this.$e);
    }
    // Accordion.timeinstance = Date.now();

    Accordion.prototype = {
        toggle: function() {
            H.toggleClass(this.$pn, 'closed');
        }
    };

    H.Accordion = function(a) {
        return new Accordion(H.elementOrId(a));
    }

    H.Register.Accordion = function(e) {
	H.registerEvents('.steps-aware-accordion .steps-aware-title', 'click', Accordion, 'toggle', e);
    }

    H.defaultRegister(H.Register.Accordion);

}(UXFrameHelper);
