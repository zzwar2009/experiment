 /*
 * jQuery verson 1.10.2
 * simple mask ²å¼þ
 * date 2014.6.27
 * author zhangz
 */
$.mask = function(method){
	if(typeof method == "undefined"){
		method="open";
	}
	if (method == "open") {
		if ($("#window-mask").length == 0) {
			var mask = $("<div id='window-mask' class='window-mask' style='display:none'></div>").appendTo("body");
			mask.css({
				width: $(window).width() + "px",
				height: $(window).height() + "px",
				filter: "alpha(opacity=60)"
			}).show();
			$(window).on("resize.mask", function(){
				mask.css({
					width: $(window).width() + "px",
					height: $(window).height() + "px"
				});
			});
		}
		
		var c = $("#window-mask").data("maskStackCount");
		if(c==null){
			c=0;
		}
		$("#window-mask").data("maskStackCount", ++c);
	}else if(method == "close"){
		var c = $("#window-mask").data("maskStackCount");
		if (c == 1) {
			$("#window-mask").remove();
			$(window).off("resize.mask");
		}else{
			$("#window-mask").data("maskStackCount", --c);
		}
	}
};