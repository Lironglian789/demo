//验证码
function cal(){
	var a="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
	var A1=parseInt(Math.random()*(a.length-1));
	var A2=parseInt(Math.random()*(a.length-1));
	var A3=parseInt(Math.random()*(a.length-1));
	var A4=parseInt(Math.random()*(a.length-1));
	code.value=a.substr(A1,1)+a.substr(A2,1)+a.substr(A3,1)+a.substr(A4,1);
}

//手机号和密码提示
var reg01=/^13[123567890]{1}\d{8}|15[123567890]\d{8}|18[1234567890]\d{8}$/;
var reg02=/^[a-zA-Z0-9_-]{6,16}$/;
var BTN=document.getElementById("btn");
		BTN.onclick=function(){
			var right1=reg01.test(cell.value);
			var right2=reg02.test(pass.value);
			if(!right1 && !right2){
				document.getElementById("jg1").style.display="block";
				document.getElementById("jg2").style.display="block";
			}else if(!right1 && right2){
			   document.getElementById("jg1").style.display="block";
			   document.getElementById("jg2").style.display="none";
			}else if(right1 && !right2){
			   document.getElementById("jg1").style.display="none";
			   document.getElementById("jg2").style.display="block";
			}else if(right1 && right2){
			   document.getElementById("jg1").style.display="none";
			   document.getElementById("jg2").style.display="none";
			}
			//判断验证码
			if(!txt.value){
			   document.getElementById("jg3").style.display="block";	
			}
			if(txt.value && txt.value!==code.value){
			   document.getElementById("jg3").style.display="block";	
			}
			if(txt.value && txt.value==code.value){
			   document.getElementById("jg3").style.display="none";	
			}
			if(right1 && right2 && txt.value==code.value){
				alert("登录成功！")
				window.location.href= "index.html";
			}
		}




