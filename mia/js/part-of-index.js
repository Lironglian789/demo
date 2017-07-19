//购物车提示
$("#right2 div:eq(1)").hover(function(){
  $(".begin").css("display","block");
  $("#right2 div:eq(1)").css("border-color","deeppink");
},function(){
	$(".begin").css("display","none");
	$("#right2 div:eq(1)").css("border-color","lightgray");
})
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
	
//轮播图
var items = $('#swiper-wrapper').children();
var len = items.length;
var index = 0;
var str = 0;
var timer=null;
var dots =  $('.dot').children();
//自动轮播函数
function autoPlay(){
    $(items[index]).fadeIn(2000);
    timer=setInterval(function(){
    	$(dots).removeClass("active");
        if(index >=0 & index < len-1){
            $(items[index]).fadeOut(2000);
            index++;
            $(items[index]).fadeIn(2000);
            $(dots[index]).addClass("active");
        }else{
            $(items[index]).fadeOut(2000);
            index=0;
            $(items[index]).fadeIn(2000);
            $(dots[index]).addClass("active");
        };
        str = index;
    },3000)
}
autoPlay();
//点击左侧按钮的函数
$(".left").click(function(){
    $(dots).removeClass("active");
    if(str == 0){
        $(items[str]).fadeOut(2000);
        str = len-1;
        $(items[str]).fadeIn(2000);
        $(dots[str]).addClass("active");
        index = str;
        
    }else{
        $(items[str]).fadeOut(2000);
        str --;
        $(items[str]).fadeIn(2000);
        $(dots[str]).addClass("active");
        index = str;
    }
});
//点击右侧按钮的函数
$(".right").click(function(){
    $(dots).removeClass("active");
    if(str == len-1){
        $(items[str]).fadeOut(2000);
        str = 0;
        $(items[str]).fadeIn(2000);
        $(dots[str]).addClass("active");
        index = str;
    }else{
        $(items[str]).fadeOut(2000);
        str ++;
        $(items[str]).fadeIn(2000);
        $(dots[str]).addClass("active");
        index = str;
    }
})
//小圆点
$(".dot span").mouseover(function(){
	var num = $(this).index();
    $(dots).removeClass("active");
    $(dots[num]).addClass("active");
    $(items).fadeOut(2000);
    $(items[num]).fadeIn(2000);
    index = num;
    clearInterval(timer)
})
$(".dot span").mouseout(function(){
	autoPlay();
})

//二级菜单
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
var Ad=document.getElementById("ad");
window.onscroll=function(){
	var top=document.body.scrollTop;
	if(top>300){
		Left.style.display="block";
		Right.style.display="block";
		Ad.style.display="block";
	}
	if(top<300){
		Left.style.display="none";
		Right.style.display="none";
		Ad.style.display="none";
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

//底部广告
$("#close").click(function(){
	$(".fixed-bottom").hide();
	$("#close").hide();
})

