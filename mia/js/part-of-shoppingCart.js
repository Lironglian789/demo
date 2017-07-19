//删除商品
var dels=$(".add-goods").find(".del");
var goods=$(".add-goods");
for(var i=0;i<dels.length;i++){
	(function(i){
		$(dels[i]).click(function() {
	    	$(".alert").css("display","block");
	    	$("#div").css("display","block");
	    	$("#confirm").click(function(){
	    		$(".alert").css("display","none");
	    	    $("#div").css("display","none");
	    		$(goods[i]).remove();
				if($(".add-goods").length == 0) {
					$("div").remove(".container");
					$(".empty").css("display","block");
					$("body").css("background","#f2f2f0");
			    }
	    	})
	    	$("#cancel").click(function(){
	    		$(".alert").css("display","none");
	    	    $("#div").css("display","none");
	    	})
	    })
	})(i);
} 

// 数量减少
$(".reduce").each(function(){
	$(this).click(function(){
	    var t = $(this).parent().find('.txt');
	    t.val(parseInt(t.val()) - 1);
	    var C=$(this).parent().find('.change');
	    $(C).stop().slideDown(200);
	    setTimeout(function(){$(C).hide()},1000);
	    var sub=$(this).closest(".add-goods").find(".subTotal");
	    if (t.val() <= 0) {
	      t.val(0);
	      sub.text(0);
	    }else{
	    	var unitprice1=$(this).closest(".add-goods").find(".unitPrice").text();
	        var quantity1=$(this).next().val();
	        subprice1=parseFloat(unitprice1)*parseFloat(quantity1);
	        sub.text(subprice1);
	    }
	    var checked=$(this).parents(".add-goods").find(".checkEach");
	    if (checked.is(":checked")){
			totalPrice();
		}
    })
})

// 数量增加
$(".add").each(function(){
	$(this).click(function() {
	    var t = $(this).parent().find('.txt');
	    t.val(parseInt(t.val()) + 1);
	    var C=$(this).parent().find('.change');
	    $(C).stop().slideDown(200);
	    setTimeout(function(){$(C).hide()},1000);
	    var sub2=$(this).closest(".add-goods").find(".subTotal");
	    var unitprice2=$(this).closest(".add-goods").find(".unitPrice").text();
	    var quantity2=$(this).prev().val();
	    subprice2=parseFloat(unitprice2)*parseFloat(quantity2);
	    sub2.text(subprice2);
	    var checked=$(this).parents(".add-goods").find(".checkEach");
		if (checked.is(":checked")) {
			totalPrice();
		}
    })
})

//直接输入商品数量
$(".txt").each(function(){
	$(this).blur(function(){
		var sub3=$(this).closest(".add-goods").find(".subTotal");
	    var unitprice3=$(this).closest(".add-goods").find(".unitPrice").text();
	    var quantity3=$(this).val();
	    subprice3=parseFloat(unitprice3)*parseFloat(quantity3);
	    sub3.text(subprice3);
	    var checked=$(this).parents(".add-goods").find(".checkEach");
		if (checked.is(":checked")) {
			totalPrice();
		}
		var C=$(this).parent().find('.change');
	    $(C).stop().slideDown(200);
	    setTimeout(function(){$(C).hide()},1000);
	})
})

// 点击商品按钮
$(".checkEach").click(function() {
    var goods = $(this).closest(".li1").find(".checkEach"); //获取商品数量
    var goodsC = $(this).closest(".li1").find(".checkEach:checked"); //获取所有被选中的商品
    $("#pay").css("background","deeppink");
    if( $(".checkEach:checked").length==0){
    	$("#pay").css("background","#333333");
    }
	if ($(".checkEach").length == $(".checkEach:checked").length) { //如果被选中的数量等于所有商品的数量
	    $(".checkAll").prop('checked', true); //全选按钮被选中
	    totalPrice();
	} else {
	    $(".checkAll").prop('checked', false); //else全选按钮不被选中 
	    totalPrice()
	}
})

// 点击全选按钮
$(".checkAll").click(function() {
    if ($(this).prop("checked") == true) { //如果全选按钮被选中
       $(".checkAll").prop('checked', true);
       $(".checkEach").prop('checked', true); //所有按钮都被选中
       $("#pay").css("background","deeppink");
       totalPrice();
    } else {
	    $(".checkAll").prop('checked', false);
	    $(".checkEach").prop('checked', false); //else所有按钮不全选
	    $("#pay").css("background","#333333");
	    totalPrice();
    }
})

function totalPrice() {
	var totalPrice = 0; 
	var amount=0;
	$(".checkEach").each(function() { 
		if ($(this).is(":checked")) { 
	      var subPrice=$(this).closest(".add-goods").find(".subTotal").text(); 
	      totalPrice += parseFloat(subPrice);
	      var quantity=$(this).closest(".add-goods").find(".txt").val(); 
	      amount+=parseInt(quantity);
		}
	})
	$("#total").text(totalPrice.toFixed(2)); 
	$("#quantity").text(amount); 
}

//hover图片放大
$(".img").each(function(){
	$(this).mouseover(function(){
		$(this).parents(".li1").find(".enlarge").stop().show(500);
	})
	$(this).mouseout(function(){
		$(this).parents(".li1").find(".enlarge").stop().hide(500);
	})
})

//删除选中商品
$(".go a:eq(0)").click(function(){
    var each=$(".checkEach");
    var Goods=$(".add-goods");
    for(var i=0;i<each.length;i++){
    	(function(i){
	    	if($(each[i]).is(":checked")){
	    	    $("#remind1").css("display","none");
		        $(".alert").css("display","block")
		        $("#div").css("display","block");
		        $("#confirm").click(function(){
		      	   $(".alert").css("display","none")
		           $("#div").css("display","none");
		           $(Goods[i]).remove();
		           if($(".add-goods").length == 0) {
						$("div").remove(".container");
						$(".empty").css("display","block");
						$("body").css("background","#f2f2f0");
			        }
		        })
	    	}else{
				$("#remind1").stop().slideDown(200);
				setTimeout(function(){$("#remind1").hide()},2500);
		    }
    	})(i);
    }
})

//清除无效商品
$(".go a:eq(1)").click(function(){
	$("#remind2").stop().slideDown(200);
    setTimeout(function(){$("#remind2").hide()},2500);
})

//移入收藏夹
$(".go a:eq(2)").click(function(){
	 $(".checkEach").each(function() { 
		if ($(this).is(":checked")) {
		  $("#remind3").css("display","none");
	      $(".alert").css("display","block")
	      $("#div").css("display","block");
	      $("#div #dtitle").text("移入收藏夹"); 
	      $("#div p").text("确定将选中的商品移入收藏夹吗？");
	      $("#cancel").click(function(){
	      	$(".alert").css("display","none")
	        $("#div").css("display","none");
	      })
		}else{
			$("#remind3").stop().slideDown(200);
            setTimeout(function(){$("#remind3").hide()},2500);
		}
	})
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