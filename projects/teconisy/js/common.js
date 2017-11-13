

$(document).ready(()=>{

    $('#triggerLoginMenu').popover({
        container: 'body',
        html: true,
        content: function () {
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

    $('#toggle_pass_PIN').click(function(){
        $(this).toggleClass("fa-eye-slash");
    });

    // $("a[href='#']").attr("href", "javascript:void(0)");

    $('.mobile_menu .button').on('click', () => {
        $('.mobile_menu, .logo_holder').toggleClass('open');
        $('.main_menu').slideToggle(300)
    });

    $('.js_lang').on('click', function () {
        $('.lang_bar').toggleClass('active');
        $('.lang_menu').slideToggle(100)
    });

    $(document).on('click', function (e) {
        if (!$(e.target).parents('.lang_bar').hasClass('lang_bar')) {
            $('.lang_menu').slideUp(100);
            $('.lang_bar').removeClass('active');
        }
    });

});

