/**
 * 화면에 데이터를 그려주는 함수 -- 전체데이터를 노출함.;
 * @param  {http.ClientRequest} req
 * @param  {http.ClientRequest} res
 * @param  {String} d response된 문자열
 * @param  {String} template html파일명
 */
global.api.HTML.render_all_data = function(req,res, d, template)
{
    var template_DIR = global.api.HTML.CONST.CONFIG.template_root;
    var html = global.REQUIRES.fs.readFileSync(  template_DIR + template +'.html','utf8');
    var r0 = global.api.HTML.include__html( html )
    if( r0 != 0 )
    {
        html = global.api.HTML.include__html__repalce_data( r0, html )
    }
    var data = global.api.HTML.replace_keyword( d, html )
    global.api.Response.res_200_ok_String( req, res, data );
}


