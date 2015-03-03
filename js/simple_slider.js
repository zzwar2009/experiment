/*
 * jQuery verson 1.10.2
 * simple slider 插件
 * date 2014.9.22
 * author zhangz
 */
(function($) {
 	$.fn.slider = function(params){
		var defaults={
			position:'bottom',
			showtip:true
		}
		var options = $.extend(defaults, params);
		$(this).addClass('line');
		if(options.showtip){
			$(this).append($("<div class='line_pass'></div><div class='bar'><div class='sl_tooltip'></div>"));
		}else{
			$(this).append($("<div class='line_pass'></div><div class='bar'><div class='sl_tooltip'></div>"));
		}
		var maxwidth = $(this).width()-$(this).children('.bar').width();
		$(this).children('.bar').dragable({
				limit:true,
				vertical:false,
				ondragmove :function(dom){
					var percent = Math.round((dom.offsetLeft/maxwidth)*100)+'%'
					var percent1 = Math.round((dom.offsetLeft/maxwidth)*100)/100;
					$(dom).parent().children('.line_pass').width(percent);
					$(dom).find('.sl_tooltip').show().html(percent);
					if(options.onsliderMove){
						options.onsliderMove.call(dom,percent1);
					}
				}
		});
	}
})(jQuery);