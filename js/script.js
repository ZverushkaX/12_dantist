$(document).ready(function () {
	if (!window.console) {
		console = {
			log: function () {}
		};
	}

	function yaReachGoal(goal) {
		console.log("Цель достигнута: ", goal);
		yaCounter22945633.reachGoal(goal);
	}

	/**
	 * Scroll to map and etc
	 */


	$(".scrollto").click(function () {
		var target = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 1000);
	});

	var modal_call_goal_init = $("#modal-call").attr("data-goal");

	function modal_call_reset_goal() {
		$("#modal-call").attr("data-goal", modal_call_goal_init);
	}


	$.extend($.fancybox.defaults, {
		beforeClose: function () {
			modal_call_reset_goal();
		}
	});

	// ie8 fix
	$(".ie8 label.btn").click(function () {
		$(this).closest("form").submit();
		return 0;
	});


	$(".btn").click(function () {
		var goal = $(this).attr("data-goal");
		if (goal) {
			$("#modal-call").attr("data-goal", goal);
		}
	});

	/*анимация*/

	$.fn.anim = function () {
		$item = $(this);

		if ($item.hasClass('anim-left')) {
			$item.css({
				"opacity": 0,
				"left": 2000
			});
			$item.animate({
				"left": 0,
				"opacity": 1
			}, 300);
		} else if ($item.hasClass('anim-right')) {
			$item.css({
				"opacity": 1,
				"right": 2000
			});
			$item.animate({
				"right": 0
			}, 300);
		} else if ($item.hasClass('anim-top')) {
			$item.css({
				"opacity": 0,
				"bottom": 1000
			});
			$item.animate({
				"bottom": 0,
				"opacity": 1
			}, 300);
		}


	};

	// $(".anim-block").addClass('anim');


	// $('.anim').appear(function () {
	// 	$(this).removeClass('anim');

	// 	var speed = 300;
	// 	if ($(this).hasClass('anim-fast')) {
	// 		speed = 150;
	// 	}

	// 	$(this).find(".anim-item").each(function (index) {
	// 		$(this).delay(speed * index).anim();
	// 	});

	// }, {
	// 	accY: -180
	// });


	/**
	 * Всплывающие окна
	 */

	$(".popup").fancybox({
		padding: 0
	});


	/**
	 * Маска ввода
	 */

	$("[name=phone]").mask("+7(999) 999-99-99");


	/**
	 * Поддержка плейсхолдера в старых браузерах
	 */

	var placeholderSupport = "placeholder" in document.createElement("input");
	if (!placeholderSupport) {
		$.fn.placeholder = function () {
			$(this).each(function () {
				// высота линии равна высоте инпута
				var h = $(this).height() + 'px';
				if (!$(this).is("textarea")) {
					$(this).css("line-height", h);
				}

				var text = $(this).attr('placeholder');
				$(this).val(text);

				$(this).click(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == text) {
						$(this).val("");
					}
				});
				$(this).blur(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == "") {
						$(this).val(text);
					}
				});
			});
			$('form').submit(function () {
				// обнуляем значения на отправке формы
				$this = $(this);
				$(this).find("[placeholder]").each(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == text) {
						$(this).val("");
					}
				});
				// стираем после отправки
				setTimeout(function () {
					$this.find("[placeholder]").each(function () {
						//console.log("settimeout");
						var text = $(this).attr('placeholder');
						if ($(this).val() == "") {
							$(this).val(text);
						}
					});
				}, 1000);
			});
		};
		$('[placeholder]').placeholder();
	}


	/**
	 * Отправка формы
	 */
	$("form").each(function () {
		$(this).validate({
			onfocusout: function (element) {
				//$(element).valid();
			},
			rules: {
				phone: {
					required: true
				}
			},
			submitHandler: function (form) {
				var data = $(form).serialize();
				var action = $(form).attr("action");
				var answer = $.post(action, data).done(function (msg) {
					// если удачно
					if (msg == "") {
						var goal = $(form).attr("data-goal");
						try {
							yaReachGoal(goal);
						} catch (e) {
							console.log("Метрика не установлена");
						}


						$.fancybox({
							href: "#modal-thank-you",
							padding: 0
						});

					}
					// если сервер выдал сообщение (ошибку итп)
					else {
						alert("Не удалось отправить заявку.\n Ответ сервера:\n" + msg);
					}
				}).fail(function () {
					// не удалось осуществить запрос
					alert("Произошла ошибка при отправке данных на сервер.");
				});
				return false;
			}
		});
	});


	/**
	 * Счетчик
	 */

	// Выберите дату - сегодня, если пустое значение
	var date = "";
	// или другую (var - должна быть объвлена 1 раз)
	// var date = "31 dec 2014";

	function getNewDate(date) {
		if (date) {
			var newDate = new Date(date);
		} else
			var newDate = new Date();
		// 12 ночи каждого дня
		newDate.setHours(24, 0, 0, 0);
		return newDate;
	}



});

// настройки для плагина валидации форм
(function ($) {
	$.extend($.validator.messages, {
		required: "Это поле необходимо заполнить.",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Пожалуйста, введите корректный адрес электронной почты.",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пожалуйста, введите такое же значение ещё раз.",
		accept: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
		minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
		rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
		range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
		max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
		min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
	});
}(jQuery));