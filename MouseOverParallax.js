/*

    MouseOverParallax.js

    Description: Element parallax based on mouse hover position
    Author: Matthew Morrison
    License: MIT
    Twitter: @stuffmattdoesnt
    Version: 1.0

    TODO

*/

/*
    Example HTML:

    <div class="paralax__container">
        <div class="paralax__image" style="background-image: url(<image-here>);">
        </div>
    </div>
*/

(function() {
    this.MouseOverParallax = function(container, params) {

        // console.log("MouseOverParallax");

        // ----------
        // Parameters
        // ----------

        var defaults = {
            parallaxItem : '.parallax-item',
            intensityX : 1,
            intensityY : 1,
            scaleFactor : 1.025,
            speed : 100
        }

        var myInstance = this;
        //  container: '.tile-fader-container',

        // Create options by extending defaults with the passed in arugments
        if (arguments[1] && typeof arguments[1] === "object") {
            this.options = extendDefaults(defaults, arguments[1]);
        }

        // Utility method to extend defaults with user options
        function extendDefaults(source, properties) {
            for (var property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }


       // ---------------
       // Public Functions
       // ---------------

        this.init = function() {
            var speed = this.options.speed / 1000;

            // if ($('.parallax__container').length > 0) {
                $(this.options.parallaxItem).css({
                    '-moz-transition' : speed + 's',
                      '-o-transition' : speed + 's',
                     '-ms-transition' : speed + 's',
                 '-webkit-transition' : speed + 's',
                         'transition' : speed + 's'
                });
            // }

            $(this.options.parallaxItem).mousemove(function (e) {
                myInstance.parallax(e, this);
            });

        }

        this.parallax = function(e, target) {
            // console.log("MouseOverParallax Move");
            scaleFactor = this.options.scaleFactor;
            intensityScales = {
                'x' : this.options.intensityX,
                'y' : this.options.intensityY
            };

            var x = ($(window).width() - target.offsetWidth) / 2 + (e.pageX - ($(window).width() / 2)) / 100 * intensityScales.x;
            var y = ($(window).height() - target.offsetHeight) / 2 + (e.pageY - ($(window).height() / 2)) / 100  * intensityScales.y;

            x = 0 - x;
            y = 0 - y;

            // console.log($(target));
            // console.log(intensityScales.x + ", " + intensityScales.y);

            $(target).css({
                '-webkit-transform' : 'translate3D(' + x  + 'px, ' + y + 'px, 0) scale(' + scaleFactor + ')',
                '-moz-transform'    : 'translate3D(' + x  + 'px, ' + y + 'px, 0) scale(' + scaleFactor + ')',
                '-ms-transform'     : 'translate3D(' + x  + 'px, ' + y + 'px, 0) scale(' + scaleFactor + ')',
                '-o-transform'      : 'translate3D(' + x  + 'px, ' + y + 'px, 0) scale(' + scaleFactor + ')',
                'transform' 		: 'translate3D(' + x  + 'px, ' + y + 'px, 0) scale(' + scaleFactor + ')'
            });
        }

        // --------------
        // Initialization
        // --------------

        myInstance.init();

    }
})();
