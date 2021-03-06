var scrollTop = function() {
	$(window).offset.top
}();
$(document).ready(function(){
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	$('#preloader-box').fadeOut(1000);
	$(".preloader").delay(1000).fadeOut(1000);
	setTimeout(function(){
		$('#preloader-box').remove();
	},1500)



// $('.text-preview').append($('<img src="../img/webpr.png" class="img-responsive">')).children('h1').css({'font-size':'.1px','color':'transparent'})

// var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
// var isChrome = !!window.chrome && (/chrome\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
// if(isChrome){

// }
// else {}

var sticky = function(){
	var headerBox = $('.header-animate')
    var navPos, winPos, navHeight;

    $('<div class="clone-nav-menu hidden-xs"></div>').insertBefore(headerBox)

    function refreshVar() {
        navPos = headerBox.offset().top;
        navHeight = headerBox.outerHeight(true);
        headerHeight = headerBox.height();
    }

    refreshVar();
    $(window).resize(refreshVar);

    $(window).scroll(function() {
        winPos = $(window).scrollTop();
        $('.clone-nav-menu').css('height',headerBox.height())
        if (winPos > navPos && $(window).width() > 768) {
            headerBox.addClass('fixed');
            $('.clone-nav-menu').show();
        } else {
            headerBox.removeClass('fixed');
            $('.clone-nav-menu').hide();

        }
    });

}();


$('#btn-go, #btn-go-services, .btn-price').click(function(){
	var thisVal = $(this).attr('value');
	var thisId = $(this).attr('id');

	$('body').addClass('shadow');
	var newModal = $('.form-box').clone();
	var thisButton = newModal.children('form').find('button');

	newModal.addClass('modal animated pulse').prependTo('body');
	newModal.find('.main-form').attr('id','form-modal');

	var formModalId = newModal.children('form').attr('id');
	newModal.find('button.btn-form').attr('form',formModalId);
	$('.masked-input').mask('+38 (099) 999-99-99');

	thisButton.click(function(){
	    if($(this).parent('form')[0].checkValidity()) {
	        $.post('/Action.php','&this_val=' + thisVal + '&' + $(this).parent('form').serialize(), function(data) {
				newModal.html('<b>Спасибо, мы скоро с Вами свяжемся</b>');
				setTimeout(function(){
					console.log(thisVal)
					newModal.fadeOut(700)
					$('body').removeClass('shadow')
					setTimeout(function(){
						newModal.remove()
					},800)
				},1000)
	        });
	        return false;
	    }
	    // else  {}
	});
	$('.form-close').click(function(){
		var thisParentForm = $(this).parent('.form-box');
		thisParentForm.fadeOut(400)
		$('body').removeClass('shadow')
		setTimeout(function(){
			thisParentForm.remove()
		},500)
	})
})

$('#btn-bottom').click(function(){
	var thisVal = $(this).attr('value');
	var thx = $('.h4-form');
	var thxText = $('.p-form');
    if($(this).parent('form')[0].checkValidity()) {
        $.post('/Action.php','&this_val=' + thisVal + '&' + $(this).parent('form').serialize(), function(data) {
            $(':input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
			thx.fadeOut(300).text('Спасибо');
			thxText.fadeOut(300).text('мы скоро с Вами свяжемся');
			setTimeout(function(){
					thx.fadeIn(350)
					thxText.fadeIn(350)
			},100)
        });
        return false;
    }
    // else  {}
});


$('.btn-mobile').click(function(){
	$(this).toggleClass('active');
	$('.modal').remove();
	$('nav.menu').toggleClass('show');
	$('body').toggleClass('overflow-hidden').removeClass('shadow')
})



$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - $('.header-inner').height()
        }, 400);
        return false;
      }
    }
  });
});


		$('.serv-caption-box').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated zoomIn',
			offset: 150
		});

		$('.text-preview').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated fadeInDown',
			offset: 150
		});

		$('.serv-item-inner-img').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated rotateIn',
			offset: 150
		});

		$('.price-item').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated fadeInUp',
			offset: 150
		});

		$('.serv-text-preview').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated fadeInLeft',
			offset: 150
		});

		$('.price-desc').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated fadeIn',
			offset: 150
		});

		$('.form-box').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated pulse',
			offset: 250
		});

		$('#btn-go').viewportChecker({
			classToRemove: 'invis',
			classToAdd: 'animated fadeInUp',
			offset: 150
		});

	$('.portfolio-list').owlCarousel({
		items: 3,
		autoplaySpeed: 200,
		loop: true,
		center: true,
		autoplay: true,
		autoplaySpeed: 500,
		autoplayHoverPause: true,
		navigation: true,
		pagination: true,
		navigationText: ['<i class="carouselPrev"></i>', '<i class="carouselNext"></i>']
	});

	$('.masked-input').mask('+38 (099) 999-99-99');
})



$(window).on('load resize', function(){
	var winWidth = $(window).width();
	function removeMobileLayout() {
		$('.btn-mobile').removeClass('active');
		$('nav.menu').removeClass('show');
		$('body').removeClass('overflow-hidden');
	}
	if (winWidth <= 767) {
		$('nav.menu li a').click(function(){
		removeMobileLayout()
		})
		$('.header-animate').removeClass('fixed')

	} else {
		removeMobileLayout()
	}
})

