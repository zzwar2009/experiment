(function($) {
	$.simpleAlert = function(txt,type,duration){
		if(txt=='close'){
			$('.simple_alert').fadeOut();
			$('.simple_alert').remove();
			return ;
		}
		$('.simple_alert').remove();
		switch(type){
			case 'ok':
				var direction='offsetLeft';
				break;
			case 'info':
				var direction='offsetTop';
				break;
			case 'warning':
				var direction='offsetWidth';
				break;
			case 'error':
				var direction='offsetHeight';
				break;
			case 'loading':
				var direction='offsetHeight';
				break;
			default:
				alert('参数错误不支持此类型提示');
				throw new Error('参数错误不支持此类型提示');		
		};
		var  simple_alert = $("<div class='simple_alert'><div class='icon "+type+"'></div><div class='msg'>"+txt+"</div></div>");

		$('body').append(simple_alert);
		var ml = simple_alert.outerWidth()/2;
		var mt = simple_alert.outerHeight()/2;
		simple_alert.css({
			'margin-left':-ml,
			'margin-top':-mt
		});
		simple_alert.fadeIn();

		if(duration=='no'){

		}else{
			setTimeout(function(){$.simpleAlert("close");},duration);
		}
	}
})(jQuery);
(function($) {
	$.confirm = function (params){
		var defaults = {

		}
		var options = $.extend(defaults, params);
		$('.confirm-window').remove();

		if(options.type =='confirm'){
			var dom = $("<div class='confirm-window confirm_dialog' title=''><h2 class='confirm_title'>"+options.title+"</h2><div class='msg'>"+options.content+"</div><div class='dlg_close' style='display: block;''></div><div class='dialog-button-wrap' style='text-align:center'><div class='dlg-button'><button type='button' class='button blue'>确定</button><button type='button' class='button last'>取消</button></div></div></div>");

			dom.appendTo('body');
			var ml = dom.outerWidth()/2;
			var mt = dom.outerHeight()/2;
			dom.css({
				'margin-left':-ml,
				'margin-top':-mt
			});
			var buttons = dom.find('button');
			buttons.eq(0).off('click').on('click',function(){
					options.onConfirm();
					_closeAlert();

			});
			buttons.eq(1).off('click').on('click',function(){
					_closeAlert();

			})
		}else if (options.type =='alert'){
			
			var dom = $("<div class='confirm-window confirm_dialog' title=''><h2 class='confirm_title'>"+options.title+"</h2><div class='msg'>"+options.content+"</div><div class='dlg_close' style='display: block;''></div><div class='dialog-button-wrap' style='text-align:center'><div class='dlg-button'><button type='button' class='button blue last'>确定</button></div></div></div>");

			dom.appendTo('body');
			var ml = dom.outerWidth()/2;
			var mt = dom.outerHeight()/2;
			dom.css({
				'margin-left':-ml,
				'margin-top':-mt
			});
			var buttons = dom.find('button');
			buttons.eq(0).off('click').on('click',function(){
					options.onConfirm();
					_closeAlert();

			});
		}

		dom.find('.dlg_close').off('click').on('click',function(){
			$('.confirm-window').remove();
		})
		function _closeAlert(){
			$('.confirm-window').remove();
		}
	}
})(jQuery);

