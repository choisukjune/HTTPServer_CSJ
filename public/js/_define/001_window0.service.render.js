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
window.service.render.make_div = function( text, attr ){
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
window.service.render.make_table = function( arr0, arr1 ){
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
window.service.render.a = function( text, href,attr ){
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
