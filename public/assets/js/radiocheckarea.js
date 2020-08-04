!function(H) {

    var RadioCheckArea = function(e) {
        this.$e = e;
        this.$label = H.previousElementSibling(e);
        this.$checker = H.previousElementSibling(this.$label);
    }

    RadioCheckArea.selector = "input:not(:disabled) ~ label ~ div";

    RadioCheckArea.prototype = {

        setCheck: function() {
            if (this.$checker) {
                var prev = this.$checker.checked;
                if (this.$checker.type == 'checkbox') {
                    this.$checker.checked = !this.$checker.checked;
                } else if (this.$checker.type == 'radio') {
                    this.$checker.checked = true;
                }
                if (this.$checker.checked != prev) {
                    $(this.$checker).trigger('change');
                }
            }
        }
    }

    H.Register.RadioCheckArea = function(e) {
        H.registerEvents(RadioCheckArea.selector, 'click', RadioCheckArea, 'setCheck', e);
    }

    H.defaultRegister(H.Register.RadioCheckArea);

}(UXFrameHelper);
