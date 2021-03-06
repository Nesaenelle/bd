function isScrolledIntoView(elem, offsetVal) {
    var docViewTop = window.pageYOffset;
    var docViewBottom = docViewTop + window.innerHeight;
    var elemTop = offset(elem).top;
    var elemBottom = elemTop + elem.clientHeight;
    return docViewTop >= elemTop - (offsetVal || 200) /*- window.innerHeight*/ ; // /((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function isInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};

(function() {
    var tabs = document.querySelectorAll('[data-navigation]');
    var links = document.querySelectorAll('[data-navigation-link]');

    window.addEventListener('scroll', function() {
        tabs.forEach(function(elem) {
            // if (isInViewport(elem)) {
            if (isScrolledIntoView(elem)) {
                var id = elem.getAttribute('data-navigation');

                var links = document.querySelectorAll('[data-navigation-link');
                links.forEach(function(link) {
                    if (link.getAttribute('data-navigation-link') === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, false);

    var interval;
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var id = this.getAttribute('data-navigation-link');
            var elem = document.querySelector('[data-navigation="' + id + '"]');
            if (elem) {
                window.scroll({ top: offset(elem).top - 100, left: 0, behavior: 'smooth' });
            }
        }, false);
    })

}());



(function() {
    var containers = document.querySelectorAll('[data-paralax-container]');
    var counterItems = document.querySelectorAll('[data-paralax]');

    // containers.forEach(function(container) {
    //     counterItems = document.querySelectorAll('[data-paralax]');
    // });



    window.addEventListener('mousemove', function(e) {
        var deltaX = -e.clientX * 0.005;
        deltaY = -e.clientY * 0.01;

        counterItems.forEach(function(item) {
            var valX = deltaX * parseFloat(item.getAttribute('data-paralax'));
            var valY = deltaY * parseFloat(item.getAttribute('data-paralax'));
            // console.log(valX);
            item.style.transform = 'translate(' + valX + 'px, ' + valY + 'px)';

        });
    }, false);

}());




(function() {
    var scrollerConts = document.querySelectorAll('[data-scroller]');

    var Events = function() {
        this.coll = [];
        this.on = function(func) {
            this.coll.push(func)
        }
        this.trigger = function(e) {
            this.coll.forEach(function(func) {
                func(e);
            })
        }
    };

    var fn = new Events();

    scrollerConts.forEach(function(scrollerCont, index) {
        var offsetVal = 60;
        var id = scrollerCont.getAttribute('data-scroller');
        var items = scrollerCont.querySelectorAll('[data-scroller-item="' + id + '"]');
        var wrapper = scrollerCont.querySelector('.horizontal-slider__container_wrapper');
        var itemWidth = items[0].clientWidth;
        var itemHeight = items[0].clientHeight;
        var scroller = scrollerCont.querySelector('.scroller');
        var width = itemWidth * items.length;


        scroller.style.width = itemWidth * items.length + 'px';

        scrollerCont.style.height = wrapper.clientHeight + width + 'px';


        fn.on(function(e) {
            if(window.innerWidth >= 768 && id === '1' || id === '2') {            
                var startPoint = offset(scrollerCont).top - offsetVal;
                var fullHeight = (startPoint + width /*- window.outerWidth*/ );

                if (isScrolledIntoView(scrollerCont, offsetVal) && window.pageYOffset < fullHeight) {
                    var procent = (window.pageYOffset - startPoint) / (fullHeight - startPoint);
                    procent = procent < 0 ? 0 : procent;

                    var step = width - window.outerWidth + (index ? 20 * items.length : offsetVal / 2);

                    scrollerCont.classList.add('fixed');
                    scrollerCont.classList.remove('absolute');
                    var transX = -step * procent + 'px';
                    scroller.style.transform = 'translate(' + transX + ')';
                    wrapper.style.top = offsetVal + 'px';
                } else if (isScrolledIntoView(scrollerCont, offsetVal) && window.pageYOffset >= fullHeight) {
                    scrollerCont.classList.add('absolute');
                    scrollerCont.classList.remove('fixed');
                    wrapper.style.top = width + 'px';

                } else {
                    wrapper.style.top = 0 + 'px';
                    scrollerCont.classList.remove('absolute');
                    scrollerCont.classList.remove('fixed');
                    scroller.style.transform = 'translate(' + 0 + 'px)';
                }

                scrollerCont.style.height = wrapper.clientHeight + width + 'px';
            }
        })
    });

    window.addEventListener('scroll', function(e) {
        fn.trigger(e);
    });
}());


(function() {
    var calculators = document.querySelectorAll('[data-holiday-calculator]');

    calculators.forEach(function(calculator) {
        calculator.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            calculator.querySelector('[data-holiday-calculator-init]').classList.add('hidden');
            calculator.querySelector('[data-holiday-calculator-calculated]').classList.remove('hidden');


            document.querySelector('.birthday-calculator__form-info_descr.last').classList.add('hidden');
        }, false);
    });
}());

(function() {

    var dropdowns;

    dropdownsInit();

    function dropdownsInit() {
        dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dropdown) {

            var valElem = dropdown.querySelector('.dropdown-value');
            var items = dropdown.querySelectorAll('ul li');

            valElem.addEventListener('click', function() {
                if (dropdown.classList.contains('opened')) {
                    dropdown.classList.remove('opened');
                } else {
                    dropdown.classList.add('opened');
                }
            }, false);

            items.forEach(function(r) {
                r.addEventListener('click', function() {
                    items.forEach(function(r) { r.classList.remove('selected') });
                    this.classList.add('selected');
                    // valElem.classList.add('dirty');
                    valElem.value = this.innerHTML;
                    dropdown.classList.remove('opened');
                });
            })

        });
    }

    window.addEventListener('click', function(e) {
        dropdowns.forEach(function(res) {
            if (!res.contains(e.target)) {
                res.classList.remove('opened');
            }
        });
    }, false);

}());

(function() {
    var lastScrollTop = 0;
    var header = document.querySelector('.header__menu');
    check();
    window.addEventListener('scroll', function(e) {
        check(e);
    }, false);

    function check(e) {
        if (window.scrollY > 50) {
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            header.classList.remove('on-top');
            if (st < lastScrollTop) {
                header.classList.add('is-visible');
                header.classList.remove('is-hidden');

            } else {
                header.classList.remove('is-visible');
                header.classList.add('is-hidden');
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        } else {
            header.classList.remove('is-visible');
            header.classList.add('on-top');
        }
    }
}());


(function() {
    var burger = document.querySelector('[data-burger]');
    var menuContainer = document.querySelector('.dropdown-menu');

    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (burger.classList.contains('active')) {
            burger.classList.remove('active');
        } else {
            burger.classList.add('active');
        }

    }, false);

    window.addEventListener('click', function(e) {
        if (!menuContainer.contains(e.target)) {
            burger.classList.remove('active');
        }
    }, false);

}());



$(document).ready(function() {
    $('.date-mask').mask("00.00.0000", { placeholder: "__.__.____" });
    $('.phone-mask').mask("+7(000) 000-00-00", { placeholder: "+7(000) 000-00-00" });
});



var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}