$(document).ready(function(){

var sticky = function(){
	var headerBox = $('.header-box')
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


	$('<div class="shadow"></div>').prependTo($('main'));

	// $('<div class="offer-box"><div class="offer-inner clearfix"></div></div>').prependTo($('body'));

	function showModal() {
		$('.shadow').fadeIn(100)
		$('main').addClass('blur')

		$('body').addClass('none-overflow')
	};

	function hideModal() {
		$('.shadow').fadeOut(100)
		$('main').removeClass('blur')
		$('.offer-box').removeClass('show')

		$('body').removeClass('none-overflow')
	}

	$('#basket').click(function(){
		showModal()
		// $('html, body').animate({ scrollTop: 0 }, 'fast');
		$('.offer-box').addClass('show')
		
		// <p class="h2-lim">вы не выбрали ни одного товара</p>

	   $('.minus').click(function () {
	        var $input = $(this).parent().find('input');
	        var count = parseInt($input.val()) - 1;
	        count = count < 1 ? 1 : count;
	        $input.val(count);
	        $input.change();
	        return false;
	    });
	    $('.plus').click(function () {
	        var $input = $(this).parent().find('input');
	        $input.val(parseInt($input.val()) + 1);
	        $input.change();
	        return false;
	    });

	});

	$('.shadow').click(function(){
		hideModal()
	})

	$('.btn-buy-item').click(function(){
		if ($(this).hasClass('added') === false) {

			var offerImg = $(this).parent('.item-total').siblings('.item-box').find('img').attr('src');
			console.log(offerImg)
			var offerName = $(this).val(); 
			var offerPrice = $(this).siblings('.price').text();

			console.log($(this).attr('class'))

			$('<div class="offer-item clearfix">'+

				'<div class="offer-img"><img src="'+offerImg+'"></div>'+
				// '<div class="offer-img2">'+'<img />'.attr('src',offerImg).wrap('.offer-img')+'</div>'+

				'<div class="offer-name">'+offerName+'</div><div class="offer-quan"><div class="number"><span class="minus">-</span><input type="text" value="1"/><span class="plus">+</span></div></div><div class="offer-price">'+offerPrice+'</div></div>').prependTo($('.offer-inner'))
			// console.log(offerImg)
			// console.log(offerName)
			// console.log(offerPrice)
		}
		$(this).addClass('added').text('в корзине')
		var countNum = $('.btn-buy-item.added').length;
		$('.counter').fadeIn(100).text(countNum);

	})


})