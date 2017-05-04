$(document).ready(function(){
	$('.lang-switcher span').click(function(){
		$('.lang-switcher span').toggleClass('active')
		// $(this).show()
	})

	$('.last-products').masonry({
	  // options
	  itemSelector: '.last-product-item',
	  gutter: 30,
	  fitWidth: true,
	  columnWidth: 300
	  // originTop: false
	});

})

$(window).on('load resize',function(){
	$.fn.hasAttr = function(name) {
		return this.attr(name) !== undefined;
	};

	var windowWidth = $(window).width();

	var resizeProduct = function() {

		

		// var productContainerTop =  $('#img-inner-top').find('img').height();
		// var productBgMobile = '../' + $('#img-inner-top img').attr('src');
		// if (windowWidth > 767) {
		// 	$('#category-box').css({
		// 		'height':productContainerTop,
		// 		'background-image':'none'
		// 	});
		// } else {
		// 	$('#category-box').css({
		// 		'height':'100%',
		// 		'background-image':'url('+productBgMobile+')'
		// 	})
		// }

		// var productDesc = $('#product-desc');
		// var productProp = $('#product-prop').height();
		// var imgProductCenter1 = $('#img-product-center1');
		// var imgProductCenter1Src = '../' + $('#img-product-center1 img').attr('src');
		// var imgProductRight1 = $('#img-product-right1').height();
		// var deliveryInfo = $('#delivery-info');
		
		// if (windowWidth > 767 && windowWidth < 1150) {
		// 	var imgProductCenter1Height = (imgProductRight1 + deliveryInfo) - productProp;
		// 	imgProductCenter1.css({
		// 		'height':imgProductCenter1Height,
		// 		'background-image': 'url('+imgProductCenter1Src+')'
		// 	})

		// 	var productDescHeight = imgProductRight1 + deliveryInfo.height() + 10;
		// 	productDesc.css({
		// 		'height': productDescHeight
		// 	})

		// } else {
		// 	imgProductCenter1.css({
		// 		'height':'100%',
		// 		'background-image':'none'
		// 	})
		// 	productDesc.css({
		// 		'height':'100%'
		// 	})
		// 	var deliveryInfoHeight = productDesc.height() - imgProductRight1;
		// 	deliveryInfo.css({
		// 		'height':deliveryInfoHeight
		// 	})
		// }

	}();

	var coverParent = function(){
// 		$('.product-container').each(function(){
// 				var parentHeight = $(this).height();
// 				var childImg = $(this).find($('[data-cover-parent=1] img').parent());
// 				var childImgSrc = childImg.find('img').attr('src');

// 			if ($(this).hasAttr('data-cover-parent') && $(this).attr('data-cover-parent') == 0) {
// 				if (childImg.height() !== parentHeight) {

// 				childImg.find('img').hide()

// 				childImg.css({
// 					'background-image':'url('+childImgSrc+')',
// 					'height': parentHeight
// 				})

// 				}else {
// 					childImg.removeAttr('style').find('img').show()
// 			}

// console.log(parentHeight)
// console.log(childImg.find('img').height())


// 			} 
// 		})


	}();

	var descUnderAuthor = function() {
		var descHeight = $('#img-product-right1').height() + $('#delivery-info').outerHeight(true);
		var authorHeight = $('.product-author-img').height();
		if (windowWidth > 767) {
			$('#author-box').css('height', authorHeight)
			$('.product-container.product-center').css('height',descHeight)
		} else {
			$('#author-box, .product-container.product-center').css('height','100%')
		}
	}();

})