"use strict";

var MenuToggle = {
    menuState: false,
    handleSwipeState: true,
    toggle: function toggle(state) {
        this.menuState = state;

        var trValue = void 0;
        if ($(window).width() < 768) {
            trValue = 270;
        } else {
            trValue = 625;
        };

        // console.log(this.menuState)

        $('body').animateTransform("translateX(-" + trValue + "px)");
        $('html').toggleClass('toggle');
        $('.shadow-toggle').toggle();
        $('.fly').toggleClass('flying');

        if (!this.menuState) {
            $('body').animateTransform("translateX(0)");
        }
    },
    close: function close() {
        // Если мобильное меню открыто - закрыть
        if (MenuToggle.menuState) {
            $('body').animateTransform("translateX(0)");
            // MenuToggle.toggle(false);
            MenuToggle.toggle();
            MenuToggle.handleSwipeState = true;
        }
    }
};

var LoginToggle = {
    loginState: true,
    loginStateToggle: function loginStateToggle() {
        this.login(this.loginState);
        this.loginState = !this.loginState;
    },
    login: function login(flag) {
        $('body').toggleClass('overflow-hidden');
        $('.login-form-btn').toggleClass('white');
        $('.login-area__shadow,.login-area__inner').fadeToggle();
        if (!flag) {
            $('.login-form-btn').text('Войти');
        } else {
            $('.login-form-btn').text('Скрыть');
        };
    }
};

function rotateNouisliderHandler() {
    var array = [];

    for (var i = 0; i < arguments.length; i++) {
        array.push(arguments[i]);
    }

    array.map(function (el) {
        el.noUiSlider.on('update', function () {
            var thisEl = this.target,
                rotateDeg = $(thisEl).find($('.noUi-origin')).css('left').replace('px', ''),

            // rotateDegValue = rotateDeg * 3,
            handler = $(thisEl).find('.noUi-handle');

            handler.css("transform", "rotate(" + rotateDeg + "deg)");
        });
    });
}

$(document).ready(function () {

    $('#modal_2').modal();

    $('.navigation__toggle').click(function () {

        var navParentList = $('.navigation__list');

        navParentList.toggleClass('open');
    });

    // LoginToggle.loginStateToggle();

    // $('#modal_2').modal();

    $('.mobile-menu_close').click(function () {
        $(window).scrollTop(0);
        MenuToggle.toggle();
        LoginToggle.loginStateToggle();
    });

    $('.login-form_toggle').click(function () {
        LoginToggle.loginStateToggle();
    });

    $('.menu-toggle').click(function () {
        if ($(this).hasClass('shadow-toggle')) {
            MenuToggle.toggle(false);
        } else {
            MenuToggle.toggle(true);
        }
        MenuToggle.handleSwipeState = true;
    });

    var startX = null;
    var deltaX = null;
    var handleSwipeState = true;
    var isLeftSwipe = false;

    document.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        this.addEventListener('touchmove', function (e) {
            deltaX = e.targetTouches[0].pageX - startX;
            isLeftSwipe = Math.sign(deltaX) === 1;

            if (Math.abs(deltaX) >= 50 && handleSwipeState) {
                if (isLeftSwipe && MenuToggle.menuState) {
                    // MenuToggle.toggle(false);
                    MenuToggle.close();
                } else if (!isLeftSwipe && !MenuToggle.menuState && LoginToggle.loginState) {
                    MenuToggle.toggle(true);
                }

                // MenuToggle.handleSwipeState = false;
            }
        });

        this.addEventListener('touchend', function () {
            MenuToggle.handleSwipeState = true;
        });
    });

    var sliderAmount = document.getElementById('slider_amount');
    var sliderRange = document.getElementById('slider_range');

    if (sliderAmount && sliderRange) {
        noUiSlider.create(sliderAmount, {
            start: 1000,
            step: 1000,
            behaviour: 'snap',
            connect: [true, false],
            // format: wNumb({
            //     decimals: 0,
            //     thousand: ' '
            // }),
            range: {
                'min': [1000],
                'max': [80000]
            },
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 1000,
                // stepped: false,
                format: wNumb({
                    decimals: 0,
                    thousand: '.'
                })
                // pips: {
                //     mode: 'positions',
                //     values: [0,50,100],
                //     density: 10,
                //     stepped: false
                // }
            } });

        noUiSlider.create(sliderRange, {
            start: 1,
            step: 1,
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': 1,
                'max': 4
            }
        });

        rotateNouisliderHandler(sliderAmount, sliderRange);
    }

    $('[data-toggle="tooltip"]').tooltip({ placement: "bottom" });

    // $('.navigation__list a').click(function(){
    //     $('.navigation__link').removeClass('active');
    //     // $(this).tab('show').addClass('active');
    // });


    $('.select__inner').each(function () {
        var $box = $(this).siblings('.input-wrap').find('.select__content');
        $(this).select2({
            dropdownParent: $box
        });
    });

    // $(document).on('click','.shadow-toggle',function(){
    //     MenuToggle.toggle(false)
    // });


    // question items
    $('.question-container .question:first-child').each(function () {
        $(this).find('.question__header').addClass('active');
        $(this).find('.question__text').slideDown(300);
    });

    // open question items
    $(document).on('click', '.question__header:not(.active)', function () {
        $('.question__header').removeClass('active').siblings($('.question__text')).slideUp(300);
        $(this).addClass('active').siblings($('.question__text')).slideToggle(300);

        // $('.question__icon ').find($('use')).attr('xlink:href', '#arrow_down');
        // $(this).find($('use')).attr('xlink:href', '#delete');

        return false;
    });

    //article picture
    $('.article__pic').each(function () {
        var thisImgSrc = $(this).find('.article__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        });
    });

    //articles picture
    $('.article-prev__pic').each(function () {
        var thisImgSrc = $(this).find('.article-prev__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        });
    });

    $('body').removeClass('loader');
});

$(document).on('scroll ready', function () {
    var winOffsetTop = $(window).scrollTop();
    // $('#main_menu').css('top',winOffsetTop)
    $('.menu__top-listener').css('top', winOffsetTop);
});

$(window).resize(function () {
    MenuToggle.close();
});

// $(document).on('pagecreate', function(event){
//     $(document).on('swipeleft swiperight', function() {
//         if($(window).width() < 992) {
//             MenuToggle.open()
//         }
//     });
// });


// $(document).on('mobileinit', function () {
//     $.mobile.ignoreContentEnabled = true;
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNsb3NlIiwiTG9naW5Ub2dnbGUiLCJsb2dpblN0YXRlIiwibG9naW5TdGF0ZVRvZ2dsZSIsImxvZ2luIiwiZmxhZyIsImZhZGVUb2dnbGUiLCJ0ZXh0Iiwicm90YXRlTm91aXNsaWRlckhhbmRsZXIiLCJhcnJheSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwibWFwIiwiZWwiLCJub1VpU2xpZGVyIiwib24iLCJ0aGlzRWwiLCJ0YXJnZXQiLCJyb3RhdGVEZWciLCJmaW5kIiwiY3NzIiwicmVwbGFjZSIsImhhbmRsZXIiLCJkb2N1bWVudCIsInJlYWR5IiwibW9kYWwiLCJjbGljayIsIm5hdlBhcmVudExpc3QiLCJzY3JvbGxUb3AiLCJoYXNDbGFzcyIsInN0YXJ0WCIsImRlbHRhWCIsImlzTGVmdFN3aXBlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJNYXRoIiwic2lnbiIsImFicyIsInNsaWRlckFtb3VudCIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyUmFuZ2UiLCJjcmVhdGUiLCJzdGFydCIsInN0ZXAiLCJiZWhhdmlvdXIiLCJjb25uZWN0IiwicmFuZ2UiLCJwaXBzIiwibW9kZSIsInZhbHVlcyIsImRlbnNpdHkiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwidGhvdXNhbmQiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwiZWFjaCIsIiRib3giLCJzaWJsaW5ncyIsInNlbGVjdDIiLCJkcm9wZG93blBhcmVudCIsImFkZENsYXNzIiwic2xpZGVEb3duIiwicmVtb3ZlQ2xhc3MiLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJ0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OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTWVudVRvZ2dsZSA9IHtcclxuICAgIG1lbnVTdGF0ZTogZmFsc2UsXHJcbiAgICBoYW5kbGVTd2lwZVN0YXRlOiB0cnVlLFxyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMubWVudVN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCB0clZhbHVlO1xyXG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XHJcbiAgICAgICAgICAgIHRyVmFsdWUgPSAyNzA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJWYWx1ZSA9IDYyNTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1lbnVTdGF0ZSlcclxuXHJcbiAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKC1cIit0clZhbHVlK1wicHgpXCIpO1xyXG4gICAgICAgICQoJ2h0bWwnKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XHJcbiAgICAgICAgJCgnLnNoYWRvdy10b2dnbGUnKS50b2dnbGUoKTtcclxuICAgICAgICAkKCcuZmx5JykudG9nZ2xlQ2xhc3MoJ2ZseWluZycpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5tZW51U3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKDApXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINCV0YHQu9C4INC80L7QsdC40LvRjNC90L7QtSDQvNC10L3RjiDQvtGC0LrRgNGL0YLQviAtINC30LDQutGA0YvRgtGMXHJcbiAgICAgICAgaWYoTWVudVRvZ2dsZS5tZW51U3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKDApXCIpO1xyXG4gICAgICAgICAgICAvLyBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgTG9naW5Ub2dnbGUgPSB7XHJcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxyXG4gICAgbG9naW5TdGF0ZVRvZ2dsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvZ2luKHRoaXMubG9naW5TdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcclxuICAgIH0sXHJcbiAgICBsb2dpbjogZnVuY3Rpb24oZmxhZykge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudG9nZ2xlQ2xhc3MoJ3doaXRlJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWFyZWFfX3NoYWRvdywubG9naW4tYXJlYV9faW5uZXInKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgaWYoIWZsYWcpIHtcclxuICAgICAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudGV4dCgn0JLQvtC50YLQuCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRleHQoJ9Ch0LrRgNGL0YLRjCcpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiByb3RhdGVOb3Vpc2xpZGVySGFuZGxlcigpIHtcclxuICAgIGxldCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goYXJndW1lbnRzW2ldKVxyXG4gICAgfVxyXG5cclxuICAgIGFycmF5Lm1hcCgoZWwpPT57XHJcbiAgICAgICAgZWwubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHRoaXNFbCA9IHRoaXMudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgcm90YXRlRGVnID0gJCh0aGlzRWwpLmZpbmQoJCgnLm5vVWktb3JpZ2luJykpLmNzcygnbGVmdCcpLnJlcGxhY2UoJ3B4JywnJyksXHJcbiAgICAgICAgICAgICAgICAvLyByb3RhdGVEZWdWYWx1ZSA9IHJvdGF0ZURlZyAqIDMsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gJCh0aGlzRWwpLmZpbmQoJy5ub1VpLWhhbmRsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY3NzKFwidHJhbnNmb3JtXCIsXCJyb3RhdGUoXCIrcm90YXRlRGVnK1wiZGVnKVwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJCgnI21vZGFsXzInKS5tb2RhbCgpXHJcblxyXG4gICAgJCgnLm5hdmlnYXRpb25fX3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGxldCBuYXZQYXJlbnRMaXN0ID0gJCgnLm5hdmlnYXRpb25fX2xpc3QnKTtcclxuXHJcbiAgICAgICAgbmF2UGFyZW50TGlzdC50b2dnbGVDbGFzcygnb3BlbicpXHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGVUb2dnbGUoKTtcclxuXHJcbiAgICAvLyAkKCcjbW9kYWxfMicpLm1vZGFsKCk7XHJcblxyXG4gICAgJCgnLm1vYmlsZS1tZW51X2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xyXG4gICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKCk7XHJcbiAgICAgICAgTG9naW5Ub2dnbGUubG9naW5TdGF0ZVRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmxvZ2luLWZvcm1fdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcubWVudS10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3NoYWRvdy10b2dnbGUnKSkge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHN0YXJ0WCA9IG51bGw7XHJcbiAgICBsZXQgZGVsdGFYID0gbnVsbDtcclxuICAgIGxldCBoYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuICAgIGxldCBpc0xlZnRTd2lwZSA9IGZhbHNlO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBzdGFydFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZGVsdGFYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gc3RhcnRYO1xyXG4gICAgICAgICAgICBpc0xlZnRTd2lwZSA9IE1hdGguc2lnbihkZWx0YVgpID09PSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPj0gNTAgJiYgaGFuZGxlU3dpcGVTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGVmdFN3aXBlICYmIE1lbnVUb2dnbGUubWVudVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1lbnVUb2dnbGUuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNMZWZ0U3dpcGUgJiYgIU1lbnVUb2dnbGUubWVudVN0YXRlICYmIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGxldCBzbGlkZXJBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX2Ftb3VudCcpO1xyXG4gICAgbGV0IHNsaWRlclJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcl9yYW5nZScpO1xyXG5cclxuICAgIGlmKHNsaWRlckFtb3VudCAgJiYgc2xpZGVyUmFuZ2UpIHtcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJBbW91bnQsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IDEwMDAsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEwMDAsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICAvLyBmb3JtYXQ6IHdOdW1iKHtcclxuICAgICAgICAgICAgLy8gICAgIGRlY2ltYWxzOiAwLFxyXG4gICAgICAgICAgICAvLyAgICAgdGhvdXNhbmQ6ICcgJ1xyXG4gICAgICAgICAgICAvLyB9KSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiBbMTAwMF0sXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogWzgwMDAwXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaXBzOiB7XHJcbiAgICAgICAgICAgICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogWzAsMTAwXSxcclxuICAgICAgICAgICAgICAgIGRlbnNpdHk6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAvLyBzdGVwcGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogd051bWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRob3VzYW5kOiAnLidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGlwczoge1xyXG4gICAgICAgICAgICAvLyAgICAgbW9kZTogJ3Bvc2l0aW9ucycsXHJcbiAgICAgICAgICAgIC8vICAgICB2YWx1ZXM6IFswLDUwLDEwMF0sXHJcbiAgICAgICAgICAgIC8vICAgICBkZW5zaXR5OiAxMCxcclxuICAgICAgICAgICAgLy8gICAgIHN0ZXBwZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyUmFuZ2UsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IDEsXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvdGF0ZU5vdWlzbGlkZXJIYW5kbGVyKHNsaWRlckFtb3VudCxzbGlkZXJSYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe3BsYWNlbWVudDogXCJib3R0b21cIn0pO1xyXG5cclxuICAgIC8vICQoJy5uYXZpZ2F0aW9uX19saXN0IGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICQoJy5uYXZpZ2F0aW9uX19saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gICAgIC8vICQodGhpcykudGFiKCdzaG93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgICQoJy5zZWxlY3RfX2lubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCAkYm94ID0gJCh0aGlzKS5zaWJsaW5ncygnLmlucHV0LXdyYXAnKS5maW5kKCcuc2VsZWN0X19jb250ZW50Jyk7XHJcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRib3hcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywnLnNoYWRvdy10b2dnbGUnLGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgLy8gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19oZWFkZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX3RleHQnKS5zbGlkZURvd24oMzAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG9wZW4gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucXVlc3Rpb25fX2hlYWRlcjpub3QoLmFjdGl2ZSknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnF1ZXN0aW9uX19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygkKCcucXVlc3Rpb25fX3RleHQnKSkuc2xpZGVUb2dnbGUoMzAwKTtcclxuXHJcbiAgICAgICAgLy8gJCgnLnF1ZXN0aW9uX19pY29uICcpLmZpbmQoJCgndXNlJykpLmF0dHIoJ3hsaW5rOmhyZWYnLCAnI2Fycm93X2Rvd24nKTtcclxuICAgICAgICAvLyAkKHRoaXMpLmZpbmQoJCgndXNlJykpLmF0dHIoJ3hsaW5rOmhyZWYnLCAnI2RlbGV0ZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FydGljbGUgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGVfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGVfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYXJ0aWNsZXMgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGUtcHJldl9fcGljJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZS1wcmV2X19pbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRlcicpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdzY3JvbGwgcmVhZHknLGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgd2luT2Zmc2V0VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgLy8gJCgnI21haW5fbWVudScpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXHJcbiAgICAkKCcubWVudV9fdG9wLWxpc3RlbmVyJykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgTWVudVRvZ2dsZS5jbG9zZSgpXHJcbn0pO1xyXG5cclxuLy8gJChkb2N1bWVudCkub24oJ3BhZ2VjcmVhdGUnLCBmdW5jdGlvbihldmVudCl7XHJcbi8vICAgICAkKGRvY3VtZW50KS5vbignc3dpcGVsZWZ0IHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDk5Mikge1xyXG4vLyAgICAgICAgICAgICBNZW51VG9nZ2xlLm9wZW4oKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuXHJcblxyXG4vLyAkKGRvY3VtZW50KS5vbignbW9iaWxlaW5pdCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICQubW9iaWxlLmlnbm9yZUNvbnRlbnRFbmFibGVkID0gdHJ1ZTtcclxuLy8gfSk7Il19
