/**
 * <include></include> 치환자를 통해 html을 삽입하는 함수.
 * @param  {Object} o
 * @param  {String} str
 * @return {String} r
 */
global.api.HTML.include__html__repalce_data= function( o, str )
{
    var r;
    r = str
    var re;
    for(var s in o ){
        var template_DIR = global.api.HTML.CONST.CONFIG.include_html_root;
        var html = global.REQUIRES.fs.readFileSync( template_DIR + o[ s ],'utf8' );
        re = new RegExp(s,"g");

        r = r.replace( re , html)
    }

    return r;
}