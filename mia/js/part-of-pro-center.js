//加入购物车
//数量减少
$("#jian").click(function(){
	var reduce=$(this).next();
	reduce.val(parseInt(reduce.val())-1);
	if (reduce.val() <= 0) {
        reduce.val(0);
    }
    Total();
})
//数量增加		
$("#jia").click(function(){
	var add=$(this).prev();
	add.val(parseInt(add.val())+1);
	Total();
})
function Total(){
	$(".tianjia").click(function(){
		$(".fly").show(200);
		setTimeout(function(){$(".fly").css("display","none")},3000);
		var sum=0;
		var nums=parseInt(($("#jia").prev()).val());
		sum=nums;
		$("#total").text(sum);
		//添加后的购物车
		$("#zong").text(sum);
		$("#right2 .cart").hover(function(){
		  $(".begin").css("display","none");
		  $(".after").css("display","block");
		},function(){
			 $(".after").css("display","none");
		})
	})
}

//添加收藏
$("#collect").click(function(){
	alert("请登录后再收藏！");
})

//七天无理由退货
$(".add ul li:eq(2)").mouseover(function(){
	$(".sp1").stop().show(800);
}).mouseout(function(){
	$(".sp1").fadeOut(500);
})

//假一赔十
$(".add ul li:eq(3)").mouseover(function(){
	$(".sp2").css("display","block");
	$(".sp2").css("background","white");
}).mouseout(function(){
	$(".sp2").css("display","none");
})

//商品详情>tab切换
var List=document.getElementById("list");
var LIS=List.getElementsByTagName("li");
var DIVS=document.getElementById("content").children;
for(var i=0;i<LIS.length;i++){
	LIS[i].index=i;
	LIS[i].onclick=function(){
		for(var j=0;j<LIS.length;j++){
			LIS[j].className="";
			DIVS[j].className="hidden";
		}
		LIS[this.index].className="sel";
		DIVS[this.index].className="";
	}
}

//蜜芽圈点赞
$("#evaluate-content .thumb").click(function(){
	alert("登录蜜芽账后才能点赞哦！");
	window.location.href= "login.html";
})

//蜜芽圈分页切换
var Pages=document.getElementById("pagers");
var btns=Pages.getElementsByTagName("button");
var evls=document.getElementById("evaluate-content").children;
for(var i=0;i<btns.length;i++){
	btns[i].index=i;
	btns[i].onclick=function(){
		for(var j=0;j<btns.length;j++){
			btns[j].className="";
			evls[j].className="uncover";
		}
		btns[this.index].className="pink";
		evls[this.index].className="";
	}
}

//蜜芽优势>tab切换
var $li=$(".mia_advantage li");
$li.on("click",function(){
  	var index=$(this).index();
  	$li.eq(index).addClass("mia_current").siblings().removeClass("mia_current")
})
var Ls=document.getElementById("L");
var lis=Ls.getElementsByTagName("li");
var Cs=document.getElementById("C");
var divs=Cs.getElementsByTagName("div");
for(var i=0;i<lis.length;i++){
	lis[i].index=i;
	lis[i].onclick=function(){
		for(var j=0;j<lis.length;j++){
			divs[j].className="hidden";
		}
		divs[this.index].className="";
	}
}
