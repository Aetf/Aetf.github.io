var ucw = ucw || {};

// a string format implementation
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

$(function(){
// Fixed Action Button 
    // change icon on hover   
    $(".fixed-action-btn").hover(function() {
        $('.fixed-action-btn').not('.scrolled')
            .find('.btn-large .material-icons')
            .text(ucw.fab_main_icon_hover);
    },
    function() {
        $('.fixed-action-btn').not('.scrolled')
            .find('.btn-large .material-icons')
            .text(ucw.fab_main_icon);
    });

    // sticky scroll effect
    var menuItem = $('#fab_alt_main').detach();

    new Waypoint({
        element: $(ucw.waypoint_selector)[0],
        handler: function(direction) {
            var scrolled = (direction === 'down');
            var $fab = $(".fixed-action-btn.fab");
            if (scrolled) {
                $fab.find("ul").append(menuItem);
                // ensure appended item is displayed
                if ($fab.hasClass("active"))
                    $fab.closeFAB();

                $fab.find("a.btn-large").attr("href", "#page-top");
                $fab.find("a.btn-large").attr("fab-label", "Back to Top");
                $fab.find('.btn-large .material-icons').text('keyboard_arrow_up');
            } else {
                menuItem.detach();
                $fab.find("a.btn-large").attr("href", menuItem.find('a').attr('href'));
                $fab.find("a.btn-large").attr("fab-label", menuItem.find('a').attr('fab-label'));
                $fab.find('.btn-large .material-icons').text(ucw.fab_main_icon);
            }
            $fab.toggleClass('scrolled', scrolled);
            if (ucw.fab_main_color !== ucw.fab_main_color_dark) {
                $fab.find('.btn-large').toggleClass(ucw.fab_main_color, !scrolled);
                $fab.find('.btn-large').toggleClass(ucw.fab_main_color_dark, scrolled);
            }
            ucw.fab_toggled_state(scrolled);
        }
    });

// Sticky Navigation Bar
    var $ucwnav = $('.ucw-nav');
    if ($ucwnav.length) {
        // move nav up
        $ucwnav.css("top", -$ucwnav.find('nav').outerHeight(true));
        
        new Waypoint({
            element: $ucwnav,
            handler: function(direction) {
                var shouldBeStuck = direction === "down";
                var wrapperHeight = shouldBeStuck ?
                    $ucwnav.find('nav').outerHeight(true) : '';

                $ucwnav.height(wrapperHeight);
                $ucwnav.toggleClass('navbar-fixed', shouldBeStuck);
            }
        });
    }

// Smooth scroll
    $('a.smooth-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
             && location.hostname == this.hostname) {
            var target = $(this.hash);
            var nav = $('.ucw-nav nav');
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var scrollTop = target.offset().top;
                if (nav.length && scrollTop > nav.offset().top ) {
                    scrollTop += nav.height();
                }
                $('html,body').stop().animate({
                    scrollTop: scrollTop
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });
});