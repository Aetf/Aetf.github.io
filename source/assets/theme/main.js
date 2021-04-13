(function () {
    function hackBackToTop() {
        let backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            // completely replace the node. So existing event listeners are removed.
            backToTop.outerHTML = backToTop.outerHTML;
            backToTop = document.querySelector('.back-to-top');
            if (!backToTop) {
                return;
            }
            backToTop.addEventListener('click', () => {
                window.anime({
                    targets  : document.scrollingElement,
                    duration : 1000,
                    // material design's standard easing
                    easing   : 'cubicBezier(0.4, 0.0, 0.2, 1)',
                    scrollTop: 0
                });
            });
            // we also destroied the scroll event handler for backtoTop
            // so re-add it
            document.addEventListener('scroll', () => {
                const contentHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;
                backToTop.classList.toggle('back-to-top-on', Math.round(scrollPercent) >= 5);
                backToTop.querySelector('span').innerText = Math.round(scrollPercent) + '%';
            });
        }
    }

    function openSidebarLink() {
        // install handler to all open sidebar links in text
        document.querySelectorAll('.open-sidebar').forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                window.dispatchEvent(new Event('sidebar:show'));
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        hackBackToTop();
        openSidebarLink();
    });
    // reattach any handler after pjax load
    document.addEventListener('pjax:success', () => {
        openSidebarLink();
    });

    // make sure Prism doesn't auto load
    Prism = Prism || { };
    Prism.manual = true;
})();
