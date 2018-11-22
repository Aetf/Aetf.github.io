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
    const sidebarArea = '.sidebar,.sidebar-toggle,.open-sidebar';
    $(document).on('sidebar.isShowing', function () {
        $('.container').on('click.hidesidebar', function (e) {
            if ($(e.target).is(sidebarArea)
                || $(e.target).parents(sidebarArea).length) {
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
        const contentText = ['My email address is my <a href="/about" >nickname</a> at this website.',
                             'Another address for academic use is included in my',
                             '<a href="/assets/dl/cv.pdf" target="_blank">CV</a>.',
                             '<br />',
                             '<span class="small">If you can\'t figure it out from the hints, well,',
                             'you might find emailing more of a challenge than',
                             'figuring out my address. ;)</span>'].join(' ');
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

    // copy function for research publication page
    function fallbackMessage(action) {
        var actionMsg = '';
        var actionKey = (action === 'cut' ? 'X' : 'C');

        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        } else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        } else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }

        return actionMsg;
    }

    var $pubBibtexs = $('.pub-list .pub-links .pub-link-bibtex');
    if ($pubBibtexs.length > 0) {
        var tooltip = new jBox('Tooltip', {
            id: 'copied-tooltip',
            position: {
                x: 'center',
                y: 'bottom'
            },
            outside: 'y',
            adjustPosition: true,
            adjustTracker: true,
            pointer: true,
            theme: 'TooltipDark',
        });
        function showTooltip(elem, msg) {
            tooltip.setContent(msg);
            tooltip.open({ target: elem });
        }

        $pubBibtexs.on('mouseleave', function () { tooltip.close(); });
        $pubBibtexs.on('blur', function () { tooltip.close(); });

        var cp = new ClipboardJS('.pub-list .pub-links .pub-link-bibtex');
        cp.on('success', function (e) {
            e.clearSelection();

            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            showTooltip(e.trigger, 'Copied!');
        });
        cp.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);

            showTooltip(e.trigger, fallbackMessage(e.action));
        });
    }

    var $pubAbstract = $('.pub-block .pub-link-abstract');
    if ($pubAbstract.length > 0) {
        $pubAbstract.on('click', function() {
            var $elem = $(this).closest('.pub-block').find('.pub-abstract');
            var slideDir = $elem.is(':visible') ? 'slideUp' : 'slideDown';
            $elem.velocity(slideDir);

            /*
            if (element.is(':visible')) {
                element.velocity({
                    opacity: 0,
                    translateX: '1rem',
                }, {
                    display: 'none'
                }, {
                    duration: 300
                }, 'easeInOutSine');
            } else {
                element.velocity({
                    opacity: 1,
                    translateX: '0',
                }, {
                    display: 'block'
                }, {
                    duration: 300
                }, 'easeInOutSine');
            }
            */
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
        scrollToTitle(function () { integrator.next() });
    });
});
