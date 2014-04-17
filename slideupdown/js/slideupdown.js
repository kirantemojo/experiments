// This plug-in needs to include JQUeryUI Library for the functionality 
// This Plugin is used fro responding to the mouse click event to slide vertically up and down in the positive y-axis

//Plug in - SlideUpDown
// NAme: A.Kiran Kumar
//Company : Kefex Studios

(function($) {
    'use strict';
    $.fn.slidy = function() {
        var sel = true;
        $(this).click(function() {
            $('.menu').slideUp();
            if(sel) {
                $(this).find('.menu').slideDown();
                sel = !sel; 
            }
            else
            {
               $(this).find('.menu').slideUp(); 
               sel = !sel;
            } 
            
        });
    }
})(jQuery);