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

$('.scroller-1').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
});

$('.scroller-2').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2
});


initSlider();

function initSlider() {
    $('.scroller-1').slick('unslick');
    $('.scroller-2').slick('unslick');
    if(window.innerWidth < 780) {
       $('.scroller-1').slick({
           arrows: false,
           infinite: true,
           slidesToShow: 1,
           slidesToScroll: 1
       });

       $('.scroller-2').slick({
           arrows: false,
           infinite: true,
           slidesToShow: 1,
           slidesToScroll: 1
       });
    } else {
        $('.scroller-1').slick({
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });

        $('.scroller-2').slick({
            arrows: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2
        });
    }
}


setTimeout(function(){
    window.addEventListener('resize', function(){
        initSlider();
    }, false);
}, 500);




// $('.scroller-2').slick({
//     slidesToShow: 2,
//     // slidesToScroll: 1,
//     autoplay: true,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 2000,
// });


(function() {
    var calculators = document.querySelectorAll('[data-holiday-calculator]');

    calculators.forEach(function(calculator) {
        calculator.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            calculator.querySelector('[data-holiday-calculator-init]').classList.add('hidden');
            calculator.querySelector('[data-holiday-calculator-calculated]').classList.remove('hidden');
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
    var header = document.querySelector('.header__menu');
    check();
    window.addEventListener('scroll', function() {
        check();
    }, false);

    function check() {
        if (window.scrollY > 50) {
            document.body.classList.add('fixed-header');
            header.classList.add('slideInDown');

        } else {
            document.body.classList.remove('fixed-header');
            header.classList.remove('slideInDown');
        }
    }
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