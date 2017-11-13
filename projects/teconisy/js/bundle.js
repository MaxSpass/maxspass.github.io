'use strict';

$(document).ready(function () {

    $('#triggerLoginMenu').popover({
        container: 'body',
        html: true,
        content: function content() {
            var clone = $($(this).data('popover-content')).clone(true).removeClass('hidden');
            return clone;
        }
    });

    // $('[rel="popover"]').popover({
    //     container: 'body',
    //     html: true,
    //     content: function () {
    //         var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
    //         return clone;
    //     }
    // }).click(function(e) {
    //     e.preventDefault();
    // });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });

    $('#toggle_pass_PIN').click(function () {
        $(this).toggleClass("fa-eye-slash");
    });

    // $("a[href='#']").attr("href", "javascript:void(0)");

    $('.mobile_menu .button').on('click', function () {
        $('.mobile_menu, .logo_holder').toggleClass('open');
        $('.main_menu').slideToggle(300);
    });

    $('.js_lang').on('click', function () {
        $('.lang_bar').toggleClass('active');
        $('.lang_menu').slideToggle(100);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).parents('.lang_bar').hasClass('lang_bar')) {
            $('.lang_menu').slideUp(100);
            $('.lang_bar').removeClass('active');
        }
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInBvcG92ZXIiLCJjb250YWluZXIiLCJodG1sIiwiY29udGVudCIsImNsb25lIiwiZGF0YSIsInJlbW92ZUNsYXNzIiwiZGF0ZXBpY2tlciIsImZvcm1hdCIsImNsaWNrIiwidG9nZ2xlQ2xhc3MiLCJvbiIsInNsaWRlVG9nZ2xlIiwiZSIsInRhcmdldCIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNsaWRlVXAiXSwibWFwcGluZ3MiOiI7O0FBRUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFJOztBQUVsQkYsTUFBRSxtQkFBRixFQUF1QkcsT0FBdkIsQ0FBK0I7QUFDM0JDLG1CQUFXLE1BRGdCO0FBRTNCQyxjQUFNLElBRnFCO0FBRzNCQyxpQkFBUyxtQkFBWTtBQUNqQixnQkFBSUMsUUFBUVAsRUFBRUEsRUFBRSxJQUFGLEVBQVFRLElBQVIsQ0FBYSxpQkFBYixDQUFGLEVBQW1DRCxLQUFuQyxDQUF5QyxJQUF6QyxFQUErQ0UsV0FBL0MsQ0FBMkQsUUFBM0QsQ0FBWjtBQUNBLG1CQUFPRixLQUFQO0FBQ0g7QUFOMEIsS0FBL0I7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFQLE1BQUUsYUFBRixFQUFpQlUsVUFBakIsQ0FBNEI7QUFDeEJDLGdCQUFRO0FBRGdCLEtBQTVCOztBQUlBWCxNQUFFLGtCQUFGLEVBQXNCWSxLQUF0QixDQUE0QixZQUFVO0FBQ2xDWixVQUFFLElBQUYsRUFBUWEsV0FBUixDQUFvQixjQUFwQjtBQUNILEtBRkQ7O0FBSUE7O0FBRUFiLE1BQUUsc0JBQUYsRUFBMEJjLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDeENkLFVBQUUsNEJBQUYsRUFBZ0NhLFdBQWhDLENBQTRDLE1BQTVDO0FBQ0FiLFVBQUUsWUFBRixFQUFnQmUsV0FBaEIsQ0FBNEIsR0FBNUI7QUFDSCxLQUhEOztBQUtBZixNQUFFLFVBQUYsRUFBY2MsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFZO0FBQ2xDZCxVQUFFLFdBQUYsRUFBZWEsV0FBZixDQUEyQixRQUEzQjtBQUNBYixVQUFFLFlBQUYsRUFBZ0JlLFdBQWhCLENBQTRCLEdBQTVCO0FBQ0gsS0FIRDs7QUFLQWYsTUFBRUMsUUFBRixFQUFZYSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVRSxDQUFWLEVBQWE7QUFDakMsWUFBSSxDQUFDaEIsRUFBRWdCLEVBQUVDLE1BQUosRUFBWUMsT0FBWixDQUFvQixXQUFwQixFQUFpQ0MsUUFBakMsQ0FBMEMsVUFBMUMsQ0FBTCxFQUE0RDtBQUN4RG5CLGNBQUUsWUFBRixFQUFnQm9CLE9BQWhCLENBQXdCLEdBQXhCO0FBQ0FwQixjQUFFLFdBQUYsRUFBZVMsV0FBZixDQUEyQixRQUEzQjtBQUNIO0FBQ0osS0FMRDtBQU9ILENBakREIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKT0+e1xuXG4gICAgJCgnI3RyaWdnZXJMb2dpbk1lbnUnKS5wb3BvdmVyKHtcbiAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZSA9ICQoJCh0aGlzKS5kYXRhKCdwb3BvdmVyLWNvbnRlbnQnKSkuY2xvbmUodHJ1ZSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAkKCdbcmVsPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoe1xuICAgIC8vICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAvLyAgICAgaHRtbDogdHJ1ZSxcbiAgICAvLyAgICAgY29udGVudDogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgdmFyIGNsb25lID0gJCgkKHRoaXMpLmRhdGEoJ3BvcG92ZXItY29udGVudCcpKS5jbG9uZSh0cnVlKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gfSk7XG5cbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICBmb3JtYXQ6ICdkZC9tbS95eXl5J1xuICAgIH0pO1xuXG4gICAgJCgnI3RvZ2dsZV9wYXNzX1BJTicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJmYS1leWUtc2xhc2hcIik7XG4gICAgfSk7XG5cbiAgICAvLyAkKFwiYVtocmVmPScjJ11cIikuYXR0cihcImhyZWZcIiwgXCJqYXZhc2NyaXB0OnZvaWQoMClcIik7XG5cbiAgICAkKCcubW9iaWxlX21lbnUgLmJ1dHRvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgJCgnLm1vYmlsZV9tZW51LCAubG9nb19ob2xkZXInKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcubWFpbl9tZW51Jykuc2xpZGVUb2dnbGUoMzAwKVxuICAgIH0pO1xuXG4gICAgJCgnLmpzX2xhbmcnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5sYW5nX2JhcicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCgnLmxhbmdfbWVudScpLnNsaWRlVG9nZ2xlKDEwMClcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghJChlLnRhcmdldCkucGFyZW50cygnLmxhbmdfYmFyJykuaGFzQ2xhc3MoJ2xhbmdfYmFyJykpIHtcbiAgICAgICAgICAgICQoJy5sYW5nX21lbnUnKS5zbGlkZVVwKDEwMCk7XG4gICAgICAgICAgICAkKCcubGFuZ19iYXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG5cbiJdfQ==
