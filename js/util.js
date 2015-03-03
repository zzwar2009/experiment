/*	@date   2013/9/12
	@author zhangz
*/
var domContext = {
//可视高度
vHeight:document.documentElement.clientHeight||document.body.clientHeight,
//可视宽度
vWidth:document.documentElement.clientWidth||document.body.clientWidth
}
var $get = function (id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};
var Class = {
		create: function() {
			return function() { this.initialize.apply(this, arguments); }
		}
	}
var Event = Class.create();
Event.prototype = {
	//拖放对象
	initialize: function(option) {
	},
	bind:function (ele,type,fn){
		if(ele.addEventListener){//如果标准浏览器支持
			ele.addEventListener(type,fn,false);//标准的方式
		}else if(ele.attachEvent){//如果浏览器支支持这个方法（IE）
			var newFn=function(){fn.apply(ele);}
			if(!ele['arr'+type]){//定义一个数组
				ele['arr'+type]=[]
			}
			//下面主要是解决IE中用这种方式绑定事件，this关键字的指向问题
			//var newFn=function(){fn.apply(ele);} 这一句：把传进来的fn方法包装一下，生成一个新方法。
			newFn.photo=fn;//这个自定义属性photo保存fn的引用
			ele['arr'+type].push(newFn);
			// ele['arr'+type][ele['arr'+type].length-1]表示穿了马甲的新方法
			ele.attachEvent('on'+type,ele['arr'+type][ele['arr'+type].length-1]);
		}else{
			ele['on'+type]=fn;
		}
	},
	unBind:function (ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);//标准的方式
	}else if(ele.attachEvent){
		var a=ele['arr'+type];
		for(var i=0;i<a.length;i++){
			if(a[i].photo==fn){
				ele.detachEvent('on'+type,a[i]);
				a.splice(i,1);
				break;
			}
		}		
	}else{
		ele['on'+type]=null;//DOM0级的事件绑定	
	}
	},
	MOUSE:function(e){//获取鼠标加了浏览器滚动条的位置
		e=e||window.event;
		var o={};
		o.x=e.pageX||((document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX);
		o.y=e.pageY||((document.documentElement.scrollTop||document.body.scrollTop)+e.clientY);
		return o;
	},
	preventDefault:function (event){//阻止事件的默认行为
		event=event||window.event;
		if(event.preventDefault) //标准的
			event.preventDefault();
		else 
			event.returnValue=false;//IE的	
			return false;
	},
	fnBind:function(fn,obj){
		return function(e){fn.call(obj,e)}
	}
}
var E = Event.prototype;//起别名
var Drag = Class.create();
Drag.prototype = {
  //拖放对象
	initialize: function(drag) {
	  this.drag = $get(drag);
	  E.bind(this.drag,'mousedown',this._down);
	},
	_down:function(e){
		this.MP=E.MOUSE(e);
		this.EP={x:this.offsetLeft,y:this.offsetTop};
		this.move = E.fnBind(Drag.prototype._move,this);
		this.up = E.fnBind(Drag.prototype._up,this);
		if(this.setCapture){
			E.bind(this,'mousemove',Drag.prototype._move);
			E.bind(this,'mouseup',Drag.prototype._up);
			this.setCapture();
		}else{
			E.bind(document,'mousemove',this.move);
			E.bind(document,'mouseup',this.up);
		}
		E.preventDefault(e);
	},
	_move:function(e){
		//防止出现负数
		var moveleft = (E.MOUSE(e).x-this.MP.x)+this.EP.x<0 ? 0:(E.MOUSE(e).x-this.MP.x)+this.EP.x;
		var movetop = (E.MOUSE(e).y-this.MP.y)+this.EP.y<0 ? 0:(E.MOUSE(e).y-this.MP.y)+this.EP.y;
		this.style.left = moveleft+'px';
		this.style.top =  movetop+'px';
	},
	_up:function(){
		if(this.releaseCapture){
			E.unBind(this,'mousemove',Drag.prototype._move);
			E.unBind(this,'mouseup',Drag.prototype._up);
			this.releaseCapture();		
		}else{	
			E.unBind(document,'mousemove',this.move);
			E.unBind(document,'mouseup',this.up);
		}
	}
 }
 //dialog组件demo版本
 var dialog = Class.create();
 dialog.prototype = {
	initialize: function() {
	},
}
	document.onclick=function(event){
		event=event||window.event;
		var target=event.target||event.srcElement;
		var myId=target.getAttribute('class');
		if(myId=='dialog-close'){
			$(target).parent().hide();
			$("#oMask").hide();
		}
	}
	dialog.open = function(id,options){
		$(document).ready(function(){
			$("<div id='oMask'></div>").prependTo("body");
			//是否需要遮罩
			if(!!options.module){
				$("#oMask").css({
					width:$(window).width(),
					height:$(window).height(),
					display:'block',
					backgroundColor:'#000',
					opacity:0.1,
					filter:'alpha(opacity=50)'
				})
			}
		})
		//设置居中
		var left = ($(window).width() - $('#'+id).outerWidth()) / 2 + "px";
		var top = ($(window).height() - $('#'+id).outerHeight()) / 2 + $(document).scrollTop()+ "px";
		$('#'+id).css({left:left,top:top})
		$('#'+id).show();
		$('#'+id).find('.dialog-title').html(options.title);
		$('#'+id).find('.dialog-content').html(options.html);
		$('#'+id).find("span[class='confirm']").bind('click',function(){
			options.confirm();
			$('#'+id).hide();$("#oMask").hide();
		})
		$('#'+id).find("span[class='cancel']").bind('click',function(){$('#'+id).hide();$("#oMask").hide();})
	}