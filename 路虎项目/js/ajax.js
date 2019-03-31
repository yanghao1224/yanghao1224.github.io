function ajax(methods,url,async,fn){
	var xmlhttp=new XMLHttpRequest()
	xmlhttp.open(methods,url,async)
	xmlhttp.send()
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				fn(xmlhttp.responseText)
			}
		}
	}
}