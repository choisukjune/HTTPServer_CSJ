/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} d   [description]
 * @return {[type]}     [description]
 */
global.ROUTER.api.File.common.download_file_stream = function( req, res, d ){

	var	_q = global.REQUIRES.querystring.parse(	global.REQUIRES.url.parse( decodeURIComponent(	req.url ) ).query );
	
	global.CSJLog.timeStamp( JSON.stringify( _q ) );

	global.api.Session.session_check(req, res, _q.sid, function( d ){
console.log( _q )
			if( d ){
				var	filestream = global.REQUIRES.fs.createReadStream( _q.filePath );

				filestream.on('finish', function(){ console.log( "---------- finish ----------" ) });
				filestream.on('end', function(){
					//console.log( "---------- end ----------" );
					res.end();
					console.log("end")
				});
				filestream.on('close',	function(){	console.log( "---------- close ----------" ); });
			
				var extension = _q.fileExtend;
				var CONTENTTYPES = {
					'aac': 'audio/aac',
					'ai': 'application/postscript',
					'appcache': 'text/cache-manifest',
					'avi': 'video/avi',
					'bin': 'application/octet-stream',
					'bmp': 'image/bmp',
					'coffee': 'text/coffeescript',
					'css': 'text/css',
					'csv': 'text/csv',
					'doc': 'application/msword',
					'docx': 'application/msword',
					'dtd': 'application/xml-dtd',
					'eps': 'application/postscript',
					'exe': 'application/octet-stream',
					'flac': 'audio/x-flac',
					'geojson': 'application/json',
					'gif': 'image/gif',
					'gzip': 'application/x-gzip',
					'htm': 'text/html',
					'html': 'text/html',
					'ico': 'image/x-icon',
					'ics': 'text/calendar',
					'ifb': 'text/calendar',
					'jpe': 'image/jpeg',
					'jpeg': 'image/jpeg',
					'jpg': 'image/jpeg',
					'js': 'text/javascript',
					'json': 'application/json',
					'jsx': 'text/jsx',
					'less': 'text/css',
					'm4a': 'audio/mp4a-latm',
					'm4v': 'video/x-m4v',
					'manifest': 'text/cache-manifest',
					'md': 'text/x-markdown',
					'mid': 'audio/midi',
					'midi': 'audio/midi',
					'mov': 'video/quicktime',
					'mp3': 'audio/mpeg',
					'mp4': 'video/mp4',
					'mpe': 'video/mpeg',
					'mpeg': 'video/mpeg',
					'mpg': 'video/mpeg',
					'mpga': 'audio/mpeg',
					'mtl': 'text/plain',
					'mv4': 'video/mv4',
					'obj': 'text/plain',
					'ogg': 'application/ogg',
					'ogv': 'video/ogg',
					'package': 'text/plain',
					'pdf': 'application/pdf',
					'png': 'image/png',
					'ppt': 'application/vnd.ms-powerpoint',
					'pptx': 'application/vnd.ms-powerpoint',
					'ps': 'application/postscript',
					'rar': 'application/x-rar-compressed',
					'rtf': 'text/rtf',
					'sass': 'text/css',
					'scss': 'text/css',
					'sh': 'application/x-sh',
					'stl': 'application/sla',
					'svg': 'image/svg+xml',
					'swf': 'application/x-shockwave-flash',
					'tar': 'application/x-tar',
					'tif': 'image/tiff',
					'tiff': 'image/tiff',
					'txt': 'text/plain',
					'wav': 'audio/x-wav',
					'webm': 'video/webm',
					'webp': 'image/webp',
					'woff': 'application/font-woff',
					'woff2': 'application/font-woff2',
					'xht': 'application/xhtml+xml',
					'xhtml': 'application/xhtml+xml',
					'xls': 'application/vnd.ms-excel',
					'xlsx': 'application/vnd.ms-excel',
					'xml': 'application/xml',
					'xpm': 'image/x-xpixmap',
					'xsl': 'application/xml',
					'xslt': 'application/xslt+xml',
					'zip': 'application/zip'
				};
				console.log( _q.fileNm )
				console.log( typeof( _q.fileNm ))
				res.writeHeader(200, {
					"Content-Type":	CONTENTTYPES[ extension ]
					, "Content-disposition" : "attachment; filename=" + "aaaa.jpg"
				});
			  
				filestream.pipe(res);
			}
			
	})
	
}
