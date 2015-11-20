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
    var menuItem = $(
            ('<li>' +
             '<a href="{0}" fab-label="{1}" class="page-scroll btn-floating red">' +
             '<i class="material-icons">{2}</i>' +
             '</a>')
            .format(ucw.fab_main_link, ucw.fab_main_label, ucw.fab_main_icon));

    new Waypoint({
        element: $(ucw.waypoint_selector)[0],
        handler: function(direction) {
            var scrolled = (direction === 'down');
            if (scrolled) {
                $(".fixed-action-btn.fab ul").append(menuItem);
                // ensure appended item is displayed
                $(".fixed-action-btn.fab").openFAB();

                $(".fixed-action-btn.fab a.btn-large").attr("href", "#page-top");
                $(".fixed-action-btn.fab a.btn-large").attr("fab-label", "Back to Top");
                $('.fixed-action-btn.fab .btn-large .material-icons')
                    .text('keyboard_arrow_up');
            } else {
                menuItem.detach();
                $(".fixed-action-btn a.btn-large").attr("href", ucw.fab_main_link);
                $(".fixed-action-btn a.btn-large").attr("fab-label", ucw.fab_main_label);
                $('.fixed-action-btn .btn-large .material-icons')
                    .text(ucw.fab_main_icon);
            }
            $('.fixed-action-btn').toggleClass('scrolled', scrolled);
            $('.fixed-action-btn .btn-large').toggleClass(ucw.fab_main_color_dark, scrolled);
            $('.fixed-action-btn .btn-large').toggleClass(ucw.fab_main_color, !scrolled);
            ucw.fab_toggled_state(scrolled);
        }
    });

// Sticky Navigation Bar
    var ucwnav = $('.ucw-nav');
    if (ucwnav.length) {
        new Waypoint({
            element: ucwnav,
            handler: function(direction) {
                var shouldBeStuck = direction === "down";
                var wrapperHeight = shouldBeStuck ?
                    $('.ucw-nav nav').outerHeight(true) : '';

                $('.ucw-nav').height(wrapperHeight);
                $('.ucw-nav').toggleClass('navbar-fixed', shouldBeStuck);
            }
        });
    }

// Smooth scroll
    $('a.smooth-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
             && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var offset = $('.ucw-nav nav').length ? $('.ucw-nav nav').height() : 0;
                $('html,body').stop().animate({
                    scrollTop: target.offset().top + offset
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });
});