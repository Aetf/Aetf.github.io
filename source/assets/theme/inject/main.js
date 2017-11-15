$(document).on('bootstrap:before', function () {
    CONFIG.backToTopOptions = {
        duration: 1000,
        //easing: [0.83, 0.63, 0.07, 1.00]
        easing: 'easeInOutQuart'
    };

    // fancybox defaults
    /*
     * For some reason zoom animation doesn't work.
     * Fancybox thinks the thumbnail is not visible in all parents
     */
    //$.fancybox.defaults.animationEffect = 'zoom';
    $.fancybox.defaults.animationEffect = 'fade';
    $.fancybox.defaults.transitionEffect = 'fade';
    $.fancybox.defaults['buttons'] = ['close'];
});

/*
$(document).on('bootstrap:after', function () {
});
*/

// Scroll to post-title if only on post page
// take note of initial position
var initialOffset = window.pageYOffset;
function scrollToTitle(cb) {
    if (window.pageYOffset !== initialOffset) {
        // the user has scrolled manually before page finish loading.
        // Don't scroll in this case.
        return;
    }
    var $title = $('.container:not(.page-home) .post-block:not(.page) .post-title');
    if ($title.length > 0) {
        $title.velocity('scroll', {
            duration: 500,
            complete: function () {
                cb();
            }
        });
    }
}

$(document).on('motion:before', function () {
    NexT.motion.integrator.add(function (integrator) {
        if (CONFIG.motion.async) {
            integrator.next();
        }
        scrollToTitle(function() { integrator.next() });
    });
})
