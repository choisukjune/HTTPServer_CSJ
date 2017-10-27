//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.message = {};

//-------------------------;
// FUNCTION;
//-------------------------;

var c = 0;

window.service.message.toaster = function( message ) {

	if( c == 0 ){
		var toaster_container = document.createElement("div");
		toaster_container.setAttribute("id", "toaster_container");
		window.document.body.append( toaster_container );
	}

	var div,text,target;
	div = document.createElement("div")
	div.setAttribute("id", "snackbar_" + c);
	div.setAttribute("class","snackbar");

	text = document.createTextNode( message )
	target = document.getElementById("toaster_container")

	div.appendChild( text )
	target.append( div )

	var x = document.getElementById("snackbar_" + c)
	x.classList.add("show");
	++c;
	setTimeout(function(){ x.className = x.className.replace("show", "");x.remove(); }, 3000);
}


