//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.Request = {};

//-------------------------;
// FUNCTION;
//-------------------------;

window.service.Request.req_GET_data__Callback = function( url, _cbFunction ){

	var http = new XMLHttpRequest();

	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	//*/
	http.onloadend = function(){
		if(http.status == 200){
		//            console.log( "onloadend" )
		//            console.log( "request_ok! --- " + http.responseText )
		_cbFunction( http.responseText )
		}
		else
		{
			console.log('readyState=' + http.readyState + ', status: ' + http.status);
		}
	}
	/*/
	http.onreadystatechange = function(){
		if(http.readyState == 4 && http.status == 200){
			console.log( "request_ok! --- " + http.responseText )
			_cbFunction( http.responseText )
		}
		else
		{
			console.log('readyState=' + http.readyState + ', status: ' + http.status);
		}
	}
	//*/
	http.send();
}

window.service.Request.req_POST_data__Callback = function( url, data, _cbFunction ){

	var http = new XMLHttpRequest();
	var params = data;

	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	//*/
	http.onloadend = function(){
		if(http.status == 200){
			console.log( "onloadend" )
			console.log( "request_ok! --- " + http.responseText )
			_cbFunction( http.responseText )
		}
		else
		{
			console.log('readyState=' + http.readyState + ', status: ' + http.status);
		}
	}
	/*/
	http.onreadystatechange = function(){
		if(http.readyState == 4 && http.status == 200){
			console.log( "request_ok! --- " + http.responseText )
			_cbFunction( http.responseText )
		}
		else
		{
			console.log('readyState=' + http.readyState + ', status: ' + http.status);
		}
	}
	//*/
	http.send(params);
}