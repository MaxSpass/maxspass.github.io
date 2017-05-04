$(document).ready(function() {

    var bigValueSlider = document.getElementById('slider_amount'),
        bigValueSpan = document.getElementById('borrow_value'),
        minusAmountBtn = document.getElementById('minus_amount'),
        plusAmountBtn = document.getElementById('plus_amount'),
        colorRank = document.getElementById('bg-emulation'),
        probApprov = document.getElementById('prob_approv'),
        probApprovDesc = document.querySelector('.borrow-value'),
        maxPerc = 95,
        step = 1000,
        minAmount = 5000,
        maxAmount = 80000;


    noUiSlider.create(bigValueSlider, {
        start: [minAmount],
        step: step,
        animate: true,
        animationDuration: 200,
        behaviour: 'snap',
        connect: [true, false],
        format: wNumb({
            decimals: 0,
            thousand: ' '
        }),
        range: {
            'min': [minAmount],
            'max': [maxAmount]
        }
    });

	$('.btn-mobile').click(function(){
		if ($(this).hasClass('active')) {
			$('ul.menu').animate({height: 'hide'}, 200)
			$(this).toggleClass('active');
		} else {
			$(this).toggleClass('active');
			$('ul.menu').animate({height: 'show'}, 200)
		}
	})

    function customMap(in_min, in_max, out_min, out_max, number) {
        return (parseFloat(number - in_min) * parseFloat(out_max - out_min) / parseFloat(in_max - in_min) + parseFloat(out_min));
    }

    bigValueSlider.noUiSlider.on('update', function(values, handle) {
        get = parseInt(bigValueSlider.noUiSlider.get().replace(/\s/g, ''));
        result = 100 * (1.0 - customMap(minAmount, maxAmount, 0.05, 0.50, get));
        colorKoef = (maxAmount - minAmount - (maxAmount - get)) / ((maxAmount - minAmount) / 100) / 100;

        bigValueSpan.innerHTML = values[handle];
        probApprovDesc.innerHTML = values[handle];
        probApprov.innerHTML = parseInt(result)

        colorRank.style.backgroundColor = 'rgba(205,58,58,' + colorKoef
        // rgba(137, 56, 56,.01)

        var funny = function() {
            var easter1 = $('.easter1');
            easter2 = $('.easter2').hide();
            if (get > maxAmount / 1.25) {
                easter1.hide()
                easter2.show()
            } else {
                easter1.show()
            }
        }()
    });

    minusAmountBtn.addEventListener('click', function() {
        get = parseInt(bigValueSlider.noUiSlider.get().replace(/\s/g, ''));
        bigValueSlider.noUiSlider.set(get - 1000);
        // console.log(get)
    });

    plusAmountBtn.addEventListener('click', function() {
        get = parseInt(bigValueSlider.noUiSlider.get().replace(/\s/g, ''));
        bigValueSlider.noUiSlider.set(get + 1000);
        // console.log(get)
    });

    $('.datebirth-masked').mask('00.00.0000')
    $('.tel-masked').mask('+7 (099) 999-99-99')

    $('#data_process').click(function() {
        var btnGoFirst = $('.btn-go-1')
        if (this.checked) {
            btnGoFirst.removeAttr('disabled')
        } else {
            btnGoFirst.attr('disabled', 'disabled')
        }
    })

    arr_all = [];

    var showFirstForm = function() {
        $('.personal-form').fadeIn();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $('.addr-form').fadeOut();
        $('.step-inner').removeClass('active-step-2').addClass('active-step-1');
    };

    var showSecondForm = function() {
        $('.addr-form').fadeIn();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $('.personal-form').fadeOut();
        $('.step-inner').removeClass('active-step-1').addClass('active-step-2');
    };

    $('.btn-next-step.back').click(function() {
        showFirstForm()
    })


    $("#personal_info").validate({
        focusInvalid: true,
        rules: {
            lname: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            fname: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            pname: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            datebirth: {
                required: true
            },
            telnum: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },

        messages: {
            lname: "Введите фамилию",
            fname: "Введите имя",
            pname: "Введите отчество",
            datebirth: "Введите дату рождения",
            telnum: "Введите номер телефона",
            email: "Введите Email"
        },
        success: function(label) {
            label.addClass("valid")
        },

        submitHandler: function() {
            $('.btn-go-2').removeAttr('disabled')
            betterVar = $('input[name="better_variant:checked"').val();
            arr_all = $('#personal_info').serializeArray();
            arr_all.push({
                "wish_amount": get
            });
            showSecondForm();
            console.log(arr_all);
        }
    });

    $("#registered_adress").validate({
        focusInvalid: true,
        rules: {
            region: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            city: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            street: {
                required: true,
                minlength: 2,
                pattern: /^[а-я\s\-]+$/i
            },
            house: {
                required: true,
                pattern: /^\d+[а-я]{0,1}$/i
            },
            flat: {
                required: true,
                pattern: /^\d+[а-я]{0,1}$/i
            },
            index: {
                required: true,
                pattern: /^\d{4,6}$/i
            }
        },


        messages: {
            region: "Введите регион",
            city: "Введите город",
            street: "Введите улицу",
            house: "Введите дом",
            flat: "Введите квартиру",
            index: "Введите индекс"
        },
        success: function(label) {
            label.addClass("valid")
        },

        submitHandler: function() {
            // $('.addr-form').hide();

            arr2 = $('#registered_adress').serializeArray();
            arr_all = arr_all.concat(arr2);
            jsonData = JSON.stringify(arr_all);

            console.log(jsonData);

            $.post('/test.php', jsonData, function(data) {

            });
        }
    });
});

$(window).resize(function(){
	if ($(this).width() >=768) {
		$('.btn-mobile').removeClass('active');
		$('ul.menu').show();
	}
})