/*
 * jQuery verson 1.10.2
 * simple form 插件
 * date 2014.9.23
 * author zhangz
 */
 (function($) {
 	$.fn.check = function(params){
		var defaults={
			style:'blue'
		}
		var options = $.extend(defaults, params);
		if(!$(this).parent().hasClass('simple_check_wrapper')){
			$(this).wrap("<div class='simple_check_wrapper'></div>");
		}else{
			$(this).parent().removeClass('simple_style_green');
			$(this).parent().removeClass('simple_style_red');
			$(this).parent().removeClass('simple_style_blue');
		}
		if(options.style == 'green'){
			$(this).parent().addClass('simple_style_green');
		}else if (options.style == 'red'){
			$(this).parent().addClass('simple_style_red');
		}else{
			$(this).parent().addClass('simple_style_blue');
		}
		$(this).parent().off('mouseover').on('mouseover',function(){
			$(this).addClass('hover')
		});
		$(this).parent().off('mouseout').on('mouseout',function(){
			$(this).removeClass('hover')
		});
		$(this).parent().off('click').on('click',function(){
			$(this).toggleClass('check');
		});

			
	}

	$.fn.radio = function(params){
		var defaults={
			style:'blue'
		}
		var options = $.extend(defaults, params);

		if(!$(this).parent().hasClass('simple_radio_wrapper')){
			$(this).wrap("<div class='simple_radio_wrapper'></div>");
		}else{
			$(this).parent().removeClass('simple_style_green');
			$(this).parent().removeClass('simple_style_red');
			$(this).parent().removeClass('simple_style_blue');
		}
		if(options.style == 'green'){
			$(this).parent().addClass('simple_style_green');
		}else if (options.style == 'red'){
			$(this).parent().addClass('simple_style_red');
		}else{
			$(this).parent().addClass('simple_style_blue');
		}
		$(this).parent().off('mouseover').on('mouseover',function(){
				$(this).addClass('hover')
		});
		$(this).parent().off('mouseout').on('mouseout',function(){
			$(this).removeClass('hover')
		});
		$(this).parent().off('click').on('click',function(){
			var name = $(this).find('input[type=radio]').attr('name');
			$('[name='+name+']').parent().removeClass('check');

			var chose = $("input[name='"+name+"']:checked");
			chose.parent().addClass('check');
		});
	}
})(jQuery);