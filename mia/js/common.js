//购物车提示
$("#right2 .cart").hover(function(){
  $(".begin").css("display","block");
  $("#right2 .cart").css("border-color","deeppink");
},function(){
	$(".begin").css("display","none");
	$("#right2 .cart").css("border-color","lightgray");
})

//搜索框
$("#int").focus(function(){
	$(".option").css("display","block");
	$("#int").css("outline","none");
}).blur(function(){
	$(".option").css("display","none");
})

//正品保证详情
$(".hover").hover(function(){
  $(".hide").css("display","block");
},function(){
	$(".hide").css("display","none");
})

//三级菜单
$(".goods").mouseover(function(){
	$(".list").css("display","block");
}).mouseout(function(){
	$(".list").css("display","none");
})
$("#L1").mouseover(function(){
		$("#content1").css("display","block");
		$("#L1").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content1").css("display","none");
		$("#L1").css("border-left","none");
})
$("#L2").mouseover(function(){
		$("#content2").css("display","block");
		$("#L2").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content2").css("display","none");
		$("#L2").css("border-left","none");
})
$("#L3").mouseover(function(){
		$("#content3").css("display","block");
		$("#L3").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content3").css("display","none");
		$("#L3").css("border-left","none");
})
$("#L4").mouseover(function(){
		$("#content4").css("display","block")
		$("#L4").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content4").css("display","none");
		$("#L4").css("border-left","none");
})
$("#L5").mouseover(function(){
		$("#content5").css("display","block")
		$("#L5").css("border-left","5px solid hotpink")
}).mouseout(function(){
		$("#content5").css("display","none");
		$("#L5").css("border-left","none");
})
$("#L6").mouseover(function(){
		$("#content6").css("display","block")
		$("#L6").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content6").css("display","none");
		$("#L6").css("border-left","none");
})
$("#L7").mouseover(function(){
		$("#content7").css("display","block")
		$("#L7").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content7").css("display","none");
		$("#L7").css("border-left","none");
})
$("#L8").mouseover(function(){
		$("#content8").css("display","block");
		$("#L8").css("border-left","5px solid hotpink");
}).mouseout(function(){
		$("#content8").css("display","none");
		$("#L8").css("border-left","none");
})

//微信二维码
$("#wechat").mouseover(function(){
	$("#sys").stop().show(500);
}).mouseout(function(){
	$("#sys").stop().hide(500);
})
$("#zixun").click(function(){
	alert("请登录后再来点我哦");
})

//返回顶部
var BTN=document.getElementById("btn");
var Right=document.getElementsByClassName("fixed-right")[0];
var Left=document.getElementsByClassName("fixed-left")[0];
window.onscroll=function(){
	var num=document.body.scrollTop;
	if(num>300){
		Left.style.display="block";
		Right.style.display="block";
	}
	if(num<300){
		Left.style.display="none";
		Right.style.display="none";
	}
}
$('#btn').click(function(){
	$("html,body").animate({scrollTop:"0px"},500);
})

//关注蜜芽
$("#wx").mouseover(function(){
	$("#weixin").show(500);
}).mouseout(function(){
	$("#weixin").hide(500);
})