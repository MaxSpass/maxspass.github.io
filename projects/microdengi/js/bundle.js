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
        $('.login-form-btn').toggleClass('button_light button_dark');
        $('.login-area__shadow,.login-area__inner').fadeToggle();
        if (!flag) {
            $('.login-form-btn').text('Войти');
        } else {
            $('.login-form-btn').text('Скрыть');
        };
    }
};

$(document).ready(function () {

    $('.navigation__toggle').click(function () {

        var navParentList = $('.navigation__list');

        navParentList.toggleClass('open');

        // let navParentList = $('.navigation__list'),
        //     navItems = navParentList.find('.navigation__item'),
        //     fullHeight = navItems.length * $(navItems).height();
        //
        // navParentList.toggle(
        //     function() {
        //         navParentList.animate({
        //                     'height':fullHeight,
        //                     'display': 'flex'
        //                 },350)
        //     },
        //     function() {
        //         navParentList.animate({
        //             'height':$(this).height() + 'px',
        //             'display': 'flex'
        //         },350)
        //     }
        // );
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

    document.querySelector('html').addEventListener('touchstart', function (e) {
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

    if (sliderAmount) {
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
                'min': 1000,
                'max': 80000
            }
            // pips: {
            //     mode: 'positions',
            //     values: [0,50,100],
            //     density: 10,
            //     stepped: false
            // }
        });
    }

    if (sliderRange) {
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
    }

    // $('.navigation__list a').tab();

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

    // numbering question items
    // $('.question-container .question').each(function(){
    //     let num = $(this).index() + 1;
    //     if(num > 9) {
    //         $(this).find('.question__number').text(num);
    //     } else {
    //         $(this).find('.question__number').text('0' + num);
    //     }
    // });

    // open question items
    $(document).on('click', '.question__header:not(.active)', function () {
        $('.question__header').removeClass('active').siblings($('.question__text')).slideUp(300);
        $(this).addClass('active').siblings($('.question__text')).slideToggle(300);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNsb3NlIiwiTG9naW5Ub2dnbGUiLCJsb2dpblN0YXRlIiwibG9naW5TdGF0ZVRvZ2dsZSIsImxvZ2luIiwiZmxhZyIsImZhZGVUb2dnbGUiLCJ0ZXh0IiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrIiwibmF2UGFyZW50TGlzdCIsInNjcm9sbFRvcCIsImhhc0NsYXNzIiwic3RhcnRYIiwiZGVsdGFYIiwiaXNMZWZ0U3dpcGUiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJNYXRoIiwic2lnbiIsImFicyIsInNsaWRlckFtb3VudCIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyUmFuZ2UiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJzdGVwIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwidG9vbHRpcCIsInBsYWNlbWVudCIsImVhY2giLCIkYm94Iiwic2libGluZ3MiLCJmaW5kIiwic2VsZWN0MiIsImRyb3Bkb3duUGFyZW50IiwiYWRkQ2xhc3MiLCJzbGlkZURvd24iLCJvbiIsInJlbW92ZUNsYXNzIiwic2xpZGVVcCIsInNsaWRlVG9nZ2xlIiwidGhpc0ltZ1NyYyIsImF0dHIiLCJjc3MiLCJ3aW5PZmZzZXRUb3AiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsYUFBYTtBQUNmQyxlQUFXLEtBREk7QUFFZkMsc0JBQWtCLElBRkg7QUFHZkMsWUFBUSxnQkFBU0MsS0FBVCxFQUFnQjtBQUNwQixhQUFLSCxTQUFMLEdBQWlCRyxLQUFqQjs7QUFFQSxZQUFJQyxnQkFBSjtBQUNBLFlB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RUFBRUMsTUFBRixFQUFVeUQsTUFBVixDQUFpQixZQUFVO0FBQ3ZCaEUsZUFBV1csS0FBWDtBQUNILENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNZW51VG9nZ2xlID0ge1xyXG4gICAgbWVudVN0YXRlOiBmYWxzZSxcclxuICAgIGhhbmRsZVN3aXBlU3RhdGU6IHRydWUsXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5tZW51U3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IHRyVmFsdWU7XHJcbiAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpIHtcclxuICAgICAgICAgICAgdHJWYWx1ZSA9IDI3MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0clZhbHVlID0gNjI1O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWVudVN0YXRlKVxyXG5cclxuICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoLVwiK3RyVmFsdWUrXCJweClcIik7XHJcbiAgICAgICAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCd0b2dnbGUnKTtcclxuICAgICAgICAkKCcuc2hhZG93LXRvZ2dsZScpLnRvZ2dsZSgpO1xyXG4gICAgICAgICQoJy5mbHknKS50b2dnbGVDbGFzcygnZmx5aW5nJyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINC+0YLQutGA0YvRgtC+IC0g0LfQsNC60YDRi9GC0YxcclxuICAgICAgICBpZihNZW51VG9nZ2xlLm1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XHJcbiAgICAgICAgICAgIC8vIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoKTtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS5oYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgTG9naW5Ub2dnbGUgPSB7XHJcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxyXG4gICAgbG9naW5TdGF0ZVRvZ2dsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvZ2luKHRoaXMubG9naW5TdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcclxuICAgIH0sXHJcbiAgICBsb2dpbjogZnVuY3Rpb24oZmxhZykge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudG9nZ2xlQ2xhc3MoJ2J1dHRvbl9saWdodCBidXR0b25fZGFyaycpO1xyXG4gICAgICAgICQoJy5sb2dpbi1hcmVhX19zaGFkb3csLmxvZ2luLWFyZWFfX2lubmVyJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIGlmKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRleHQoJ9CS0L7QudGC0LgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQodC60YDRi9GC0YwnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG5cclxuICAgICQoJy5uYXZpZ2F0aW9uX190b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBsZXQgbmF2UGFyZW50TGlzdCA9ICQoJy5uYXZpZ2F0aW9uX19saXN0Jyk7XHJcblxyXG4gICAgICAgIG5hdlBhcmVudExpc3QudG9nZ2xlQ2xhc3MoJ29wZW4nKVxyXG5cclxuICAgICAgICAvLyBsZXQgbmF2UGFyZW50TGlzdCA9ICQoJy5uYXZpZ2F0aW9uX19saXN0JyksXHJcbiAgICAgICAgLy8gICAgIG5hdkl0ZW1zID0gbmF2UGFyZW50TGlzdC5maW5kKCcubmF2aWdhdGlvbl9faXRlbScpLFxyXG4gICAgICAgIC8vICAgICBmdWxsSGVpZ2h0ID0gbmF2SXRlbXMubGVuZ3RoICogJChuYXZJdGVtcykuaGVpZ2h0KCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBuYXZQYXJlbnRMaXN0LnRvZ2dsZShcclxuICAgICAgICAvLyAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBuYXZQYXJlbnRMaXN0LmFuaW1hdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6ZnVsbEhlaWdodCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2ZsZXgnXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0sMzUwKVxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIG5hdlBhcmVudExpc3QuYW5pbWF0ZSh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgJ2hlaWdodCc6JCh0aGlzKS5oZWlnaHQoKSArICdweCcsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgJ2Rpc3BsYXknOiAnZmxleCdcclxuICAgICAgICAvLyAgICAgICAgIH0sMzUwKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XHJcblxyXG4gICAgLy8gJCgnI21vZGFsXzInKS5tb2RhbCgpO1xyXG5cclxuICAgICQoJy5tb2JpbGUtbWVudV9jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcclxuICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSgpO1xyXG4gICAgICAgIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGVUb2dnbGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5sb2dpbi1mb3JtX3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgTG9naW5Ub2dnbGUubG9naW5TdGF0ZVRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1lbnUtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdzaGFkb3ctdG9nZ2xlJykpIHtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzdGFydFggPSBudWxsO1xyXG4gICAgbGV0IGRlbHRhWCA9IG51bGw7XHJcbiAgICBsZXQgaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcbiAgICBsZXQgaXNMZWZ0U3dpcGUgPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBkZWx0YVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBzdGFydFg7XHJcbiAgICAgICAgICAgIGlzTGVmdFN3aXBlID0gTWF0aC5zaWduKGRlbHRhWCkgPT09IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+PSA1MCAmJiBoYW5kbGVTd2lwZVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0U3dpcGUgJiYgTWVudVRvZ2dsZS5tZW51U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTWVudVRvZ2dsZS5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0xlZnRTd2lwZSAmJiAhTWVudVRvZ2dsZS5tZW51U3RhdGUgJiYgTG9naW5Ub2dnbGUubG9naW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgbGV0IHNsaWRlckFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXJfYW1vdW50Jyk7XHJcbiAgICBsZXQgc2xpZGVyUmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX3JhbmdlJyk7XHJcblxyXG4gICAgaWYoc2xpZGVyQW1vdW50KSB7XHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyQW1vdW50LCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAxMDAwLFxyXG4gICAgICAgICAgICBzdGVwOiAxMDAwLFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcclxuICAgICAgICAgICAgY29ubmVjdDogW3RydWUsIGZhbHNlXSxcclxuICAgICAgICAgICAgLy8gZm9ybWF0OiB3TnVtYih7XHJcbiAgICAgICAgICAgIC8vICAgICBkZWNpbWFsczogMCxcclxuICAgICAgICAgICAgLy8gICAgIHRob3VzYW5kOiAnICdcclxuICAgICAgICAgICAgLy8gfSksXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAnbWluJzogMTAwMCxcclxuICAgICAgICAgICAgICAgICdtYXgnOiA4MDAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBwaXBzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgLy8gICAgIHZhbHVlczogWzAsNTAsMTAwXSxcclxuICAgICAgICAgICAgLy8gICAgIGRlbnNpdHk6IDEwLFxyXG4gICAgICAgICAgICAvLyAgICAgc3RlcHBlZDogZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHNsaWRlclJhbmdlKSB7XHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyUmFuZ2UsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IDEsXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gJCgnLm5hdmlnYXRpb25fX2xpc3QgYScpLnRhYigpO1xyXG5cclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtwbGFjZW1lbnQ6IFwiYm90dG9tXCJ9KTtcclxuICAgIC8vICQoJy5uYXZpZ2F0aW9uX19saXN0IGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICQoJy5uYXZpZ2F0aW9uX19saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gICAgIC8vICQodGhpcykudGFiKCdzaG93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgICQoJy5zZWxlY3RfX2lubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCAkYm94ID0gJCh0aGlzKS5zaWJsaW5ncygnLmlucHV0LXdyYXAnKS5maW5kKCcuc2VsZWN0X19jb250ZW50Jyk7XHJcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRib3hcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywnLnNoYWRvdy10b2dnbGUnLGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgLy8gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19oZWFkZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX3RleHQnKS5zbGlkZURvd24oMzAwKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBudW1iZXJpbmcgcXVlc3Rpb24gaXRlbXNcclxuICAgIC8vICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgIGxldCBudW0gPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xyXG4gICAgLy8gICAgIGlmKG51bSA+IDkpIHtcclxuICAgIC8vICAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX251bWJlcicpLnRleHQobnVtKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fbnVtYmVyJykudGV4dCgnMCcgKyBudW0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIG9wZW4gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucXVlc3Rpb25fX2hlYWRlcjpub3QoLmFjdGl2ZSknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnF1ZXN0aW9uX19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygkKCcucXVlc3Rpb25fX3RleHQnKSkuc2xpZGVUb2dnbGUoMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FydGljbGUgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGVfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGVfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYXJ0aWNsZXMgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGUtcHJldl9fcGljJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZS1wcmV2X19pbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRlcicpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdzY3JvbGwgcmVhZHknLGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgd2luT2Zmc2V0VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgLy8gJCgnI21haW5fbWVudScpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXHJcbiAgICAkKCcubWVudV9fdG9wLWxpc3RlbmVyJykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgTWVudVRvZ2dsZS5jbG9zZSgpXHJcbn0pO1xyXG5cclxuLy8gJChkb2N1bWVudCkub24oJ3BhZ2VjcmVhdGUnLCBmdW5jdGlvbihldmVudCl7XHJcbi8vICAgICAkKGRvY3VtZW50KS5vbignc3dpcGVsZWZ0IHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDk5Mikge1xyXG4vLyAgICAgICAgICAgICBNZW51VG9nZ2xlLm9wZW4oKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuXHJcblxyXG4vLyAkKGRvY3VtZW50KS5vbignbW9iaWxlaW5pdCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICQubW9iaWxlLmlnbm9yZUNvbnRlbnRFbmFibGVkID0gdHJ1ZTtcclxuLy8gfSk7Il19
