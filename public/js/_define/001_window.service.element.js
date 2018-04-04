//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.element = {};

//-------------------------;
// FUNCTION;
//-------------------------;

/**
*
*/
window.service.element.removeChild_all = function( el ){
  if( el.firstChild ) while( el.firstChild ) el.removeChild( el.firstChild );
}

/**
 * [write_doc description]
 * @type {[type]}
 */
window.service.element.match_el = function( e, str, p0){
  if( e.getAttribute("id") == str ) return e
  else if( e.getAttribute("id") == p0 ) return "";
  else return window.service.element.match_el( e.parentElement, str, p0 )
}
