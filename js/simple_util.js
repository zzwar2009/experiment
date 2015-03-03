/*
 * jQuery verson 1.10.2
 * simple util 工具方法插件
 * date 2014.9.22
 * author zhangz
 */

//获取在文档的位置
function  getPosition(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {l:l, t:t};
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}