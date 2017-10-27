/**
 * 치환자를 대체문자열로 치환하는 함수;
 * @param  {Object} obj
 * @param  {String} str
 * @return {String}
 */
global.api.HTML.replace_keyword = function( obj, str )
{
    var s,r = str;

	for( s in obj ){
        r = r.replace( "<!=" + s + "=!>", obj[ s ] )
    }
    return r;
}
