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

$(document).ready(function () {

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
        $(this).find($('use')).attr('xlink:href', '#delete');
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

        $('.question__icon ').find($('use')).attr('xlink:href', '#arrow_down');
        $(this).find($('use')).attr('xlink:href', '#delete');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNsb3NlIiwiTG9naW5Ub2dnbGUiLCJsb2dpblN0YXRlIiwibG9naW5TdGF0ZVRvZ2dsZSIsImxvZ2luIiwiZmxhZyIsImZhZGVUb2dnbGUiLCJ0ZXh0IiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrIiwibmF2UGFyZW50TGlzdCIsInNjcm9sbFRvcCIsImhhc0NsYXNzIiwic3RhcnRYIiwiZGVsdGFYIiwiaXNMZWZ0U3dpcGUiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJNYXRoIiwic2lnbiIsImFicyIsInNsaWRlckFtb3VudCIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyUmFuZ2UiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJzdGVwIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwicGlwcyIsIm1vZGUiLCJ2YWx1ZXMiLCJkZW5zaXR5IiwiZm9ybWF0Iiwid051bWIiLCJkZWNpbWFscyIsInRob3VzYW5kIiwidG9vbHRpcCIsInBsYWNlbWVudCIsImVhY2giLCIkYm94Iiwic2libGluZ3MiLCJmaW5kIiwic2VsZWN0MiIsImRyb3Bkb3duUGFyZW50IiwiYWRkQ2xhc3MiLCJzbGlkZURvd24iLCJhdHRyIiwib24iLCJyZW1vdmVDbGFzcyIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsInRoaXNJbWdTcmMiLCJjc3MiLCJ3aW5PZmZzZXRUb3AiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsYUFBYTtBQUNmQyxlQUFXLEtBREk7QUFFZkMsc0JBQWtCLElBRkg7QUFHZkMsWUFBUSxn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QUYsRUFBd0JrRCxJQUF4QixDQUE2QixZQUFVO0FBQ25DLFlBQUlhLGFBQWEvRCxFQUFFLElBQUYsRUFBUXFELElBQVIsQ0FBYSxvQkFBYixFQUFtQ0ssSUFBbkMsQ0FBd0MsS0FBeEMsQ0FBakI7QUFDQTFELFVBQUUsSUFBRixFQUFRZ0UsR0FBUixDQUFZO0FBQ1IsZ0NBQW9CLFNBQVNELFVBQVQsR0FBc0I7QUFEbEMsU0FBWjtBQUdILEtBTEQ7O0FBT0EvRCxNQUFFLE1BQUYsRUFBVTRELFdBQVYsQ0FBc0IsUUFBdEI7QUFDSCxDQXZMRDs7QUF5TEE1RCxFQUFFYSxRQUFGLEVBQVk4QyxFQUFaLENBQWUsY0FBZixFQUE4QixZQUFVO0FBQ3BDLFFBQUlNLGVBQWVqRSxFQUFFQyxNQUFGLEVBQVVnQixTQUFWLEVBQW5CO0FBQ0E7QUFDQWpCLE1BQUUscUJBQUYsRUFBeUJnRSxHQUF6QixDQUE2QixLQUE3QixFQUFtQ0MsWUFBbkM7QUFDSCxDQUpEOztBQU9BakUsRUFBRUMsTUFBRixFQUFVaUUsTUFBVixDQUFpQixZQUFVO0FBQ3ZCeEUsZUFBV1csS0FBWDtBQUNILENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNZW51VG9nZ2xlID0ge1xyXG4gICAgbWVudVN0YXRlOiBmYWxzZSxcclxuICAgIGhhbmRsZVN3aXBlU3RhdGU6IHRydWUsXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5tZW51U3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IHRyVmFsdWU7XHJcbiAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpIHtcclxuICAgICAgICAgICAgdHJWYWx1ZSA9IDI3MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0clZhbHVlID0gNjI1O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWVudVN0YXRlKVxyXG5cclxuICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoLVwiK3RyVmFsdWUrXCJweClcIik7XHJcbiAgICAgICAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCd0b2dnbGUnKTtcclxuICAgICAgICAkKCcuc2hhZG93LXRvZ2dsZScpLnRvZ2dsZSgpO1xyXG4gICAgICAgICQoJy5mbHknKS50b2dnbGVDbGFzcygnZmx5aW5nJyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINC+0YLQutGA0YvRgtC+IC0g0LfQsNC60YDRi9GC0YxcclxuICAgICAgICBpZihNZW51VG9nZ2xlLm1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XHJcbiAgICAgICAgICAgIC8vIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoKTtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS5oYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgTG9naW5Ub2dnbGUgPSB7XHJcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxyXG4gICAgbG9naW5TdGF0ZVRvZ2dsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvZ2luKHRoaXMubG9naW5TdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcclxuICAgIH0sXHJcbiAgICBsb2dpbjogZnVuY3Rpb24oZmxhZykge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudG9nZ2xlQ2xhc3MoJ3doaXRlJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWFyZWFfX3NoYWRvdywubG9naW4tYXJlYV9faW5uZXInKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgaWYoIWZsYWcpIHtcclxuICAgICAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudGV4dCgn0JLQvtC50YLQuCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRleHQoJ9Ch0LrRgNGL0YLRjCcpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKCcubmF2aWdhdGlvbl9fdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgbGV0IG5hdlBhcmVudExpc3QgPSAkKCcubmF2aWdhdGlvbl9fbGlzdCcpO1xyXG5cclxuICAgICAgICBuYXZQYXJlbnRMaXN0LnRvZ2dsZUNsYXNzKCdvcGVuJylcclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTG9naW5Ub2dnbGUubG9naW5TdGF0ZVRvZ2dsZSgpO1xyXG5cclxuICAgIC8vICQoJyNtb2RhbF8yJykubW9kYWwoKTtcclxuXHJcbiAgICAkKCcubW9iaWxlLW1lbnVfY2xvc2UnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoKTtcclxuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcubG9naW4tZm9ybV90b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGVUb2dnbGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tZW51LXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnc2hhZG93LXRvZ2dsZScpKSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTWVudVRvZ2dsZS5oYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc3RhcnRYID0gbnVsbDtcclxuICAgIGxldCBkZWx0YVggPSBudWxsO1xyXG4gICAgbGV0IGhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG4gICAgbGV0IGlzTGVmdFN3aXBlID0gZmFsc2U7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBzdGFydFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZGVsdGFYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gc3RhcnRYO1xyXG4gICAgICAgICAgICBpc0xlZnRTd2lwZSA9IE1hdGguc2lnbihkZWx0YVgpID09PSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPj0gNTAgJiYgaGFuZGxlU3dpcGVTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGVmdFN3aXBlICYmIE1lbnVUb2dnbGUubWVudVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1lbnVUb2dnbGUuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNMZWZ0U3dpcGUgJiYgIU1lbnVUb2dnbGUubWVudVN0YXRlICYmIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGxldCBzbGlkZXJBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX2Ftb3VudCcpO1xyXG4gICAgbGV0IHNsaWRlclJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcl9yYW5nZScpO1xyXG5cclxuICAgIGlmKHNsaWRlckFtb3VudCkge1xyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlckFtb3VudCwge1xyXG4gICAgICAgICAgICBzdGFydDogMTAwMCxcclxuICAgICAgICAgICAgc3RlcDogMTAwMCxcclxuICAgICAgICAgICAgYmVoYXZpb3VyOiAnc25hcCcsXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXHJcbiAgICAgICAgICAgIC8vIGZvcm1hdDogd051bWIoe1xyXG4gICAgICAgICAgICAvLyAgICAgZGVjaW1hbHM6IDAsXHJcbiAgICAgICAgICAgIC8vICAgICB0aG91c2FuZDogJyAnXHJcbiAgICAgICAgICAgIC8vIH0pLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IFsxMDAwXSxcclxuICAgICAgICAgICAgICAgICdtYXgnOiBbODAwMDBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBpcHM6IHtcclxuICAgICAgICAgICAgICAgIG1vZGU6ICdwb3NpdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbMCwxMDBdLFxyXG4gICAgICAgICAgICAgICAgZGVuc2l0eTogMTAwMCxcclxuICAgICAgICAgICAgICAgIC8vIHN0ZXBwZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhvdXNhbmQ6ICcuJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwaXBzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgLy8gICAgIHZhbHVlczogWzAsNTAsMTAwXSxcclxuICAgICAgICAgICAgLy8gICAgIGRlbnNpdHk6IDEwLFxyXG4gICAgICAgICAgICAvLyAgICAgc3RlcHBlZDogZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHNsaWRlclJhbmdlKSB7XHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyUmFuZ2UsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IDEsXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gJCgnLm5hdmlnYXRpb25fX2xpc3QgYScpLnRhYigpO1xyXG5cclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtwbGFjZW1lbnQ6IFwiYm90dG9tXCJ9KTtcclxuICAgIC8vICQoJy5uYXZpZ2F0aW9uX19saXN0IGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICQoJy5uYXZpZ2F0aW9uX19saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gICAgIC8vICQodGhpcykudGFiKCdzaG93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgICQoJy5zZWxlY3RfX2lubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCAkYm94ID0gJCh0aGlzKS5zaWJsaW5ncygnLmlucHV0LXdyYXAnKS5maW5kKCcuc2VsZWN0X19jb250ZW50Jyk7XHJcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRib3hcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywnLnNoYWRvdy10b2dnbGUnLGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgLy8gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19oZWFkZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX3RleHQnKS5zbGlkZURvd24oMzAwKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJCgndXNlJykpLmF0dHIoJ3hsaW5rOmhyZWYnLCAnI2RlbGV0ZScpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBudW1iZXJpbmcgcXVlc3Rpb24gaXRlbXNcclxuICAgIC8vICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgIGxldCBudW0gPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xyXG4gICAgLy8gICAgIGlmKG51bSA+IDkpIHtcclxuICAgIC8vICAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX251bWJlcicpLnRleHQobnVtKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fbnVtYmVyJykudGV4dCgnMCcgKyBudW0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIG9wZW4gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucXVlc3Rpb25fX2hlYWRlcjpub3QoLmFjdGl2ZSknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnF1ZXN0aW9uX19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygkKCcucXVlc3Rpb25fX3RleHQnKSkuc2xpZGVUb2dnbGUoMzAwKTtcclxuXHJcbiAgICAgICAgJCgnLnF1ZXN0aW9uX19pY29uICcpLmZpbmQoJCgndXNlJykpLmF0dHIoJ3hsaW5rOmhyZWYnLCAnI2Fycm93X2Rvd24nKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJCgndXNlJykpLmF0dHIoJ3hsaW5rOmhyZWYnLCAnI2RlbGV0ZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FydGljbGUgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGVfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGVfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYXJ0aWNsZXMgcGljdHVyZVxyXG4gICAgJCgnLmFydGljbGUtcHJldl9fcGljJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZS1wcmV2X19pbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRlcicpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdzY3JvbGwgcmVhZHknLGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgd2luT2Zmc2V0VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgLy8gJCgnI21haW5fbWVudScpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXHJcbiAgICAkKCcubWVudV9fdG9wLWxpc3RlbmVyJykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgTWVudVRvZ2dsZS5jbG9zZSgpXHJcbn0pO1xyXG5cclxuLy8gJChkb2N1bWVudCkub24oJ3BhZ2VjcmVhdGUnLCBmdW5jdGlvbihldmVudCl7XHJcbi8vICAgICAkKGRvY3VtZW50KS5vbignc3dpcGVsZWZ0IHN3aXBlcmlnaHQnLCBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDk5Mikge1xyXG4vLyAgICAgICAgICAgICBNZW51VG9nZ2xlLm9wZW4oKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuXHJcblxyXG4vLyAkKGRvY3VtZW50KS5vbignbW9iaWxlaW5pdCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICQubW9iaWxlLmlnbm9yZUNvbnRlbnRFbmFibGVkID0gdHJ1ZTtcclxuLy8gfSk7Il19
