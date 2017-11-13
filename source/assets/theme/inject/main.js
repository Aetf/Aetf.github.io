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

// Scroll to post-title if only on post page
/*
$(document).on('bootstrap:after', function () {
});
*/
Pace.on('hide', function () {
    var $title = $('.container:not(.page-home) .post-block:not(.page) .post-title');
    if ($title.length > 0) {
        $title.velocity('scroll', { duration: 500 });
    }
});