$.ajax({
	type:"get",
	url:"daohang.json",
	async:true,
	success: function(res) {
        fn(res) 
    }
});

function fn(data){
	var arr=data.daohang;
//	console.log(arr)
	var st=''
	var sd=""
	st+="<div class='logo fl'>"
		st+="<img src="+arr.logo+"/>"
	st+="</div>"
	st+="<div class='zuo fl'>"
		st+="<ul class='list'>"
			for (var i=0;i<arr.fl.length;i++) {
				st+="<li class='fl'>"
					st+=arr.fl[i].title
				st+="</li>"
			}
		st+="</ul>"
	st+="</div>"
	
	for (var i=0;i<arr.xiala.length;i++) {
		sd+="<div class='dh-ni'>"
			for (var j=0;j<arr.xiala[i].list.length;j++) {
				sd+="<div class='dhxl-list'>"
					sd+="<h2>"
						sd+=arr.xiala[i].list[j].tit
					sd+="</h2>"
					sd+="<ul>"
						for (var k=0;k<arr.xiala[i].list[j].li.length;k++) {
							sd+="<li>"
								sd+=arr.xiala[i].list[j].li[k]
							sd+="</li>"
						}
					sd+="</ul>"
				sd+="</div>"
			}
		sd+="</div>"
	}
	
	document.getElementById("daohang").innerHTML+=st
	document.getElementById("xiala").innerHTML+=sd
	$(".list>li").click(function(){
		
		var ind=$(this).index()
		if(ind<=1){
			$(this).css({"background":"white"}).siblings('li').css({"background":"white"}).parents(".zuo").siblings("#xiala").slideUp(150)
		}else{
			var aa=$(this).css({"background":"hsla(180,7%,92%,.6)"}).siblings("li").css({"background":"white"}).parents(".zuo").siblings("#xiala").slideDown(150).children(".dh-ni").eq(ind).show().siblings(".dh-ni").hide()
//			console.log(aa)
			$("#fugai").show()
		}
		$(".list>li").dblclick(function(event){
			event.preventDefault?event.preventDefault():event.returnValue=false;
			event.stopPropagation?event.stopPropagation():event.cancelBubble=true;

			$(this).css({"background":"white"}).siblings('li').css({"background":"white"}).parents(".zuo").siblings("#xiala").slideUp(150)
			$("#fugai").hide()
		})
		
		
	}) 	
//	console.log(aa)
	
//=======轮播
//		#lubbo的高度是整个屏幕的高度
	
	
	var lbarr=data.lunbo;
	console.log(lbarr)
	var lbst=""
	lbst+="<div class='lbdiv'>"
		for (var i=0;i<lbarr.length;i++) {
			lbst+="<div class='lbimg'>"
				lbst+="<div class='cont'>"
					lbst+="<h1>"
						lbst+=lbarr[i].h1;
					lbst+="</h1>"
					lbst+="<p>"
						lbst+=lbarr[i].p
					lbst+="</p>"
					lbst+="<div class='liaojie'>"
						lbst+=lbarr[i].liaojie
					lbst+="</div>"
					lbst+="<div class='money'>"
						lbst+="<span>"
							lbst+=lbarr[i].money
						lbst+="</span>"
					lbst+="</div>"
				lbst+="</div>"
			lbst+="</div>"
		}
	lbst+="</div>"
	document.getElementById("lunbo").innerHTML+=lbst
	for (var i=0;i<lbarr.length;i++) {
		var asd=$("#lunbo .lbimg").eq(i).css({
			"background-image":"url("+lbarr[i].src+")"
		})
	}
	$(".lbimg").eq(0).show()
	var t=null;
	var num=0;
	//自动轮播
	t=setInterval(function(){
		num++;
		if(num>2){num=0}
		$(".lbimg").eq(num).fadeIn(500,function(){
			$(this).children(".cont").fadeIn(400,"linear").parent(".lbimg").siblings(".lbimg").children(".cont").hide()
		}).siblings(".lbimg").fadeOut(600,"linear").parent().siblings(".jiaodian").children("span").eq(num).css({
			fontSize: 40+"px",
			opacity: 1
		}).siblings("span").css({
			fontSize:24+"px",
			opacity: .6
		})
		
	},4000)
	
	var wid=$(window).width()//窗口的宽度
	//让这个#lunbo的高是窗口的高
	var lunboh=$(window).height()
	var lunbow=$(window).width()
//	console.log(lunbow)
	$("#lunbo").height(lunboh-72+"px")
	$(".lbimg").width(lunbow+"px")
	$(".autoimg").height(lunboh+"px")
	$(window).resize(function(){  //改变窗口大小执行的函数
		var lunboh=$(window).height()
		var lunbow=$(window).width()
//		console.log(lunboh)
		$("#lunbo").height(lunboh-72+"px")
		$(".lbimg").width(lunbow+"px")
		$(".autoimg").height(lunboh+"px")
		//鼠标图片
		var wid=$(window).width()
		$("#lunbo").mousemove(function(e){
			var x=e.clientX;
			if(x<wid/2){
				$(this).css({"cursor":"url(imgs/jiantou.jpg),auto"})
			}else{
				$(this).css({"cursor":"url(imgs/jiantouyou.jpg),auto"})
			}
			
		})
	})
	
	//鼠标在  lunbo上的图片
	$("#lunbo").mousemove(function(e){
		var x=e.clientX;
		var lbwid=$("#lunbo .lbimg").width()
//		var lblf=$(".lbdiv").offset().left
		if(x<wid/2){
			$(this).css({"cursor":"url(imgs/jiantou.jpg),auto"})
		}else{
			$(this).css({"cursor":"url(imgs/jiantouyou.jpg),auto"})
		}
		
	})
	//左右点击
	function dian(){
		$("#lunbo").on("click",function(e){
			var x=e.clientX;
			if(x<wid/2){
				num--;
				if(num<0){num=2}
				$(".lbimg").eq(num).fadeIn(500,function(){
					$(this).children(".cont").fadeIn(400,"linear").parent(".lbimg").siblings(".lbimg").children(".cont").hide()
				}).siblings(".lbimg").fadeOut(600,"linear").parent().siblings(".jiaodian").children("span").eq(num).css({
					fontSize: 40+"px",
					opacity: 1
				}).siblings("span").css({
					fontSize:24+"px",
					opacity: .6
				})
			}else{
				num++;
				if(num>2){num=0}
				$(".lbimg").eq(num).fadeIn(500,function(){
					$(this).children(".cont").fadeIn(400,"linear").parent(".lbimg").siblings(".lbimg").children(".cont").hide()
				}).siblings(".lbimg").fadeOut(600,"linear").parent().siblings(".jiaodian").children("span").eq(num).css({
					fontSize: 40+"px",
					opacity: 1
				}).siblings("span").css({
					fontSize:24+"px",
					opacity: .6
				})
			}
			
		})
	}
	dian()
	//三个焦点
	$(".jiaodian").hover(function(){
		$("#lunbo").off("click")
		$(".jiaodian>span").click(function(){
			var ind=$(this).index()
			$(this).css({
				fontSize: 40+"px",
				opacity: 1
			}).siblings("span").css({
				fontSize:24+"px",
				opacity: .6
			}).parent().siblings(".lbdiv").children(".lbimg").eq(ind).fadeIn(500,function(){
				$(this).children(".cont").fadeIn(400,"linear").parent(".lbimg").siblings(".lbimg").children(".cont").hide()
			}).siblings(".lbimg").fadeOut(600,"linear").parent()
			num=ind
		})
	},function(){
		dian()
	})
	
//定制
	var dzarr=data.dingzhi
	var dzst=""
	dzst+="<ul>"
		$.each(dzarr, function(index,value) {
			dzst+="<li>"
				dzst+="<span><img src='"+value.img+"'/></span>"
				dzst+="<h2>"+value.h2+"</h2>"
				dzst+="<p>"+value.p+"</p>"
			dzst+="</li>"
		});
	dzst+="</ul>"
	$("#dingzhi").html(dzst)
	
//介绍
	var jsarr=data.jieshao
	var jsst=""
	$.each(jsarr, function(ind,value) {
		jsst+="<div class='el'>"
			jsst+="<h3>"+value.h3+"</h3>"
			jsst+="<p>"+value.p+"</p>"
		jsst+="</div>"
	});
	$("#you").html(jsst)

//新能源
	var nyarr=data.nengyuan
	var nyst=""
	nyst+="<div class='nei clearfix'>"
	$.each(nyarr, function(ind,value) {
		nyst+="<div class='el'>"
			nyst+="<div>"
				nyst+="<img src='"+value.img+"'/>"
				nyst+="<h2>"+value.h2+"</h2>"
				nyst+="<p>"+value.p+"</p>"
			nyst+="</div>"
		nyst+="</div>"
	});
	nyst+="</div>"
	$("#guanyu").html(nyst)


//车型
	var cxarr=data.chexing;
	var cxst=""
	$.each(cxarr, function(ind,value) {
		cxst+="<div class='el'>"
			cxst+="<div>"
				cxst+="<img src='"+value.img+"'/>"
			cxst+="</div>"
			cxst+="<div>"
				cxst+="<h2>"+value.h3+"</h2>"
				cxst+="<p class='money'>"+value.money+"</p>"
				cxst+="<p class='cont'>"+value.cont+"</p>"
				cxst+="<div class='span'>"
					cxst+="<span>"+value.liaojie+"</span>  "
					
					cxst+="<span>"+value.dazao+"</span>"
				cxst+="</div>"
			cxst+="</div>"
		cxst+="</div>"
	});
	$("#cx").html(cxst)
	
//底部	
	var dbarr=data.jiewei
	var dbst=""
	for (var i=0;i<dbarr.length;i++) {
		dbst+="<div class='el'>"
			for (var j=0;j<dbarr[i].length;j++) {
				dbst+="<h2>"+dbarr[i][j].h2+"</h2>"
				dbst+="<ul>"
					for (var k=0;k<dbarr[i][j].li.length;k++) {
						dbst+="<li>"+dbarr[i][j].li[k]+"</li>"
					}
				dbst+="</ul>"
			}
		dbst+="</div>"
	}
	document.getElementById("dibu").innerHTML+=dbst
	
	
	
}
