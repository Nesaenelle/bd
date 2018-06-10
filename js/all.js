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


// (function() {
//     var forms = document.querySelectorAll('.sm-form');

//     forms.forEach(function(form) {
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             // window.location.href = '/thx.html';
//         }, false);
//         addListenersToControls(form);
//     });



//     function addListenersToControls(form) {
//         form.querySelectorAll('input').forEach(function(item) {
//             item.addEventListener('input', function() {
//                 if (validate(this)) {
//                     this.setCustomValidity('');
//                     this.classList.remove('has-error');
//                     this.classList.add('valid');
//                 } else {
//                     this.setCustomValidity(this.getAttribute('title'))
//                     this.classList.add('has-error');
//                     this.classList.remove('valid')
//                 }
//             }, false);
//         });
//     }

//     function validate(control) {
//         var pattern = control.getAttribute('pattern');
//         var reg = new RegExp(pattern);
//         return pattern ? reg.test(control.value) : true;
//     }
// }());


(function() {
    var containers = document.querySelectorAll('[data-paralax-container]');
    var counterItems =document.querySelectorAll('[data-paralax]');

    // containers.forEach(function(container) {
    //     counterItems = document.querySelectorAll('[data-paralax]');
    // });



    window.addEventListener('mousemove', function(e) {
        var deltaX = -e.clientX * 0.005;
        deltaY = -e.clientY * 0.01;

        counterItems.forEach(function(item) {
            var valX = deltaX * parseFloat(item.getAttribute('data-paralax')) ;
            var valY = deltaY * parseFloat(item.getAttribute('data-paralax')) ;
            // console.log(valX);
            item.style.transform = 'translate(' + valX + 'px, ' + valY + 'px)';

        });
    }, false);

}());

// (function() {
//     var burgerBtn = document.querySelector('.header__burger');
//     var dropdown = document.querySelector('.header__burger__dropdown');

//     dropdown.querySelector('.header__burger__dropdown__close').addEventListener('click', function(e) {
//         dropdown.classList.remove('opened');
//     }, false);

//     burgerBtn.addEventListener('click', function(e) {
//         e.stopPropagation();
//         if (dropdown.classList.contains('opened')) {
//             dropdown.classList.remove('opened');
//         } else {
//             dropdown.classList.add('opened');
//         }
//     }, false);
//     window.addEventListener('click', function(e) {
//         if (!dropdown.contains(e.target)) {
//             dropdown.classList.remove('opened');
//         }
//     }, false);
// }());



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