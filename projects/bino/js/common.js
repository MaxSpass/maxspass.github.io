$(document).ready(function(){


	$('.mobile-btn, .menu ul a').on('click',function(){
		if ($(window).width() <= 767)
		{
			$('.menu').toggleClass('show')
			$('body').toggleClass('shadow')
		}
	});


	$('.slider-info').owlCarousel({
		singleItem: true,
		loop: true,
		autoPlay: true,
		navigation: true,
		slideSpeed: 2500,
		rewindSpeed: 2500,
		stopOnHover: true,
		pagination: false,
		// paginationSpeed: 5000,
		navigationText: ['<i class="arrow-left" data-icon="b"></i>', '<i class="arrow-right" data-icon="c"></i>'],
	})

	var studyCarousel = $('.study-box');
		// studyItem = $('.study-box .owl-item.active')
	  	studyCarousel.owlCarousel({
			singleItem: true,
			loop: true,
			autoPlay: true,
			navigation: false,
			slideSpeed: 700,
			rewindSpeed: 1000,
			stopOnHover: true,
			pagination: true,
			// responsive: true,
			// responsive: {
			// 	0: {
			// 		pagination: false
			// 	},
			// 	640: {
			// 		pagination: false
			// 	}
			// },

	   afterAction: function(el){
	   //remove class active
	   this.$owlItems.removeClass('active')

	   //add class active
	   this.$owlItems.eq(this.currentItem ).addClass('active')

			if ($('.study-inner').parent().hasClass('active')) {
			var studyWrapCarousel = $('.study-box .owl-item.active'),
				studyItem = $('.study-inner').parent().attr('data-case-img'),
				studyValue = studyWrapCarousel.children(studyItem).attr('data-case-img');
			$('.study-img').each(function(i){
				$(this).hide()
					if ($(this).attr('data-case-img') == studyValue) {
						$(this).fadeIn(1100)
					}
				})
			} 
	    }
	});


	$('.menu ul li a').on('click',function(){
		$('.menu ul li').removeClass('active')
		$(this).parent().addClass('active')
	})

	// $('.gallery-nav li').on('click',function(){

	// })



// Smooth Scrolling (Плавная прокрутка)
var $page = $('html, body');
$('a[href*="#').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
    return false;
});


$('.gallery-nav li').on('click',function(){
	$('.gallery-nav li').removeClass('active')
	$(this).addClass('active')
	
	var gal = $('.gallery .gallery-item'),
		galNavLi = $(this).attr('data-gal-opt'),
		galItemVal = $('.gallery-item').attr('data-gallery-item');

	if ($(this).hasClass('all')) {
		gal.show('slow')
	} else {
			gal.hide()

			gal.each(function(i){
				if ($(this).attr('data-gallery-item') == galNavLi)
					{
						$(this).show('slow')
					}
		})
	}
})


})


$(window).on('load resize', function () {
	var galHeight = $('.gallery-item').width(),
		caseHeight = $('#case_study').height(),
		articleImgHeight = $('#blog .article .blog-img').height();

	$('.gallery').css('min-height', galHeight)

	// if ($(window).width() >= 768) {
		$('#blog .article').height(articleImgHeight)
	// }
	
	// $('.study-box').css('height', caseHeight)
	// $('.case-img-box').css('max-height', caseHeight)
})


    // Sticky Menu - START
    var navPos, winPos, navHeight;
    function refreshVar() {
        navPos = $('.header-inner').offset().top;
        navHeight = $('.header-inner').outerHeight(true);
        headerHeight = $('.header-inner').height();
    }

	refreshVar();
	$(window).resize(refreshVar);

	$('<div class="header-clone"></div>').css('height', headerHeight).hide().insertBefore($('.header-inner'))

$(window).scroll(function() {
    winPos = $(window).scrollTop();

    if (winPos > navPos && $(window).width() > 768) {
    	$('.header-inner').css('height','58px');

        $('.header-inner').addClass('fixed');
        $('.header-clone').show();
    } else {
    	$('.header-inner').css('height',headerHeight);

        $('.header-inner').removeClass('fixed');
        $('.header-clone').hide();
    }
});