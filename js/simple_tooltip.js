/*
 * jQuery verson 1.10.2
 * simple dialog 插件
 * date 2014.6.27
 * author zhangz
 */
(function($) {
 	$.fn.tooltip = function(params){
		var defaults={
			position:'bottom'
		}
		var options = $.extend(defaults, params);
		
		$(this).off('mouseover').on('mouseover',function(){
			var parent_position = getPosition(this);
			var t_content  = $(this).attr('tooltip');
			var frag = $("<div class='tooltip_msg_cont'>"+t_content+"<div class='tooltip_trangle "+options.position+"'><i class='wrap_t'></i><i class='inner_t'></i></div></div>");
			$('body').append(frag);
			var position = {};
			switch(options.position){
				case 'left':
					position.l = parent_position.l+$(this).outerWidth()+20;
					position.t = parent_position.t-($(this).outerHeight()/2);
					break;
				case 'right':
					position.l = parent_position.l-frag.outerWidth()-20;
					position.t = parent_position.t-($(this).outerHeight()/2);
					break;
				case 'top':
					position.l = parent_position.l;
					position.t = parent_position.t+20+10;
					break;
				case 'bottom':
					position.l = parent_position.l;
					position.t = parent_position.t-frag.outerHeight()-20;
					break;
				default:
					throw new Error('参数异常')
			};
			if(position.l<0){
				position.l = 0;
			}
			if(position.t<0){
				position.t = 0;
			}
			frag.css({
				left : position.l,
				top : position.t
			})
		});

		$(this).off('mouseout').on('mouseout',function(){
			$('.tooltip_msg_cont').remove();
		})
	}
})(jQuery);