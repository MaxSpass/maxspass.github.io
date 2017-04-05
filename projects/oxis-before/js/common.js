
$(window).on('load resize', function(){
    var w = $(window).width();
    var li = $('nav ul li');
    var liLength = $('nav ul li').length;
    var newLiWidth = (100/liLength) - 3 + "%";

    if ( w >= 768 ) {
        if ( liLength <= 2 ) {
            li.css('width','27%');
        }
        else {
            li.css('width',newLiWidth);
        }
    }
    else if ( w < 768 ) {
        li.removeAttr('style');
    }
});

$(window).scroll(function(){
    var st = $(this).scrollTop();
    console.log(st);
})

$(document).ready(function() {


    var mobileMenu = $('.header-container nav ul');
    var mobileMenuItem = $('.header-container nav ul li a');
    var mobileBtn = $('<div class="btn-mobile"></div>');
    var mobileBtnBg = $('.btn-mobile');

    mobileBtn.appendTo($('.header-container nav ul'));


    $('.header-container nav ul, .header-container nav ul li a').on('click',function(){
        mobileMenu.toggleClass('btn-mobile-active');
        mobileBtnBg.toggleClass('btn-mobile-changed');
        // mobileMenuItem.toggleClass('visible');
        setTimeout(function(){
            $('body').toggleClass('shadow');
        }, 300)
    })
   

console.log($('.header-container nav ul li:before').height())
    var $page = jQuery('html, body');
    jQuery('a[href*="#service"], a[href*="#project"], a[href*="#contact"]').click(function() {
        $page.animate({
            scrollTop: jQuery($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });

    $('.projects-carousel').owlCarousel({
        items: 6,
        loop: true,
        stagePadding: 50,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [1395,3],
        itemsTablet: [768,2],
        slideSpeed: 2500,
        rewindSpeed: 5000,
        paginationSpeed: 7000,
        autoPlay: 5000,
        pagination: false,
        navigation: true,
        navigationText: ['<i class="fa fa-angle-left slider-projects-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right slider-projects-left" aria-hidden="true"></i>']
    });

});
