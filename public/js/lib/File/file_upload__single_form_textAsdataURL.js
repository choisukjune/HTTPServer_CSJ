//--------------------------------------------------;
// FILE_UPLOAD;
//--------------------------------------------------;
var fileDataInfo = {};
(function(){

//-------------------------;
// VARIABLE;
//-------------------------;


//-------------------------;
// PACKAGE;
//-------------------------;

//window.service.file_upload = {};
window.service.file_upload.file_upload__single_form_textAsdataURL = {};
//-------------------------;
// FUNCTION;
//-------------------------;

window.service.file_upload.req_POST_data__Callback = function( url, data, _cbFunction ){

    var http = new XMLHttpRequest();
    var params = data;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            var r = JSON.parse( http.responseText )
            console.log( "request_ok! --- " + http.responseText )
            _cbFunction( r )
        }
        else
        {
         console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
    }
    http.send(params);
}

window.service.file_upload.file_upload__single_form_textAsdataURL.uloadFile = function( d, _storage_key ){

    var url = "/api/File/common/file_upload__single_textAsdataURL?fileNm="
        + fileDataInfo.data.name + "&totalBytes=" + fileDataInfo.data.size + "&_storage_key=" + fileDataInfo._storage_key
        + "&file_id=" + fileDataInfo.id
        console.log( url )
    window.service.file_upload.req_POST_data__Callback(url,d,function( r ){

            fileDataInfo._storage_key = r._storage_key

            console.log("end")
            console.log( fileDataInfo )
            window.service.file_upload.file_upload__single_form_textAsdataURL.initailize();
            window.service.file_upload.file_upload__single_form_textAsdataURL.write_OK_check( r.fileNm )
    })

};

window.service.file_upload.file_upload__single_form_textAsdataURL.initailize = function(){
    document.getElementById("file_upload_input").value = "";
    fileDataInfo = {};
}

window.service.file_upload.file_upload__single_form_textAsdataURL.parseFile  = function(){
    if( !fileDataInfo.data ){ console.log("File not exist"); return;}

    fileDataInfo._storage_key = fileDataInfo._storage_key || "";

    var reader = new FileReader();
        reader.addEventListener( "abort", function( e ){ console.log( "---------- abort ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "error", function( e ){ console.log( "---------- error ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "load", function( e ){ console.log( "---------- load ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "loadend", function( e ){ console.log( "---------- loadend ----------" ); console.log( e );
            // window.file_sigle_upload.result = reader.result;
            var data = reader.result;

			var dataType = data.substring( 0, data.indexOf( "base64," ) + 7 );
			var dataURL = data.replace( dataType, '' );
	console.log( dataURL )
            window.service.file_upload.file_upload__single_form_textAsdataURL.uloadFile( data, fileDataInfo._storage_key );
            //uloadFile( dataURL, file.name, file.size )
        }, false, 0, true );
        reader.addEventListener( "loadstart", function( e ){ console.log( "---------- loadstart ----------" ); console.log( e ); }, false, 0, true );
        reader.addEventListener( "progress", function( e ){ console.log( "---------- progress ----------" ); console.log( e ); }, false, 0, true );

        reader.readAsDataURL( fileDataInfo.data );

}

window.service.file_upload.file_upload__single_form_textAsdataURL.write_OK_check = function( d ){
    //var li_val = document.getElementById( d ).innerText;
    return document.getElementById( d + "_prg" ).textContent = " -- complete!";
}

window.service.file_upload.file_upload__single_form_textAsdataURL.infoAdd = function( file, dataURL ){
    var output = document.getElementById('upload_files');
    var div = document.createElement("div");
    div.setAttribute("class", "item")
    var text = document.createTextNode( file.name );
    // var text_prg = document.createTextNode( " - 0%" );
    var span = document.createElement("span");
    //li__img.setAttribute("id", file.name)
    span.setAttribute( "id", file.name+"_prg" );
    div.setAttribute( "id", file.name );

    div.appendChild( text );
    div.appendChild( span );
    // li.appendChild( li__img );
    output.appendChild( div );
    // var imgByClassName = document.getElementById( file.name );
    // imgByClassName.src = dataURL;
}

window.service.file_upload.file_upload__single_form_textAsdataURL.openFile = function(event) {
    var input = event.target;
    // console.log( input.files[ 0 ] )

    // var i = 0,iLen = input.files.length;
    // for(; i < iLen; i++){
        //var file =  input.files[i];
        var file =  input.files[ 0 ];

        window.service.file_upload.file_upload__single_form_textAsdataURL.infoAdd( file );

        fileDataInfo.data = file;
        fileDataInfo.offset_count = 0
        fileDataInfo.dateTime = Date.now()
        fileDataInfo.id = file.name + "_" + fileDataInfo.dateTime
    // }
};

window.service.file_upload.file_upload__single_form_textAsdataURL.popFileSelector = function() {
    var el = document.getElementById("file_upload_input");
    if(el) el.click();
};

//-------------------------;
// EVENT;
//-------------------------;

document.getElementById("file_upload_input").addEventListener("change",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.openFile(event); })
document.getElementById("upload").addEventListener("click",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.parseFile(); })
document.getElementById("select_file_button").addEventListener("click",function(){ window.service.file_upload.file_upload__single_form_textAsdataURL.popFileSelector() })

})()
