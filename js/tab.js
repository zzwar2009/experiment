/*
 * jQuery verson 1.10.2
 * AWS tab 插件
 * author zhangz
 */
(function($) {
	var contentWidth ;
	var contentHeight ;
	var contentInnerWidth ;
	var bottomInnerHeight;
 	$.fn.tab = function(params){
		var tab = $(this);
		var defaults = {};
		var options = $.extend(defaults, params)
		tab.options = options;//把属性绑定到tab 上
		init(tab,options);
		function init(tab,options){
			var content = tab.children("div");
			content.each(function(){
					if(options.nest){
						$(this).addClass('ui-tabs-div-bottom')
					}else{
						$(this).addClass('ui-tabs-div')
					}
			})
			if(options.nest){
				var header = tab.children("ul").first().addClass('ui-tabs-bottom')
			}else{
				var header = tab.children("ul").first().addClass('ui-tabs')
			}
			var tab_header = header.children("ul").first().children("li");
			tab_header.each(function(){
				//todo 默认打开环节处理
				if(0==$(this).attr('index')){
					$(this).addClass('current');
				}
				if(options.nest){
					$(this).addClass('ui-tabs-items-bottom');
				}else{
					$(this).addClass('ui-tabs-items');
					//$(this).prepend('<span class="ui-layout-icon close"></span>')
				}
				
				
			})
			
		}
		contentWidth = $('.ui-tabs').width()-2;
		console.log($('.ui-tabs').parent().parent().height()+'----h--')
		console.log($('.ui-tabs').parent().parent().width()+'--wwww--')
		console.log($('.ui-tabs').outerWidth())
		contentHeight = $('.ui-tabs').parent().parent().height()-$('.ui-tabs').height()-3;
		if(options.nest){
			contentInnerWidth = contentWidth;
			bottomInnerHeight = contentHeight - $('.ui-tabs-bottom').height()-3;
			loadNestTab(tab)
		}else{
			loadTab(tab);
		}
		//关闭tab方法
	}
	function addCloseListener(tab){
		tab.find('span.close').click(function(e){
			alert('remove')
			e.stopPropagation();
		})
	}
	function loadNestTab(tab){
		tab.children("div").each(function(){
		$(this).css({
				position : 'absolute',
				bottom :31,
				width:contentInnerWidth,
				height:bottomInnerHeight
		})
		//todo
		if($(this).attr("index")=='01'){
		}else{
			$(this).hide();
		}
		})
		//设置默认内容高度宽度
		tab.find('.ui-tabs-items').off("click.layout").on("click.layout", function(){		
			$(this).addClass('current-bottom').siblings().removeClass('current-bottom');
			var index = $(this).attr('index');
			tab.children("div").each(function(){
				if($(this).attr("index")==index){
					$(this).css('display','block').siblings("div").css('display','none');
				}
			})
		}
		);
		
		addCloseListener(tab)
	}
	function loadTab(tab){
		
		tab.children("div").each(function(){
			if($(this).attr("index")==0){

			}else{
				$(this).hide();
			}
		})
		//设置默认内容高度宽度
		tab.children("div").each(function(){
			$(this).css({
				width:contentWidth,
				height:contentHeight
			})
		})
		console.log(tab.find('.ui-tabs-items').length)
		
		tab.find('.ui-tabs-items').off("click.layout").on("click.layout", function(){
 			$(this).addClass('current').siblings().removeClass('current');
				var index = $(this).attr('index');
				tab.children("div").each(function(){
					//处理自定义事件
					if($(this).attr("index")==index){
						if(tab.options.openListener && typeof tab.options.openListener=='function'){
							tab.options.openListener();
						}
						$(this).css('display','block').siblings("div").css('display','none');
					}
				})
 		});
		addCloseListener(tab)
	}
	//动态创建tab
	$.fn.createTab = function(opt){
		var clospan = '<span class="ui-layout-icon close"></span>';
		$('.ui-tabs').children("ul").append('<li class="ui-tabs-items" index ='+opt.index+'>'+opt.title+clospan+'</li>')
		$('.ui-tabs').parent().append('<div index ='+opt.index+' class="ui-tabs-div">'+opt.html+'</div>')
		//loadTab($(this));
	}
	
})(jQuery);
