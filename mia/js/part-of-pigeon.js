//点击筛选条件
var A=$(".filtrate a");
for(var i=0;i<A.length;i++){
	(function(i){
		$(A[i]).click(function(){
			$(A[i]).parent().hide();
			str=$(this).index();
			var mytxt0=$("<div></div>");
			var mytxt1=$(this).parent().find(".title").text(); 
			var mytxt=$(this).text();
			var mytxt2=$("<a href='#'>"+mytxt+"</a>");
			var mytxt3=$("<a href='#' class='off'>X</a>"); 
			$(mytxt0).append(mytxt1,mytxt2,mytxt3);
			$("#container").append(mytxt0);
			//删除筛选条件
			$("#container div .off").each(function(){
				$(this).click(function(){
					$(this).parent().remove();
					$(A[str]).parent().show();
				})
			})
		})
	})(i);
}

//更多分类
$("#down").click(function(){
   $(this).hide();
   $("#up").show();
   $("#sort").slideToggle(1000);
});	
$("#up").click(function(){
    $(this).hide();
    $("#down").show();
	$("#sort").slideToggle(1000);
});	

//滚动到一定距离触发固定定位
$(window).scroll(function(){
	var scroHei=$(window).scrollTop();
	if (scroHei>=680) {
		$(".condition").css({"position":"fixed","top":"-20px","z-index":"3","left":"148px"});
	}else{
		$(".condition").css("position","static");
	}
})

//商品列表分页
//点击数字按钮
function bian(i){
	var bArr=document.getElementsByClassName("btn");
	for(var j=0;j<bArr.length;j++){
		if(i-1==j){
			bArr[j].className="btn btn1";
		}else{
			bArr[j].className="btn";
		}
	}
	var divArr=document.getElementsByClassName("pages");
	for(var j=0;j<divArr.length;j++){
		divArr[j].className="pages hide";
	}
	var pagDIV=document.getElementById("page"+i);
	pagDIV.className="pages page1";
}
//点击右侧按钮
var Pages = $('.pages');
var btns=$(".btn");
var pageIndex=Pages.length;
var pageIndex=0;
var str = 0;
$("#next").click(function(){
	$(btns).removeClass("btn btn1");
 	$( Pages[str]).css("display","none");
    str ++;
	$(Pages[str]).css("display","block");
	$(btns[str]).addClass("btn btn1");
	j=str;
 	pageIndex++;
 	if(pageIndex>=1){
 		$("#prev").css("display","block");
	}
 	if(pageIndex>=3){
 		$("#next").css("display","none");
	}
})
 //点击左侧按钮
$("#prev").click(function(){
	$(btns).removeClass("btn btn1");
 	$(Pages[str]).css("display","none");
	str --;
	$(Pages[str]).css("display","block");
	$(btns[str]).addClass("btn btn1");
	j=str;
 	pageIndex--;
 	if(pageIndex<=0){
 		$("#prev").css("display","none");
	}
 	if(pageIndex<3){
 		$("#next").css("display","block");
	}
})


