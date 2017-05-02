    itemArray 		= [],
    modalOffsetTop 	= $('.modal-box').offset().top,
    offerOffsetTop 	= $('.offer-box').offset().top,
    modal 			= $('#modal'),
    page 			= $('html, body'),
    moneyFormat = wNumb({
        thousand: ' '
    }),
    YouTube_URL_FrontPage 		= 'GaI6vBOicLw',
    YouTube_URL_After_Purchase 	= 'GaI6vBOicLw';

function showModal() {
    $('.shadow').fadeIn(100)
    // $('main').addClass('blur')

    $('body').addClass('none-overflow')
};

function hideModal() {
    $('.shadow').fadeOut(100)
    $('main').removeClass('blur')
    $('.offer-box').removeClass('show')

    $('.header-inner').removeClass('open')
    modal.fadeOut()
    $('body').removeClass('none-overflow')

    itemArray = []
    $('.btn-buy-item').each(function() {
        $(this).text('Купить').removeClass('added');
    })
    $('.counter').hide();
}


$(document).ready(function() {
    // if ($(window).width() >= 768) {
    //     $('#top').YTPlayer({
    //         fitToBackground: true,
    //         videoId: YouTube_URL_FrontPage
    //     });
    // }

    $('a[href^="#"]').click(function() {
        var fixedHeadeHeight = $('.header-box').height();
        page.animate({
            scrollTop: jQuery($.attr(this, 'href')).offset().top - fixedHeadeHeight / 2.25
        }, 1000);
        return false;
    });

    var sticky = function() {
        var headerBox = $('.header-box')
        var navPos, winPos, navHeight;

        $('<div class="clone-nav-menu"></div>').insertBefore(headerBox)

        function refreshVar() {
            navPos = headerBox.offset().top;
            navHeight = headerBox.outerHeight(true);
            headerHeight = headerBox.height();
        }

        refreshVar();
        $(window).resize(refreshVar);
        if ($(window).width() <= 767) {
            $('.clone-nav-menu').css('height', headerBox.height())
        }
        $(window).scroll(function() {
            winPos = $(window).scrollTop();

            // if (winPos > navPos && $(window).width() > 767) {
            if (winPos > navPos) {
                headerBox.addClass('fixed');
                $('.clone-nav-menu').show();
            } else {
                headerBox.removeClass('fixed');
                $('.clone-nav-menu').hide();
            }
        });
        if ($(window).width() <= 767) {
            $('.header-box').addClass('fixed')
        }

    }();

    $('#gallery-list').unitegallery();

    $('.choisen-box').owlCarousel({
        autoPlay: true
    })

    $('.feedbk-box').owlCarousel({
        items: 4,
        itemsDesktopSmall: [1500, 3],
        itemsTablet: [980, 2],
        itemsMobile: [650, 1],
        margin: 20,
        lazyLoad: true,
        slideSpeed: 2500,
        rewindSpeed: 3000,
        paginationSpeed: 2000,
        autoPlay: 5000,
        stopOnHover: true,
        pagination: true,
        navigation: false
    })


    $('<div class="shadow"></div>').prependTo($('main'));

    $('.close-modal').click(function() {
        modal.fadeOut(200)
        hideModal()
        if($(window).width() <= 767) {
            $('#main-menu').hide();
        }
    })

    $("input[type='tel']").mask("+38 (099) 999-99-99");

    $('.btn-mobile').click(function() {
        $('.header-inner').toggleClass('open')
        $('#main-menu').slideToggle('fast')

        if ($('.header-inner').hasClass('open')) {
            showModal()
        } else {
            hideModal()
        }
    })

    function showSuxVideo() {
        var suxVideo = $('#show_thx_video');
        $('#modal, .offer-box').hide();
        suxVideo.fadeIn();

        $('.show-video-inner').YTPlayer({
            fitToBackground: true,
            videoId: YouTube_URL_After_Purchase
        });

        $('.close-video, .shadow').click(function() {
            suxVideo.fadeOut();
            hideModal()
        })
    }

    $('.btn-recipe').click(function() {
        var formRecipe = $("#form-download-recipe");
        if (formRecipe[0].checkValidity()) {
            // $.post('js/contact.php', formRecipe.serializeArray(), function(data) {
            //     formRecipe.children('input').val("");
            //     $('.download-recipe')[0].click();
            // });

            return false;
        }

    })

    $('.btn-pre-order, .btn-callback').click(function() {
        var thisValue = $(this).val();
        var btnArray = modal.find($('.btn-array')).val(thisValue).text(thisValue);
        showModal();
        modal.find('.modal-name p').text(thisValue);

        if ($(this).hasClass('btn-pre-order')) {
            modal.removeClass('callback').addClass('pre-order').show();
            modal.find('form').addClass('show-thx');
            console.log(btnArray.val());
        } else if ($(this).hasClass('btn-callback')) {
            modal.removeClass('pre-order').addClass('callback').show();
            console.log(btnArray.val());
        }

        $('.btn-array').click(function() {
            var modalForm = $('#form-modal');
            if (modalForm[0].checkValidity()) {
                // $.post('js/contact.php', modalForm.serializeArray(), function(data) {
                // modalForm.find('input').val("");
                //     if ($(this).parent('form').hasClass('show-thx')) {
                //         // сюда вывод видео
                //         showSuxVideo()
                //     } else {
                //         $('.modal-name p').text('Спасибо, мы скоро с вями свяжемся!')
                //         setTimeout(function() {
                //             hideModal()
                //         }, 1500)
                //     }
                // });
                return false;
            }
        })
    })




    $('.shadow').click(function() {
        hideModal()
        modal.fadeOut(300)
    })

    $('.btn-buy-item').click(function() {

        if (!$(this).hasClass('added')) {
            $('.header-box').addClass('fixed')
            var offerName = $(this).val(),
                offerImg = $(this).parent('.item-total').siblings('.item-box').find('img').attr('src'),
                offerPrice = $(this).siblings('.price').text(),
                object = {
                    name: offerName,
                    src: offerImg,
                    price: offerPrice
                }
            itemArray.push(object)
        }
        $(this).addClass('added').text('в корзине')
        var countNum = $('.btn-buy-item.added').length;
        $('.counter').fadeIn(100).text(countNum);
        console.log(itemArray)
    })


    $('#basket').click(function(total) {
        showModal()
        $('.offer-item').remove()
        $('.offer-box').show().addClass('show');



    function totalCost() {
        arr_Cost = [];
        total = 0;

        $('.offer-price').each(function(){
            var total_Cost = parseInt($(this).text());
            arr_Cost.push(total_Cost);
        })
        for(var i=0;i<arr_Cost.length;i++){
            total = total + parseInt(arr_Cost[i]);
        }
        $('.total-cost').text(moneyFormat.to(total))
        $('input.input-total').val(total)

    }

        for (var i = 0; i < itemArray.length; i++) {
            var itemName = itemArray[i].name,
                itemSrc = itemArray[i].src,
                itemPrice = itemArray[i].price;

            $('<div class="offer-item clearfix">' +
                '<input hidden name="item" value="'+itemName+'">'+
                '<input hidden name="price" value="'+itemPrice+'">'+
                // '<input hidden name="total" value="'+total+'">'+
                '<div class="offer-img"><span class="remove-item">&times;</span><img src="' + itemSrc + '"></div>' +
                '<div class="offer-name">' + itemName + '</div><div class="offer-quan"><div class="number"><button class="minus" value="' + itemPrice + '">-</button><input type="text" name="quan" value="1"/><button class="plus" value="' + itemPrice + '">+</button></div></div><div class="offer-price">' + itemPrice + '</div></div>').prependTo($('.offer-inner'))
        }
        totalCost()
   



        $('.minus, .plus').click(function() {
            var changePrice = $(this).parent().parent().parent().find($('.offer-price'));
            var changeValue = parseInt(changePrice.text());
            var thisVal = parseInt($(this).val());
            var input = $(this).parent().find('input');
            var newValue = moneyFormat.to(thisVal).replace(/\s/g, '')

            if ($(this).hasClass('minus')) {
                var count = parseInt(input.val()) - 1;
                count = count < 1 ? 1 : count;
                if (changeValue > thisVal) {
// .replace(/\s/g, '')

                    changePrice.text(changeValue - thisVal);
                    // changePrice.text(moneyFormat.to(changeValue));

// console.log(newValue)
// changePrice.text(moneyFormat.to(qqq).replace(/\s/g, ''))


console.log(changeValue)
console.log(typeof changeValue)

                }
                input.val(count);
                input.change();
                totalCost()
                return false;
            } else if ($(this).hasClass('plus')) {
                input.val(parseInt(input.val()) + 1);
                changePrice.text(changeValue + thisVal);
                // var sendItemCost = changeValue + thisVal;
                // changePrice.text(parseInt(moneyFormat.to(sendItemCost)))
                input.change();
                totalCost()
                return false;
            }
        })


        $('.remove-item').click(function() {
            var parent = $(this).parent().parent();
            parent.fadeOut();
            setTimeout(function() {
                parent.remove();
                totalCost()
            }, 600);
        })

        $('.close-offer-box, .close-offer').click(function() {
            // var parent = $(this).parent();
            var parent = $('#offer_box');
            parent.fadeOut(400);
            setTimeout(function() {
                hideModal()
            }, 600);
            itemArray = [];
            // $('#main-menu').hide();
        })

        $('.open-offer-form').click(function(){
            parent = $(this).parent().parent().find('.form-modal');
            parent.slideDown('fast');
        })

        $('#offer_go').click(function(){
            if($("#offer_box")[0].checkValidity()) {
                // $.post('js/contact.php', $('#offer_box').serializeArray(), function(data) {
                //     showSuxVideo()
                // });
                    return false;
            }
            else  {
                console.log('Не работает!')
            }
            
        })

    });


})

$(window).on('load resize', function() {
    var winW = $(this).width(),
        winH = $(this).height(),
        headeHeight = $('.header-box').height(),
        headeHeightt = $('.header-box').offset().top,
        modalHeight = $('.modal-box').height(),
        modalOffsetTop = $('.modal-box').offset().top;

    if (winW > 767) {
        $('#main-menu').removeAttr('style').show()
        $('.header-inner').removeClass('open')
    } else {
        $('#main-menu li a').click(function() {
            $('.header-inner').removeClass('open')
            $('#main-menu').hide();
            $('.shadow').fadeOut(100)
            hideModal()
            $('body').removeClass('none-overflow');
        })

        $('.shadow').click(function() {
            $('.header-inner.open').removeClass('open')
            $('.header-inner').find($('#main-menu')).hide()
        })
    }
})