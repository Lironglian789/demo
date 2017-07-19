var reg01=/^13[123567890]{1}\d{8}|15[123567890]\d{8}|18[1234567890]\d{8}$/;
var reg02=/^[\u4e00-\u9fa5]{4,12}$/;
var reg03=/^[a-zA-Z0-9]{6,16}$/;
var reg04=/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;

//手机号提示
var mycell=document.getElementById("cell");
mycell.onfocus=function(){
	if(cell.value==""){
		document.getElementById("cell2").style.display="block";
	}
	if(cell.value && right1){
		document.getElementById("cell1").style.display="block";
		document.getElementById("cell2").style.display="none";
	}
}
mycell.onblur=function(){
	if(cell.value==""){
		document.getElementById("cell1").style.display="none";
		document.getElementById("cell2").style.display="none";
	}
	var right1=reg01.test(cell.value);
	if(cell.value && !right1){
		document.getElementById("cell2").style.display="block";
	}
	if(cell.value && right1){
		document.getElementById("cell1").style.display="block";
		document.getElementById("cell2").style.display="none";
	}
}

//昵称提示
var myname=document.getElementById("name");
myname.onfocus=function(){
	var Oname=document.getElementById("name");
	if(Oname.value==""){
		document.getElementById("name2").style.display="block";
	}
	if(Oname.value && right2){
		document.getElementById("name1").style.display="block";
		document.getElementById("name2").style.display="none";
	}
}
myname.onblur=function(){
	var Oname=document.getElementById("name");
	if(Oname.value==""){
		document.getElementById("name1").style.display="none";
		document.getElementById("name2").style.display="none";
	}
	var right2=reg02.test(Oname.value);
	if(Oname.value && !right2){
		document.getElementById("name2").style.display="block";
	}
	if(Oname.value && right2){
		document.getElementById("name1").style.display="block";
		document.getElementById("name2").style.display="none";
	}
}

//密码提示
var mypass=document.getElementById("pass");
mypass.onfocus=function(){
	if(pass.value==""){
		document.getElementById("pass2").style.display="block";
	}
	if(pass.value && right3){
		document.getElementById("pass1").style.display="block";
		document.getElementById("pass2").style.display="none";
	}
}
mypass.onblur=function(){
	if(pass.value==""){
		document.getElementById("pass1").style.display="none";
		document.getElementById("pass2").style.display="none";
	}
	var right3=reg03.test(pass.value);
	if(pass.value && !right3){
		document.getElementById("pass2").style.display="block";
	}
	if(pass.value && right3){
		document.getElementById("pass1").style.display="block";
		document.getElementById("pass2").style.display="none";
	}
}

//确认密码提示
var mycheck=document.getElementById("check");
mycheck.onfocus=function(){
	document.getElementById("check1").style.display="none";
	document.getElementById("check2").style.display="none";
}
mycheck.onblur=function(){
	if(!check.value){
	   document.getElementById("check1").style.display="none";
	   document.getElementById("check2").style.display="none";	
	}
	if(check.value && check.value!==pass.value){
	   document.getElementById("check1").style.display="none";	
	   document.getElementById("check2").style.display="block";	
	}
	if(check.value && check.value==pass.value){
	   document.getElementById("check1").style.display="block";	
	   document.getElementById("check2").style.display="none";	
	}
}

//邮箱提示
var mymail=document.getElementById("mail");
mymail.onfocus=function(){
	if(mail.value==""){
		document.getElementById("mail2").style.display="block";
	}
	if(mail.value && right4){
		document.getElementById("mail1").style.display="block";
		document.getElementById("mail2").style.display="none";
	}
}
mymail.onblur=function(){
	if(mail.value==""){
		document.getElementById("mail1").style.display="none";
		document.getElementById("mail2").style.display="none";
	}
	var right4=reg04.test(mail.value);
	if(mail.value && !right4){
		document.getElementById("mail2").style.display="block";
	}
	if(mail.value && right4){
		document.getElementById("mail1").style.display="block";
		document.getElementById("mail2").style.display="none";
	}
}

//蜜芽条款提示
$("#cancel").click(function(){
	if(this.checked==false){
		$("#reading").css("display","block");
	}else{
		$("#reading").css("display","none");
	}
})

//注册提示
var Regist=document.getElementById("regist");
Regist.onclick=function(){
	if(!cell.value && !name.value && !pass.value && !mail.value){
		document.getElementById("cell3").style.display="block";
		document.getElementById("name3").style.display="block";
		document.getElementById("pass3").style.display="block";
		document.getElementById("mail3").style.display="block";
		
	}
    var right1=reg01.test(cell.value);
    var Oname=document.getElementById("name");
    var right2=reg02.test(Oname.value);
    var right3=reg03.test(pass.value);
    var right4=reg04.test(mail.value);
	if(right1 && right2 && right3 && check.value==pass.value &&right4 ){
		document.getElementById("cell3").style.display="none";
		document.getElementById("name3").style.display="none";
		document.getElementById("pass3").style.display="none";
		document.getElementById("mail3").style.display="none";
		alert("注册成功！")
		window.location.href= "login.html";
	}
}
