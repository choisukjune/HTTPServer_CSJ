/**
* 
*/
global.api.File.getDownloadFilename = function(req, filename){
	var header = req.headers['user-agent'];

	if (header.includes("MSIE") || header.includes("Trident")) { 
		return encodeURIComponent(filename).replace(/\\+/gi, "%20");
	} else if (header.includes("Chrome")) {
		return global.REQUIRES.iconv.decode(global.REQUIRES.iconv.encode(filename, "UTF-8"), 'ISO-8859-1');
	} else if (header.includes("Opera")) {
		return global.REQUIRES.iconv.decode(global.REQUIRES.iconv.encode(filename, "UTF-8"), 'ISO-8859-1');
	} else if (header.includes("Firefox")) {
		return global.REQUIRES.iconv.decode(global.REQUIRES.iconv.encode(filename, "UTF-8"), 'ISO-8859-1');
	}

	return filename;
}