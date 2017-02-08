$(document).ready(function(){
// Menu
(function($, openedMenuClass) {
  'use strict';

  $(function() {
    var $globalMenu = $('#global_menu'),
        $mobileContainer = $globalMenu.find('.mobile'),
        $mobileSubMenusContainer = $mobileContainer.find('.mobile-submenu'),
        $mobileSubMenus = $mobileSubMenusContainer.find('.submenu');

    $mobileContainer.find('.mobile-menu').on('change', function() {
      $mobileSubMenus.eq(this.value - 1).show().siblings().hide();
    });

    $('.mobile-submenu').on('click', function() {
      $mobileSubMenusContainer.toggleClass(openedMenuClass);
    });

    $(this).on('click', function(event) {
      if (!$(event.target).closest($globalMenu).length) {
        $mobileSubMenusContainer.removeClass(openedMenuClass);
      }
    });
  });
})(jQuery, 'opened');

// Convert Desktop-Menu to Mobile
    var wrapperContainer = $('<select class="mobile-menu"></select>').insertBefore($('.mobile-submenu')),
        contentSubMenu = $('<div class="submenus" hidden></div>').appendTo($('.mobile-submenu'));
      
        $('.desktop li .nav-link').each(function(i){
          $(this).clone().appendTo(wrapperContainer).wrap('<option value="'+i+++'"></option>');
        })

    var submenus = $('.submenus'),
  		ul = $('.desktop .sub-item-li');
    //console.log(ul);
     ul.each(function(i,item){
      var submenuItems = $(item).find('.submenu .sub-item'),
      	  hrefs = "";
      submenuItems.each(function(i,subitem){
        hrefs += $(subitem).find('.sub-item-title').html();
      });

      var subMenu =  '<div class="submenu submenu-' + (i+1) + '">' + hrefs + '</div>';
      // console.log(subMenu);
      submenus.append(subMenu);
    });

  $('.desktop li').hover(
     function () {
        $(this).addClass('listitem-hover');
     }, 
     function () {
        $(this).removeClass('listitem-hover');
     }
  );

// Mobile Center-Slider-Btn html-Not semantic
	$('<div class="drop-down-btn"><span class="spin"></span></div>').appendTo($('.goods-carousel-box ul'));

// Main Top-Slider
	$('.slide-banner').owlCarousel({
		items: 1,
		navigation: false,
		paginationNumbers: true,
		slideSpeed: 500,
		paginationSpeed : 400,
		singleItem: true,
		autoPlay: true
	});

// Category Center-Slider
	$('.goods-carousel').owlCarousel({
		items: 5,
		navigation: true,
		pagination: false,
		slideSpeed: 200,
		autoPlay: true,
		stopOnHover: true,
		navigationText: ['<i class="arrow-left"></i>', '<i class="arrow-right"></i>'],
	})



// Tabs and Slider-Btn-Switcher
	var objMobBtn = $('<div class="drop-down-btn"><span class="spin"></span></div>'),
		goodsCarousel = $('.goods-carousel-box'),
		tabMenu = goodsCarousel.find('ul li'),
		tabs = goodsCarousel.find('.goods-carousel-content > div');

	$('.goods-carousel-box ul li,.drop-down-btn').on('click',function(){
		goodsCarousel.toggleClass('tabs-drop');
	})
// slideDown(400)
		tabs.not(':first-of-type').hide();
		tabMenu.filter(':first-of-type').find(':first');

		tabMenu.each(function(i) {
		  $(this).attr('data-tab', 'tab'+i);
	 	});

		tabs.each(function(i) {
		  $(this).attr('data-tab', 'tab'+i);
		});
  	tabMenu.on('click', function() {
    
    var dataTab = $(this).data('tab'),
        getWrapper = $(this).closest(goodsCarousel);
    
    getWrapper.find(tabMenu).removeClass('active');
    $(this).addClass('active');
     

  	if ($(window).width() <= 800) {
  		$(this).insertBefore($('.goods-carousel-box ul li:first-of-type'));
  	}

    getWrapper.find(tabs).css('opacity','0').hide();
    getWrapper.find(tabs).filter('[data-tab='+dataTab+']').show().animate({'opacity':'1'},300);

  });
})//end ready

$(window).on('load resize', function(){

  $('.desktop .submenu').each(function() {
    var menu = $('.desktop').offset();
    var dropdown = $(this).parent().offset();
    var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('.desktop').outerWidth());
    if (i > 0) {
      // $(this).css('margin-left', '-' + (i + 2) + 'px').addClass('submenu-border-all');
      $(this).css('margin-left', '-' + (i + 2) + 'px').addClass('submenu-border-all');
    }
  });

	if ($(window).width() > 600) {
		$('.goods-carousel-box').removeClass('tabs-drop');
		
	}
  	if ($(window).width() <= 599) {
		$('.header-search').insertAfter($('.header-basket-box'));
	} else {
		$('.header-search').insertBefore($('.header-help'));
	}
	$('.goods-carousel-box').removeClass('tabs-drop');

	$('.cat-menu .sub').each(function() {
		var menu = $('.cat-menu').offset();
		var dropdown = $(this).parent().offset();
		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('.cat-menu').outerWidth());
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 9) + 'px');
		}
	});
})
