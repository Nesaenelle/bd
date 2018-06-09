// (function() {
//     var slider = document.querySelector('[data-slider]');
//     if (slider) {
//         var slides = slider.querySelectorAll('.slider__item');
//         var controls = slider.querySelector('.slider__controls');
//         var scroller = slider.querySelector('.slider__scrollable');
//         var controlsArray = [];
//         var curSlide = 0;
//         slides.forEach(function(slide, index) {
//             var el = document.createElement('div');


//             el.className = index === 0 ? 'slider__controls__item active' : 'slider__controls__item';
//             slide.setAttribute('data-id', index);
//             el.setAttribute('data-id', index);

//             // slide.addEventListener('click', function() {
//             //     goTo(+this.getAttribute('data-id') + 1);
//             // });

//             el.addEventListener('click', function() {
//                 goTo(+this.getAttribute('data-id'));
//             }, false);

//             controlsArray.push(el);
//             controls.appendChild(el);
//         });

//         function goTo(index) {
//             if (index > slides.length - 1) {
//                 index = 0;
//             }
//             var width = slider.offsetWidth;
//             var control = controls.querySelector('[data-id="' + index + '"]');
//             controlsArray.forEach(function(r) { r.classList.remove('active') });
//             control.classList.add('active');
//             var offset = -width * index;
//             scroller.style.transform = 'translateX(' + offset + 'px)';
//             curSlide = index;
//         }

//         function resize() {
//             var width = slider.offsetWidth;
//             var offset = -width * curSlide;
//             scroller.style.transform = 'translateX(' + offset + 'px)';
//         }

//         window.addEventListener('resize', function() {
//             resize();
//             var resizeTimer;
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(function() {
//                 resize();
//             }, 250);
//         }, false);


//         setInterval(function() {
//             goTo(curSlide + 1);
//         }, 4000);
//     }
// }());


// function isScrolledIntoView(elem, offsetVal) {
//     var docViewTop = window.pageYOffset;
//     var docViewBottom = docViewTop + window.innerHeight;
//     var elemTop = offset(elem).top;
//     var elemBottom = elemTop + elem.clientHeight;
//     return docViewTop >= elemTop - (offsetVal || 200) /*- window.innerHeight*/ ; // /((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }

// function offset(el) {
//     var rect = el.getBoundingClientRect(),
//         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }

// function isInViewport(el) {
//     var top = el.offsetTop;
//     var left = el.offsetLeft;
//     var width = el.offsetWidth;
//     var height = el.offsetHeight;

//     while (el.offsetParent) {
//         el = el.offsetParent;
//         top += el.offsetTop;
//         left += el.offsetLeft;
//     }

//     return (
//         top < (window.pageYOffset + window.innerHeight) &&
//         left < (window.pageXOffset + window.innerWidth) &&
//         (top + height) > window.pageYOffset &&
//         (left + width) > window.pageXOffset
//     );
// };

// (function() {
//     var tabs = document.querySelectorAll('[data-navigation]');

//     window.addEventListener('scroll', function() {
//         tabs.forEach(function(elem) {
//             // if (isInViewport(elem)) {
//             if (isScrolledIntoView(elem)) {
//                 var id = elem.getAttribute('data-navigation');

//                 var links = document.querySelectorAll('[data-navigation-link');
//                 links.forEach(function(link) {
//                     if (link.getAttribute('data-navigation-link') === id) {
//                         link.classList.add('active');
//                     } else {
//                         link.classList.remove('active');
//                     }
//                 });
//             }
//         });
//     }, false);
// }());


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


// (function() {
//     var counterItems = document.querySelectorAll('[data-paralax]');
//     var images = document.querySelector('.about-block__images');

//     window.addEventListener('scroll', function(e) {
//         if (isInViewport(images)) {
//             counterItems.forEach(function(item) {
//                 var val = (offset(images).top - window.pageYOffset * 1.5) / 2 * parseFloat(item.getAttribute('data-paralax')); //checkScrollSpeed() + 'px';
//                 item.style.transform = 'translateY(' + (val > 0 ? val : 0) + 'px)'
//             });
//         }
//     });

//     // var checkScrollSpeed = (function(settings) {
//     //     settings = settings || {};

//     //     var lastPos, newPos, timer, delta,
//     //         delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

//     //     function clear() {
//     //         lastPos = null;
//     //         delta = 0;
//     //     }

//     //     clear();

//     //     return function() {
//     //         newPos = window.scrollY;
//     //         if (lastPos != null) { // && newPos < maxScroll 
//     //             delta = newPos - lastPos;
//     //         }
//     //         lastPos = newPos;
//     //         clearTimeout(timer);
//     //         timer = setTimeout(clear, delay);
//     //         return delta;
//     //     };
//     // })();
// }());

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