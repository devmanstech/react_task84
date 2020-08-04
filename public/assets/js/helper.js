/*
* A set of helper functions used throughout the UXFrame distribution.
*/


/* IE8 Compatibility Functions */
if(!document.querySelectorAll)
(function(d,s){d=document,s=d.createStyleSheet();d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c}})();
if ( typeof Object.getPrototypeOf !== "function" ) {
  if ( typeof "test".__proto__ === "object" ) {
    Object.getPrototypeOf = function(object){
      return object.__proto__;
    };
  } else {
    Object.getPrototypeOf = function(object){
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    };
  }
}
// if(!Object.getPrototypeOf) {
//   console.log('c');
//   if(({}).__proto__===Object.prototype&&([]).__proto__===Array.prototype) {
//     Object.getPrototypeOf=function getPrototypeOf(object) {
//       console.log('a');
//       return object.__proto__;
//     };
//   } else {
//     Object.getPrototypeOf=function getPrototypeOf(object) {
//       // May break if the constructor has been changed or removed
//       console.log('b');
//       return object.constructor?object.constructor.prototype:void 0;
//     };
//   }
// }

/* End IE8 Compatibility Functions */


/*
 * All exported functions are accessible through UXFrameHelper/$UXF.
 * This object by default contains a set of helper functions to abstract
 * away from strange browser behavior. Look at each function for more
 * detailed documentation.
 */
var UXFrameHelper = $UXF = (function() {

    var Help = function(element) {
        this.Register = {};
        this.componentId = 0;
    };


    Help.prototype = {

        /*
         * This is the function that all components initiall run their event
         * registration through. Right now, it just handles default registration
         * of events, but this could be expanded to handle other initial settings.
         */
        defaultRegister: function(func) {
            var self = this;
            self.addLoadEvent(function() {
                if (self.defaultBinds) func()
            });
        },

        /*
         * Simply a helper function force registration of all components.
         */
        registerAll: function() {
            for (var i in this.Register) {
                this.Register[i]();
            }
        },
        /*
         * Adds an event on window.load, or runs if it is already loaded
         */
        addLoadEvent: function (func) {
            if (document.readyState === "complete") {
                // console.log('ran');
                func();
            } else {
                var oldonload = window.onload;
                if (typeof window.onload != 'function') {
                    window.onload = func;
                } else {
                    window.onload = function() {
                        if (oldonload) {
                            oldonload();
                        }
                        func();
                    }
                }
            }
        },

        /*
         * Helper function for adding an event to a given element.
         * In addition to standard events, the string "immediate"
         * is also valid, which will cause the event to be immediately
         * executed.
         */
        addEvent: function(element, evnt, funct) {
            if (evnt == "immediate") {
                funct.call(element, evnt);
            } else {
                if (element.attachEvent)
                    return element.attachEvent('on'+evnt, function() {
                        // We use .call() here so that the $this context is set correctly.
                        funct.call(element, evnt);
                    });
                else
                    return element.addEventListener(evnt, funct, false);
            }
        },

        /*
         * Takes an element and a class string and returns a boolean 
         * if the element has the class
         */
        hasClass: function(element, cls) {
            return element.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
        },

        /*
         * Removes class string from a given element.
         */
        removeClass: function(ele, cls){
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className = ele.className.replace(reg,' ');
        },

        /*
         * Adds class string from a given element.
         */
        addClass: function(ele, cls) {
            ele.className += " "+cls;
        },

        /*
         * Toggles class string from a given element.
         */
        toggleClass: function(element, clss) {
            var self = this;
            if (self.hasClass(element, clss)) {
                self.removeClass(element, clss);
            } else {
                self.addClass(element, clss);
            }

        },

        /*
         * Returns the previous sibiling. This can be helpful
         * because ie8 has some werid behaviour by default.
         */
        previousElementSibling: function(el) {
            if( el.previousElementSibling ) {
                return el.previousElementSibling;
            } else {
                while( el = el.previousSibling ) {
                    if( el.nodeType === 1 ) return el;
                }
            }
        },

        /*
         * Returns the next sibiling. This can be helpful
         * because ie8 has some werid behaviour by default.
         */
        nextElementSibling: function(el) {
            if( el.nextElementSibling ) {
                return el.nextElementSibling;
            } else {
                while( el = el.nextSibling ) {
                    if( el.nodeType === 1 ) return el;
                }
            }
        },

        /*
         * Returns either the element passed in, or if the argument
         * is a string, find the element with that Id.
         * This is used because we want people to be able to
         * select elements both with a tool like JQuery and by id.
         */
        elementOrId: function(a) {
            if (typeof a === "string" || a instanceof String) {
                return document.getElementById(a);
            } else {
                return a;
            }
        },


        /*
         * This function is pretty much the crux of the helper functions.
         * This function takes care of adding a function to certain selected element
         * on a given event.
         * Passed in are:
         *      elementSelector: a string for querySelectorAll.
         *      evnt: a JS event.
         *      obj: the JS object that can be constructed using elements from the selector.
         *      func: a string which is the name of a function in obj.
         *      masterElement: if this is passed through, only querySelect internal
         *          to this element.
         * Returns:
         *      list of elements which had an event bound to them.
         */
        registerEvents: function(elementSelector, evnt, obj, func, masterElement) {
            var self = this;
            // var boundList = [];
            // In order to correctly not rebind a function, we assign a uxfid
            // to each obj type.
            if (obj.uxfid === undefined) obj.uxfid = self.componentId++;
            // We need to create an array of elements we're going to apply
            // this event to.
            var elements;
            // If the user passes one of these three objects directly, we don't
            // need to do any more work.
            if (!(elementSelector === document || elementSelector === window || elementSelector == document.documentElement)){
                // If the user doesn't provide an element, we query the whole document.
                var selectr = masterElement ? masterElement : document;
                // We're always selecting elements inside the .jd class.
                elementSelector = ".jd " + elementSelector;
                elements = selectr.querySelectorAll(elementSelector);
                // If we don't return any elements, it may be that the provided 
                // masterElement is what we're looking for qSA doesn't check
                // selectr, so we manually check for a match.
                elements = (elements.length == 0 && masterElement && masterElement.matches(elementSelector)) ? [masterElement] : elements;
            } else {
                // If it's document or something like that, we just put it in 
                // an array so the loop works.
                elements = [elementSelector];
            }
            for (var i = 0; i < elements.length; i++) {
                // We need to construct an element to check it's shouldBind value.
                var o = new obj(elements[i]);
                // We're storing data about DOM elements in e.uxfd.
                var uxfd = 'uxfd';
                // We also need a unique identifier for each possible componenet and event.
                // This assumes that the same component will not bind two of the 
                // same event to the same selector. 
                var uniq = obj.uxfid + '!' + elementSelector + '!' + evnt;

                // We need to ensure we don't double bind an event.
                if (!elements[i][uxfd]) elements[i][uxfd] = {};
                if (!elements[i][uxfd][uniq] && (o['shouldBind'] === undefined || o['shouldBind']())) {
                    self.addEvent(elements[i], evnt, function(e) {
                        // We construct a new object. I don't think we can
                        // use 'o' from above because of scope.
                        var x = new obj(this);
                        // call the function provided, passing in the event as
                        // an argument.
                        x[func](e);
                    });
                    // boundList.push(elements[i]);
                }
                // Once a component/selector/event has bound, we don't want
                // to bind it again. If it is vitally important, this value
                // can be set to false manually.
                elements[i][uxfd][uniq] = true;
            }
            // return boundList;
        }


    };

    var H = new Help();
    H.defaultBinds = true;

    /* 
     * By default all of the content of the page is hidden. Once it's loaded
     * we want the page to show.
     * We do this to avoid a flash of unstyled content.
     */
    H.addLoadEvent(function() { H.addClass(document.documentElement,'jd-loaded')});

    return H
}());
