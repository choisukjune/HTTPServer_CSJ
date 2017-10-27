/**
 * html태그를 치환하는 함수
 * @param  {String} s
 * @return {String}
 */
global.api.String.escapeHTML = function( s ) {
  return s.replace(/&/g, '&amp;')
		  .replace(/"/g, '&quot;')
		  .replace(/</g, '&lt;')
		  .replace(/>/g, '&gt;');
}
