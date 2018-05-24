/**
 * 화면에 데이터를 그려주는	함수 --	 요청쿼리기반 작동;
 * @param  {http.ClientRequest}	req
 * @param  {http.ClientRequest}	res
 * @param  {String}	d 요청쿼리
 * @param  {String}	template html파일명
 */
global.api.HTML.render_html	= function( req, res, chunks )
{
	var	tpl_nm;
	var	_d = global.REQUIRES.url.parse( decodeURIComponent( req.url ) ).pathname;;

	var	_q = {};
	//var data = global.REQUIRES.querystring.parse(	decodeURIComponent(	chunks ).replace(/^.*\?/, '') )
	var data = chunks;

	if(	"/"	!= _d )
	{
		tpl_nm = global.REQUIRES.url.parse(req.url).pathname.replace( "/", "" );
		//console.log(global.api.HTML.CONST.CONFIG.template_root	+ tpl_nm +'.html')
	}
	else
	{
		tpl_nm = "/Common/index";
	}

	var	html = global.REQUIRES.fs.readFileSync(	 global.api.HTML.CONST.CONFIG.template_root	+ tpl_nm +'.html','utf8');

	_q.data = data;
	_q.loadScript =	tpl_nm + ".js";

	//global.CSJLog.timeStamp(  "query / " + JSON.stringify( _q )	);

	var	r0 = global.api.HTML.include__html(	html )

	if(	r0 != 0	)
	{
		html = global.api.HTML.include__html__repalce_data(	r0,	html )
	}
	//global.api.Response.res_200_ok_String( req,	res, global.api.HTML.replace_keyword( _q, html ) );

	global.api.Response.res_200_ok_String( req,	res, global.api.HTML.replace_keyword( _q, html ) );
}
