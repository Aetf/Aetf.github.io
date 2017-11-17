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

    // install handler to all open sidebar links in text
    $('.open-sidebar').click(function (event) {
        event.preventDefault();
        NexT.utils.displaySidebar();
    });

    // auto close sidebar when click elsewhere
    $(document).on('sidebar.isShowing', function () {
        $('.container').on('click.hidesidebar', function (e) {
            if ($(e.target).is('.sidebar,.sidebar-toggle')
                || $(e.target).parents(".sidebar,.sidebar-toggle").length) {
                return;
            }
            NexT.utils.displaySidebar();
            $('.container').off('click.hidesidebar');
        });
    });
    $(document).on('sidebar.isHiding', function () {
        $('.container').off('click.hidesidebar');
    });

    // a popup explains email
    var $emailLink = $('#sidebar .links-of-author-item a[title="E-Mail"]');
    if ($emailLink.length > 0) {
        const contentText = `My email address is my nickname at this website.
                             Another address for academic use is included in my
                             <a href="/assets/dl/cv.pdf" target="_blank">CV</a>.
                             <br />
                             <span class="small">If you can't figure it out from the hints, well,
                             you might find emailing more of a challenge than
                             figuring out my address. ;)</span>`;
        // Initialize jBox
        $emailLink.addClass('email_tooltip_open');
        new jBox('Tooltip', {
            id: 'email_tooltip',
            attach: '.email_tooltip_open',
            preventDefault: true,
            trigger: 'click',
            content: contentText,
            getContent: null,
            maxWidth: '20em',
            position: {
                x: 'left',
                y: 'center'
            },
            onPosition: function () {
                // get current positioned value
                var pos = {};
                ['x', 'y'].forEach(axis => {
                    var prop = this.options.attributes[axis];
                    pos[prop] = parseInt(this.wrapper.css(prop), 10) || 0;
                }, this);
                // dynamically calculate offset
                var offset = $emailLink.position().left;
                pos[this.options.attributes.x] -= offset;
                // set back new value
                this.wrapper.css(pos);
            },
            outside: 'x',
            adjustPosition: true,
            adjustTracker: true,
            pointer: true,
            animation: 'move',
            theme: 'TooltipDark',
            closeOnEsc: true,
            closeOnClick: 'body',
            closeOnMouseleave: false
        });
    }
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
        cb();
        return;
    }
    var $title = $('.container:not(.page-home) #posts.posts-expand .post-block:not(.page) .post-title');
    if ($title.length > 0) {
        $title.velocity('scroll', {
            duration: 500,
            complete: function () {
                cb();
            }
        });
    } else {
        cb();
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
