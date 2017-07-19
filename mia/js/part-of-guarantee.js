//图片导航
var $li=$(".moFixed ul li");
  $li.on("click",function(){
  	var index=$(this).index();
  	$li.eq(index).addClass("mia_current").siblings().removeClass("mia_current")
  })
  
//滚动到一定距离触发固定定位
$(window).scroll(function(){
	var scroHei=$(window).scrollTop();
	if (scroHei>=690) {
		$(".moFixed ul").css({"position":"fixed","top":"0px","z-index":"5","left":"0px"});
	}else{
		$(".moFixed ul").css("position","static");
	}
})

//页面内跳转
$(".moFixed ul li:eq(0)").click(function(){
	$("html,body").animate({scrollTop:"683px"},800);
})
$(".moFixed ul li:eq(1)").click(function(){
	$("html,body").animate({scrollTop:"3640px"},800);
})
$(".moFixed ul li:eq(2)").click(function(){
	$("html,body").animate({scrollTop:"5325px"},800);
})
$(".moFixed ul li:eq(3)").click(function(){
	$("html,body").animate({scrollTop:"6740px"},800);
})
$(".moFixed ul li:eq(4)").click(function(){
	$("html,body").animate({scrollTop:"7970px"},800);
})
$(".moFixed ul li:eq(5)").click(function(){
	$("html,body").animate({scrollTop:"8955x"},800);
})
$(".moFixed ul li:eq(6)").click(function(){
	$("html,body").animate({scrollTop:"10950px"},800);
})
$(".moFixed ul li:eq(7)").click(function(){
	$("html,body").animate({scrollTop:"11870px"},800);
})
$(".moFixed ul li:eq(8)").click(function(){
	$("html,body").animate({scrollTop:"13200px"},800);
})
$(".moFixed ul li:eq(9)").click(function(){
	$("html,body").animate({scrollTop:"14270px"},800);
})
$(".moFixed ul li:eq(10)").click(function(){
	$("html,body").animate({scrollTop:"15955px"},800);
})

//媒体报道
var scrollers = $('.scroller');
var pageIndex=scrollers.length;
var pageIndex=0;
var str = 0;
//点击右侧按钮
$(".btn-next").click(function(){
 	$(scrollers[str]).fadeOut(500);
  str ++;
	$(scrollers[str]).fadeIn(500);
 	pageIndex++;
 	if(pageIndex>=1){
 		$(".btn-prev").css("display","block");
	}
 	if(pageIndex>=3){
 		$(".btn-next").css("display","none");
	}
})
 //点击左侧按钮
$(".btn-prev").click(function(){
 	$(scrollers[str]).fadeOut(500);
	str --;
	$(scrollers[str]).fadeIn(500);
 	pageIndex--;
 	if(pageIndex<=0){
 		$(".btn-prev").css("display","none");
	}
 	if(pageIndex<3){
 		$(".btn-next").css("display","block");
	}
})