//获取屏幕宽度
window.onload=function(){
   document.documentElement.style.fontSize=document.documentElement.clientWidth/37.5+"px";
   window.addEventListener("resize",function(){
       document.documentElement.style.fontSize=document.documentElement.clientWidth/37.5+"px";
   })
} 
//点击底部菜单隐藏与显示
//方法一:
//var foot=document.getElementsByClassName("footer")[0];
//var P=foot.getElementsByTagName("p");
//var mshow=foot.getElementsByTagName("ul");
//for(var i=0;i<P.length;i++){
//	P[i].index=i;
//	P[i].onclick=function(){
////		console.log(show)
//  for(var j=0;j<P.length;j++){
//		mshow[j].className="";
//	}
//		mshow[this.index].className="show";
//		
//	}
//}
//
//$(".footer p").click(function(){
//	$(this).next().addClass("show");
//	$(this).parent().siblings().find("ul").removeClass("show");
//})

//方法二
$(".footer p").click(function(ev){
	$(this).next().stop().slideDown(200);
	$(this).parent().siblings().find("ul").stop().slideUp(200);
	ev.stopPropagation();
})
$("html").click(function(){
	$(".footer ul").stop().hide(200);
})
$(".footer ul").click(function(ev){
	$(this).stop().hide(200);
	ev.stopPropagation();
})

//勾选
$(document).on("click",".icon-gou",function(){
	$(this).toggleClass("style");
	$(this).parent().toggleClass("bg")
})