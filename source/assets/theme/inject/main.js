$(document).on('bootstrap:before', function () {
    CONFIG.backToTopOptions = {
        duration: 1000,
        //easing: [0.83, 0.63, 0.07, 1.00]
        easing: 'easeInOutQuart'
    };
});

// Scroll to post-title if exists
$(document).on('bootstrap:after', function () {
    var $title = $('.container:not(.page-home) .post-block:not(.page) .post-title');
    if ($title.length > 0) {
        $title.velocity('scroll', { duration: 500 });
    }
});