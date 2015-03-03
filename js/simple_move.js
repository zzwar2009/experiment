//匀速运动
function linear(dom,direction,target){
	if(direction=='opacity'){
		if(target>1||target<0){
			alert('不透明度的值越界！');
			throw new Error('不透明度的值越界！');
		}
		if(dom.style.opacity==''||typeof dom.style.opacity=='undefined'){
			dom.style.opacity=1;
			dom.style.filter='alpha(opacity=100)';			
		}
		var nOffset=0.003;	
		var fOpacity=parseFloat(dom.style.opacity);
		if(target>fOpacity){//往大处变化
			if(fOpacity+nOffset >= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')'//IE的
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}else if(target<fOpacity){
			nOffset*=-1;	
			if(fOpacity+nOffset <= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')';//IE
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}
		else{
			return 'ok';
		}
	}else{
		var attr = direction;
		switch(direction){
			case 'left':
				direction='offsetLeft';
				break;
			case 'top':
				direction='offsetTop';
				break;
			case 'width':
				direction='offsetWidth';
				break;
			case 'height':
				direction='offsetHeight';
				break;
			default :
			alert(direction)
			alert('不支持此方向的运动！');
			throw new Error('不支持此方向的运动！');		
		}
		var step = 15;
		if(dom[direction] == target){
			return 'ok';
		}else{
			if(dom[direction]+step > target){
				dom.style[attr] = target+'px';
			}else if(dom[direction]+step < target){
				dom.style[attr] = dom[direction]+step+'px';
			}
		}
	}
}
//缓速运动
function ease(dom,direction,target,fnCallBack){
	if(direction=='opacity'){
		if(target>1||target<0){
			alert('不透明度的值越界！');
			throw new Error('不透明度的值越界！')
		}
		if(dom.style.opacity==''||typeof dom.style.opacity=='undefined'){
			dom.style.opacity=1;
			dom.style.filter='alpha(opacity=100)';			
		}
		var nOffset=0.003;	
		var fOpacity=parseFloat(dom.style.opacity);
		if(target>fOpacity){//往大处变化
			if(fOpacity+nOffset >= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')'//IE的
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}else if(target<fOpacity){
			nOffset*=-1;	
			if(fOpacity+nOffset <= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')';//IE
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}
		else{
			return 'ok';
		}
	}else{
		var attr = direction;
		switch(direction){
			case 'left':
				direction='offsetLeft';
				break;
			case 'top':
				direction='offsetTop';
				break;
			case 'width':
				direction='offsetWidth';
				break;
			case 'height':
				direction='offsetHeight';
				break;
			default :
			alert(direction)
			alert('不支持此方向的运动！');
			throw new Error('不支持此方向的运动！');		
		}
		
		var step = (target - dom[direction])/8;
		step = step>0?Math.ceil(step):Math.floor(step);
		if(dom[direction] == target){
			return 'ok';
		}else{
			if(dom[direction]+step >= target){
				dom.style[attr] = target+'px';
			}else if(dom[direction]+step < target){
				dom.style[attr] = dom[direction]+step+'px';
			}
		}
	}
	
}
//弹性运动
function  bound(dom,direction,target,fnCallBack){
	if(direction=='opacity'){
		if(target>1||target<0){
			alert('不透明度的值越界！');
			throw new Error('不透明度的值越界！')
		}
		if(dom.style.opacity==''||typeof dom.style.opacity=='undefined'){
			dom.style.opacity=1;
			dom.style.filter='alpha(opacity=100)';			
		}
		var nOffset=0.003;	
		var fOpacity=parseFloat(dom.style.opacity);
		if(target>fOpacity){//往大处变化
			if(fOpacity+nOffset >= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')'//IE的
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}else if(target<fOpacity){
			nOffset*=-1;	
			if(fOpacity+nOffset <= target){
				dom.style.opacity=target;
				dom.style.filter='alpha(opacity='+target*100+')';//IE
			}else{
				dom.style.opacity=fOpacity+nOffset;
				dom.style.filter='alpha(opacity='+(fOpacity+nOffset)*100+')';
			}
		}else{
			return 'ok';
		}
	}else{
		var attr = direction;
		switch(direction){
			case 'left':
				direction='offsetLeft';
				break;
			case 'top':
				direction='offsetTop';
				break;
			case 'width':
				direction='offsetWidth';
				break;
			case 'height':
				direction='offsetHeight';
				break;
			default :
			alert(direction)
			alert('不支持此方向的运动！');
			throw new Error('不支持此方向的运动！');		
		}
		if(typeof dom[attr+'flexSpeed']=='undefined'){
				dom[attr+'flexSpeed']=0;
		}
		if(typeof dom[attr+'flag']=='undefined'){
			dom[attr+'flag']=0;
		}
		if(dom[attr+'flag']>3){
			return 'ok';
		}else{
			var acceleration=9;
			dom[attr+'flexSpeed']+=acceleration;
			dom[attr+'flexSpeed']*=0.93;
			if(dom[direction]+dom[attr+'flexSpeed']>target){
				dom.style[attr]=target+'px';
				dom[attr+'flexSpeed']*=-1;
				dom[attr+'flag']++
			}else{
				dom.style[attr]=dom[direction]+dom[attr+'flexSpeed']+'px';
				dom[attr+'flag']=0;
			}
		}
	}
}
var timer = null;
function move(dom,obj,fnCallback,type){
	clearTimeout(timer);//防止同时执行多次
	var move_method = null;
	switch(type){
		case 'linear':
			move_method= linear;
			break;
		case 'ease':
			move_method = ease;
			break;
		case 'bound':
			move_method = bound;
			break;
		default :
		throw new Error('不支持此方向的运动！');		
	}
	var flag = false;
	for(var attr in obj){
		if(move_method(dom,attr,obj[attr])!='ok'){
			flag = true;
		}
	}
	if(flag){
		timer = window.setTimeout(function(){move(dom,obj,fnCallback,type)},30);
	}else{
		if(fnCallback){
			fnCallback.call(dom);
		}
	}
}	
