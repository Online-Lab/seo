$(document).ready(function(){
	$("[name=phone]").mask("8 (999) 999-99-99");
	//СТИЛИЗОВНЫЙ PLACEHOLDER
	$(function() {
	  $('.form-group label').click(function(){
	  	$('.form-group label').show();
	  	$(this).hide();
	  });
	  $('.form-group input').on('focus', function() {
	    $(this).parent().find('label').hide();
	  }).on('blur', function() {
	    if ($(this).val() === '') {
	     $(this).parent().find('label').show();
	    }
	  });
	});

	//ВСПЛЫВАЮЩИЕ ОКНА
	$(".popup").fancybox({
    	padding: 0,
	});
	

	$('.ddscroll').ddscrollSpy({
		scrolltopoffset: -76
	});
	$('.ddscroll2').ddscrollSpy({
			scrolltopoffset: -76
	});
	$('.ddscroll2').on('click',function(){
		$('#simple').show('slow');
		
	})

	 //ФИКСИРОВАННОЕ МЕНЮ
	//$(window).scroll(function() {  
    	//var scrollTop = $(window).scrollTop();
    	//$('header .top').css({
			//'top': scrollTop+'px'
		//});
	//});  
	
	$('.bxslider').bxSlider({
	  minSlides: 4,
	  maxSlides: 6,
	  moveSlides: 1,
	  infiniteLoop: false,
	  slideWidth: 220,
	  hideControlOnEnd: true,
	  pager: false,
	  prevText: '<',
	  slideMargin: 0
	});
	$('.bxslider2').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
	  moveSlides: 1,
	  infiniteLoop: false,
	  slideWidth: 960,
	  hideControlOnEnd: true,
	  pager: false,
	  slideMargin: 112,
	  prevText: '<',
	  nextText: '>'

	});
	$('.works').hover(function(){
		$('.works .bx-controls').show();
	}, function(){
		$('.works .bx-controls').hide();
	})
});

  $('.button1').on('click',function(){
		formType = $(this).parent().parent().attr('class');
		ax2SenD(1);
		event.preventDefault();
	});
 $('.button2').on('click',function(){
		formType = $(this).parent().parent().attr('class');
		ax2SenD(2);
		event.preventDefault();
	});
//--------------------
//ФОРМА
function ax2SenD(_id) {
	//ошибка ввода имени
	var err_name='';
	//ошибка ввода emaila
	var err_email='';
	//ошибка ввода телефона
	var err_phone='';
	
	
	if (_id == 1){//проверяем введенные данные
		if ($('.'+formType+' .phone').val().length == 0) {err_phone = "Введите телефон";}
		else if(!validate($('.'+formType+' .phone').val(), 'phone')) {err_phone = "Неверный формат телефона";}
	}
	if (_id == 2){//проверяем введенные данные
		if ($('.'+formType+' .name').val().length == 0) {err_name = "Введите имя";}
		if ($('.'+formType+' .phone').val().length == 0) {err_phone = "Введите телефон";}
		else if(!validate($('.'+formType+' .phone').val(), 'phone')) {err_phone = "Неверный формат телефона";}
	}
	// показываем ошибки с помощью bootstrap popover
	if (err_name != '') {
		if (formType != 'form22') {
			$('.'+formType+' .name').popover({
				content: err_name,
				placement: 'left',
				trigger: 'manual',
			});
		} else {
			$('.'+formType+' .name').popover({
				content: err_name,
				placement: 'top',
				trigger: 'manual',
			});
		}
		
		$('.'+formType+' .name').popover('show');
	} else {
		$('.'+formType+' .name').popover('hide');
		}

	if (err_phone != '') {
		if (formType != 'form22') {
			$('.'+formType+' .phone').popover({
				content: err_phone,
				placement: 'left',
				trigger: 'manual',
			});
		} else {
			$('.'+formType+' .phone').popover({
				content: err_phone,
				placement: 'top',
				trigger: 'manual',
			});
		}
		$('.'+formType+' .phone').popover('show');
	} else {
		$('.'+formType+' .phone').popover('hide');
		}
	if (err_email != '') {
		if (formType != 'form22') {
			$('.'+formType+' .email').popover({
				content: err_email,
				placement: 'left',
				trigger: 'manual',
			});
		} else {
			$('.'+formType+' .email').popover({
				content: err_email,
				placement: 'top',
				trigger: 'manual',
			});
		}
		$('.'+formType+' .email').popover('show');
	} else {
		$('.'+formType+' .email').popover('hide');
		}
	// если ошибок нет, то записываем содержимое инпутов в объект
	if (err_name == '' && err_phone == '' && err_email == '' ) {
		if (_id == 1){
			var formData = {
				"type": "1",
				"phone":$('.'+formType+' .phone').val(),
				}
			// удаляем ошибки у задействованой формы
			$('.'+formType+' .err_phone').html('');
		}
		if (_id == 2){
			var formData = {
				"type": "1",
				"name":$('.'+formType+' .name').val(),
				"phone":$('.'+formType+' .phone').val(),
				}
			// удаляем ошибки у задействованой формы
			$('.'+formType+' .err_name').html('');
			$('.'+formType+' .err_phone').html('');
		}
		// удаляем введенные данные у всех инпутов
		$(':input','.form').val('');
		// удаляем все ошибки
		$(".errors").html('');


		$.ajax({ //отправляем аяксом
			url:'source/order.php',
			type:'POST',
			data:'jsonData=' + $.toJSON(formData),
			success: function(res) {
				$.fancybox.close();
				$.fancybox({
					href: "#thank-you",
					padding: 0
				});
			}
		});

		$(".errors").html('');
		return false;
	}
	
}

function validate(field, type) { //проверка данных
	var pp = '';
	// Эл. почта
	if(type == 'email'){
		var pp = /^[a-zA-Z0-9][-\._a-zA-Z0-9]+@(?:[a-zA-Z0-9][-a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/;
		}
	// Телефон - цифры и пробел
	if(type == 'phone'){
		var pp = /^\+?[\d()\-\s]*\d+\s*$/;
		}
	// Имя - англ. и рус. буквы, пробелы 
	if(type == 'name'){
		var pp = /^[a-zA-Zа-яА-Я\s]*$/;
		}
	if(type == 'weight'){
		var pp = /^[0-9]/;
		}
	//Проверка поля по выбранному типу
	if(!field.match(pp)){
	return false;
	}
	return true;
}
