/*
 * jQuery verson 1.10.2
 * simple dialog ²å¼þ
 * date 2014.6.27
 * author zhangz
 */
simple = {};
(function($) {
 	simple.dialog = {
		init:function(dom,params){
			var self = $(dom);
			var defaults = {
				width:600,
				height:300,
				mask:true,
			};
			var that = this;
			var options = $.extend(defaults, params);
			//self.addClass('dialog').show();
			var $dialogbox = $("<div class='dialog'></div>");
			var left = Math.floor(options.width/2)*-1-2;
			var top = Math.floor(options.height/2)*-1-2;
			var left = Math.floor(($(window).width()-options.width)*0.5);
			var top = Math.floor(($(window).height()-options.height)*0.5);
			$dialogbox.css(
				{
					'width':options.width,
					'height':options.height,
					'left':left
					//'margin-left':left,
					//'margin-top':top
				}
			)
			$dialogbox.append("<h2 class='dialog_tit'>"+options.title+"</h2>");
			var close = $("<div class='dialog_close'></div>");
			close.off('click').on('click',function(){
				that.close(dom);
			})
			$dialogbox.append(close);
			var $dialog_content =$("<div class='dialog_content'></div>");
			$dialog_content.css('height',(options.height-137));
			self.show().appendTo($dialog_content);
			$dialogbox.append($dialog_content);
			var buttonWrapper = buildButtons(options.buttons);
			$dialogbox.append(buttonWrapper);
			if(options.mask){
				$.mask('open');
			}
			$('body').append($dialogbox);
			var obj ={
				top:top
			}
			move($dialogbox.get(0),obj,function(){
			},'ease');
			//new drag($dialogbox.get(0));
			$dialogbox.dragable({limir:true});
		},
		close:function(dom){
			var self = $(dom);
			var dlgbox = self.parent().parent();
			
			var dialog_tit = dlgbox.children(".dialog_tit").remove();
			var close = dlgbox.children(".dialog_close").remove();
			var button_wrapper = dlgbox.children(".button_wrapper").remove();
			var dlg_content = dlgbox.children(".dialog_content");
			//¹Ø±ÕÕÚÕÖ
			$.mask('close');
			dlg_content.unwrap();
			self.unwrap();
			self.hide();
		}
 	}
	function buildButtons(buttons){
		var buttonWrapper = $("<div class='button_wrapper'></div>");
		for(var i=0;i<buttons.length;i++){
			//buttons[i].handler
			var btn;
			if(buttons[i].cls == ''){
				btn = $("<span class='btn'>"+buttons[i].text+"</span>");
			}else{
				btn = $("<span class='btn "+buttons[i].cls+"'>"+buttons[i].text+"</span>");
			}
			btn.on('click',buttons[i].handler);
			buttonWrapper.append(btn)
		}
		return  buttonWrapper;
	}
})(jQuery);