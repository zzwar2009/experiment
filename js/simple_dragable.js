
/*
*@author zhangz
*@date  2014.9.19
*/
(function($) {
	$.fn.dragable = function(params){
		var defaults={

		}
		var options = $.extend(defaults, params);
		new drag(this.get(0),options);
	}
})(jQuery)
function drag(oDiv,options){
	oDiv.onmousedown=function(ev){
		var oEvent=ev || event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		
		function fnMove(ev){
			var oEvent=ev || event;
			var newLeft=oEvent.clientX-disX;
			var newTop=oEvent.clientY-disY;
			var p_width =  $(oDiv).parent().width();
			var p_height = $(oDiv).parent().height();
			if(!!options.limit){
				if(newLeft < 0){
					newLeft = 0;
				}
				if(newTop < 0){
					newTop = 0;
				}
				if(newLeft > (p_width-oDiv.offsetWidth)){
					newLeft = p_width-oDiv.offsetWidth;
				}
				if(newTop > (p_height-oDiv.offsetHeight)){
					newTop = p_height-oDiv.offsetHeight;
				}
			}
			if(typeof options.vertical !='undefined' &&  options.vertical ==false){
				newTop =oDiv.offsetTop;
			}
			if(typeof options.horizontal !='undefined' &&  options.horizontal ==false){
				newLeft = oDiv.offsetLeft;
			}
			oDiv.style.zIndex=2;
			oDiv.style.left=newLeft+'px';
			oDiv.style.top=newTop+'px';
			if(options.ondragmove){
				options.ondragmove.call(this,oDiv);
			}
		}
		function fnUp(){
			this.onmousemove=null;
			this.onmouseup=null;
			if(oDiv.releaseCapture){
				this.releaseCapture()	
			}	
			if(options.afteDrag){
				options.afteDrag.call(this,oDiv);
			}
		}
		if(oDiv.setCapture){
			oDiv.onmousemove=fnMove;
			oDiv.onmouseup=fnUp;
			oDiv.setCapture();	
		}else{
			document.onmousemove=fnMove;
			document.onmouseup=fnUp;
		}

		return false;  //防止选中文字	
	}	
}