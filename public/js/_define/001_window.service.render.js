//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.render = {};


//-------------------------;
// FUNCTION;
//-------------------------;

/**
*
*/
window.service.render.divider = function(){
	var div = document.createElement("div");
	div.setAttribute("class", "ui section divider");
	return div
}

/**
*
*/
window.service.render.h = function( text, tagOption, attr ){

	if( tagOption == null ){
		var h = document.createElement( "h4");
	}else{
		var h = document.createElement( "h" + tagOption );
	}
    if( attr != null ){
        var i = 0,iLen = attr.length,io
        for(;i<iLen;++i){
            h.setAttribute( attr[ i ][ 0 ], attr[ i ][ 1 ]);
        }
    }

	h.appendChild(document.createTextNode( text ))
	return h
}

/**
*
*/
window.service.render.div = function( text, attr ){
	var div = document.createElement("div");
	if( attr != null ){
        var i = 0,iLen = attr.length,io
        for(;i<iLen;++i){
            div.setAttribute( attr[ i ][ 0 ], attr[ i ][ 1 ]);
        }
	}
	div.appendChild(document.createTextNode( text ))
	return div
}

/**
*
*/
window.service.render.table = function( arr0, arr1 ){
	var table = document.createElement("table");
	table.setAttribute("class", "ui compact celled small stackable table");
	table.setAttribute("style", "border-radius : 0 !important;");
    if( arr0 != null ){
        var thead = document.createElement("thead");
    	var tr = document.createElement("tr");
    	for(var i = 0;i < arr0.length;++i){
    		var th = document.createElement("th");
    		th.appendChild(document.createTextNode( arr0[i] ))
    		tr.appendChild( th )
    	}
    	thead.appendChild(tr);
        table.appendChild(thead)
    }
	var tbody = document.createElement("tbody");
	for(var i = 0;i < arr1.length;++i){
		var tr = document.createElement("tr");
			for( var s in arr1[ i ] ){

				var td = document.createElement("td");

				if( arr1[ i ][ s ][ 0 ] == "{" ){
					console.log( arr1[ i ][ s ] )
					var text = document.createTextNode( JSON.stringify( JSON.parse( arr1[ i ][ s ] ), null, 4 ) )
					var pre = document.createElement("pre");

					pre.appendChild( text )
					td.appendChild(pre);
					tr.appendChild(td);
				}else{

					var text = document.createTextNode( arr1[ i ][ s ] )
					td.appendChild( text )
					tr.appendChild(td);
				}

		}
		tbody.appendChild(tr);
	}

	table.appendChild(tbody)

	return table;
}

/**
*
*/
window.service.render.table_String = function( arr0, data ){
	var table = document.createElement("table");
	table.setAttribute("class", "ui compact celled small stackable table");
	table.setAttribute("style", "border-radius : 0 !important;");
    if( arr0 != null ){
        var thead = document.createElement("thead");
    	var tr = document.createElement("tr");
    	for(var i = 0;i < arr0.length;++i){
    		var th = document.createElement("th");
    		th.appendChild(document.createTextNode( arr0[i] ))
    		tr.appendChild( th )
    	}
    	thead.appendChild(tr);
        table.appendChild(thead)
    }
    var tbody = document.createElement("tbody");

	var tr = document.createElement("tr");
	var td = document.createElement("td");

	var text = document.createTextNode( data )
	var pre = document.createElement("pre");
    pre.setAttribute("style", "white-space: pre-wrap;")
	pre.appendChild( text )
	td.appendChild(pre);
	tr.appendChild(td);

	tbody.appendChild(tr);
	table.appendChild(tbody)
	return table;
}

window.service.render.table_Object = function( arr0, data ){
	var table = document.createElement("table");
	table.setAttribute("class", "ui compact celled small stackable table");
	table.setAttribute("style", "border-radius : 0 !important;");
    if( arr0 != null ){
        var thead = document.createElement("thead");
    	var tr = document.createElement("tr");
    	for(var i = 0;i < arr0.length;++i){
    		var th = document.createElement("th");
    		th.appendChild(document.createTextNode( arr0[i] ))
    		tr.appendChild( th )
    	}
    	thead.appendChild(tr);
        table.appendChild(thead)
    }
	var tbody = document.createElement("tbody");

	var tr = document.createElement("tr");
	var td = document.createElement("td");
	var __temp = data;

	var __temp = JSON.stringify( JSON.parse( data ), null, 4 )
	var text = document.createTextNode( __temp )
	var pre = document.createElement("pre");

	pre.appendChild( text )
	td.appendChild(pre);
	tr.appendChild(td);

	tbody.appendChild(tr);
	table.appendChild(tbody)
	return table;
}

/**
*
*/
window.service.render.a = function( text, href, attr ){
	var a = document.createElement("a");
    a.setAttribute("href", href);
	if( attr != null ){
        var i = 0,iLen = attr.length,io
        for(;i<iLen;++i){
            a.setAttribute( attr[ i ][ 0 ], attr[ i ][ 1 ]);
        }
	}
	a.appendChild(document.createTextNode( text ))
	return a
}

/**
*
*/
window.service.render.span = function( text, attr ){
	var span = document.createElement("span");
	if( attr != null ){
        var i = 0,iLen = attr.length,io
        for(;i<iLen;++i){
            span.setAttribute( attr[ i ][ 0 ], attr[ i ][ 1 ]);
        }
	}
	span.appendChild(document.createTextNode( text ))
	return span
}

/**
*
*/
window.service.render.li = function( text, attr ){
	var li = document.createElement("li");
	if( attr != null ){
        for(;i<iLen;++i){
            li.setAttribute( attr[ i ][ 0 ], attr[ i ][ 1 ]);
        }
	}
	li.appendChild(document.createTextNode( text ))
	return li
};

/**
*
*/
window.service.render.dimmer  = function( txt ){
	var div0 = document.createElement("div");
	div0.setAttribute("class", "ui dimmer");
	div0.setAttribute("style", "display: flex !important;");

	var div1 = document.createElement("div");
	div1.setAttribute("class","content")

	var div2 = document.createElement("div");
	div2.setAttribute("class","center")

	var h = document.createElement("h1");
	h.setAttribute("class", "ui inverted icon");
	h.setAttribute("id", "msg_m");

	var i = document.createElement("i");
	i.setAttribute("class", "heart outline big icon");


	var div3 = document.createElement("div");
	div3.setAttribute("class", "sub header");
	div3.setAttribute("id", "msg_s");

	//var _txt0 = document.createTextNode( "LESS BUT BETTER." );
	var _txt1 = document.createTextNode( "Hello! " + txt );

	var body = document.getElementsByTagName("body")[ 0 ];

	div3.appendChild( _txt1 );
	h.appendChild( i );
	div2.appendChild( h );
	div2.appendChild( div3 );
	div1.appendChild( div2 );
	div0.appendChild( div1 );
	body.appendChild( div0 )

	return $('.dimmer').dimmer('show');
}

/**
*
*/
window.service.render.detect_scrollHeight = function( d ){
	return d.scrollHeight
};