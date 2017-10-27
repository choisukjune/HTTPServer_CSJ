/**
 * html문서의 치환자를 찾아 구조체로 만드는 함수
 * @param  {String} str
 * @return {Object} ???
 */
global.api.HTML.include__html = function( str )
{
    var r = str.match(/<include>(.*?)<\/include>/g);


	if(r == null ){
        return 0;
    }
    var i = 0,iLen = r.length;
    var o = {}
    for(; i< iLen;++i){
        o[ r[i] ] = r[i].replace(/<\/?include>/g,'');
    }
    return o;
}
