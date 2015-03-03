/*
 * jQuery verson 1.10.2
 * simple layout 插件
 * author zhangz
 */
(function($) {
 	$.fn.layout = function(params){
		var parent = $(this);
		parent.addClass("ui-layout");
		var defaults = {
			collapse:true
		};
		var opt = $.extend(defaults,params)
		var width,height,leftWidth = 0,sepWidth = 0,headHeight = 0 , bottomHeight = 0;
		if(opt.left!=null && opt.left.title!=null){
			
			if(opt.left.collapse){
				var leftTitle = "<div class='ui-layout-left-title'>"+opt.left.title+"<span class='ui-layout-left-op'><span class='ui-layout-icon arrow-left'></span><span class='ui-layout-icon arrow-right'></span></span></div>";
			}else{
				var leftTitle = "<div class='ui-layout-left-title'>"+opt.left.title+"</div>";
			}
			$(opt.left.target).prepend(leftTitle);
			if(opt.left.collapse){
				initCollapse();
			}
		}

		initLayout(opt);
		$(window).off("resize.layout").on("resize.layout", function(){
 			initLayout(opt);
 		});
		function initLayout(opt){
			height = parent.height();
			width = parent.width();
			initClass(opt)
		}
		function initClass(opt){
			if(opt.head!=null){
				$(opt.head.target).addClass("ui-layout-"+"head");
				headHeight = $(opt.head.target).height();
			}
			if (opt.bottom!=null){
				$(opt.bottom.target).addClass("ui-layout-"+"bottom");
				bottomHeight = $(opt.bottom.target).height();
			}
			 if (opt.left!=null){
				$(opt.left.target).addClass("ui-layout-"+"left");
				
				leftWidth = opt.left.width ;
				$(opt.left.target).css({
					height:height-bottomHeight-headHeight,
					top:headHeight,
					width:leftWidth
				});
				leftWidth = $(opt.left.target).width();;
			}
			if (opt.separater!=null){
				$(opt.separater.target).addClass("ui-layout-"+"separater");
				sepWidth = $(opt.separater.target).width();
				if(opt.separater.thin == true){
					sepWidth = 0;
				}
				$(opt.separater.target).css({
					height:height-bottomHeight-headHeight-2,
					top:headHeight,
					left:leftWidth,
					width:sepWidth
				})

				
			}
			if (opt.right!=null){
				$(opt.right.target).addClass("ui-layout-"+"right");
				$(opt.right.target).css({
					height:height-bottomHeight-headHeight,
					top:headHeight,left:leftWidth+sepWidth,
					width:width-(leftWidth+sepWidth)
				})
				console.log($(opt.right.target).height() +'------------'+ $(opt.right.target).width() )
			}
		}
		//初始化left拉伸动画
		function initCollapse(){
			$(".ui-layout-icon.arrow-left").on("click", function(){
				var left_arrow = $(this);
				$(opt.left.target).animate({width:"0px"},	100, function(){
					$(opt.left.target).hide();
					$(".ui-layout-icon.arrow-right").appendTo($(opt.separater.target)).show();
				});
				$(opt.separater.target).animate({
					left: 0 + "px", width: "32px"}, 100);
				$(opt.right.target).animate({
					"left": 32 + "px", 
					width:width - 32 + "px"
				}, 100);
			});
			$(".ui-layout-icon.arrow-right").on("click", function(){
				var right_arrow = $(this);
				$(opt.left.target).animate({width:leftWidth},100, function(){
					$(opt.left.target).show();
					$(".ui-layout-icon.arrow-right").hide();
				});
				$(opt.separater.target).animate({"left": leftWidth + "px", width: sepWidth}, 100);
				$(opt.right.target).animate({
					"left": leftWidth + sepWidth + "px",
					width:width - leftWidth - sepWidth + "px"}, 100);
			});
		}
	}
	
})(jQuery);