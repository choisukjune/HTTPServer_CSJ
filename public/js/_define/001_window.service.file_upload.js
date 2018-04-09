//--------------------------------------------------;
// file_upload;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.file_upload = {};

//-------------------------;
// FUNCTION;
//-------------------------;

//-------------------------;
// VARIABLE;
//-------------------------;
var _store = {};

//-------------------------;
// PACKAGE;
//-------------------------;

//window.service.file_upload = {};
window.service.file_upload.file_upload__single_readAsArrayBuffer = function(){

    var file_upload_input;
    var upload_end_cbFuntion;

    //-------------------------;
    // FUNCTION;
    //-------------------------;

    var _this = this;
    _this.uloadFile = function( params, key ){

        if( !key )
        {
            console.log( "window.b2link.fileReader.single__ArrayBuffer Warning : key가 있어야 한다." );
            return;
        }

        if( !_store[ key ] )
        {
            console.log( "window.b2link.fileReader.single__ArrayBuffer Warning : key 값이 잘못 됨" );
            return;
        }

        var url = "/api/File/common/file_upload__single_readAsArrayBuffer?fileNm=" + _store[ key ].file.name
            + "&totalBytes=" + _store[ key ].file.size
            + "&offset=" + _store[ key ].offset_count
            + "&total_offset=" + _store[ key ].total_offset
            + "&_storage_key=" + _store[ key ]._storage_key
            + "&file_id=" + _store[ key ].id;

        //Target Object;
        var to = _store[ key ];

        window.service.Request.req_POST_data__Callback( url, params, function( r ){

            ++_store[ key ].offset_count;

            var data = JSON.parse( r )
            _store[ key ]._storage_key = data._storage_key

            if( data.isEnd == 1 ){
                console.log("end")
                _this.initailize();
                _this.write_OK_check( data.id )
                upload_end_cbFuntion( data );
                return;
            }

            setTimeout(function(){ _this.parseFile( key ); },100 );

        })

    };

    var blob;
    var reader;
    _this.parseFile  = function( key ){
        if( !key )
        {
            console.log( "window.b2link.fileReader.single__ArrayBuffer Warning : key가 있어야 한다." );
            return;
        }

        if( !_store[ key ] )
        {
            console.log( "window.b2link.fileReader.single__ArrayBuffer Warning : key 값이 잘못 됨" );
            return;
        }

        //Target Object;
        var to = _store[ key ];

        if( !to.file )
        {
            console.log( "File not exist" );
            return;
        }

        //--------------------------------------------------;
        to.chunkSize = 1024 * 1024;
        to.offset = to.offset || 0;
        to.total_offset = parseInt( to.file.size / to.chunkSize );
        to._storage_key = key || "";

        to.blob = to.file.slice( to.offset, to.chunkSize + to.offset );
        var reader = to.fileReader = new FileReader();
        //--------------------------------------------------;

        /*/
                var evt_abort = function( e ){

                    reader.removeEventListener( "abort", evt_abort, false );
                    reader.removeEventListener( "error", evt_error, false );
                    reader.removeEventListener( "load", evt_load, false );
                    reader.removeEventListener( "loadend", evt_loadend, false );
                    reader.removeEventListener( "loadstart", evt_loadstart, false );
                    reader.removeEventListener( "progress", evt_progress, false );

                };
                var evt_error = function( e ){

                    reader.removeEventListener( "abort", evt_abort, false );
                    reader.removeEventListener( "error", evt_error, false );
                    reader.removeEventListener( "load", evt_load, false );
                    reader.removeEventListener( "loadend", evt_loadend, false );
                    reader.removeEventListener( "loadstart", evt_loadstart, false );
                    reader.removeEventListener( "progress", evt_progress, false );

                };
                var evt_load = function( e ){

                    reader.removeEventListener( "abort", evt_abort, false );
                    reader.removeEventListener( "error", evt_error, false );
                    reader.removeEventListener( "load", evt_load, false );
                    //reader.removeEventListener( "loadend", evt_loadend, false );
                    //reader.removeEventListener( "loadstart", evt_loadstart, false );
                    //reader.removeEventListener( "progress", evt_progress, false );

                };
                //*/

                var evt_loadend = function( e ){

                    console.log( e );

                    /*/
                    var s = new Uint8Array( reader.result );
                    to.offset += s.length;
                    /*/
                    to.offset += reader.result.byteLength;
                    //*/

                    console.log( to.offset + "/" + to.file.size + " -- " + to.offset_count );

                    var update_progress = (to.offset / to.file.size) * 100;

                    _this.uload_progress_update( update_progress, to );


                    _this.uloadFile( reader.result, key );
                    //*///----------;
                    //reader.removeEventListener( "abort", evt_abort, false );
                    //reader.removeEventListener( "error", evt_error, false );
                    //reader.removeEventListener( "load", evt_load, false );
                    reader.removeEventListener( "loadend", evt_loadend, false );
                    //reader.removeEventListener( "loadstart", evt_loadstart, false );
                    //reader.removeEventListener( "progress", evt_progress, false );

                    //debugger;

                    reader.result.byteLength = 0;
                    //reader.result.byteLength = null;
                    to.fileReader = null;
                    reader = null;

                    //s.length = 0;
                    //s = null;

                    to.blob = null;
                    //*///----------;

                    };
                /*/
                var evt_loadstart = function( e ){

                    //reader.removeEventListener( "abort", evt_abort, false );
                    //reader.removeEventListener( "error", evt_error, false );
                    //reader.removeEventListener( "load", evt_load, false );
                    //reader.removeEventListener( "loadend", evt_loadend, false );
                    //reader.removeEventListener( "loadstart", evt_loadstart, false );
                    //reader.removeEventListener( "progress", evt_progress, false );

                };
                var evt_progress = function( e ){

                    //reader.removeEventListener( "abort", evt_abort, false );
                    //reader.removeEventListener( "error", evt_error, false );
                    //reader.removeEventListener( "load", evt_load, false );
                    //reader.removeEventListener( "loadend", evt_loadend, false );
                    //reader.removeEventListener( "loadstart", evt_loadstart, false );
                    //reader.removeEventListener( "progress", evt_progress, false );

                };
                //*/
                //--------------------------------------------------;

                //reader.addEventListener( "abort", evt_abort, false, 0, true );
                //reader.addEventListener( "error", evt_error, false, 0, true );
                //reader.addEventListener( "load", evt_load, false, 0, true );
                reader.addEventListener( "loadend", evt_loadend, false, 0, true );
                //reader.addEventListener( "loadstart", evt_loadstart, false, 0, true );
                //reader.addEventListener( "progress", evt_progress, false, 0, true );

                reader.readAsArrayBuffer( to.blob );

    }

    _this.write_OK_check = function( id ){
        return document.getElementById( id + "_prg" ).textContent = " -- complete!";
    }

    _this.uload_progress_update = function( n, file ){

        var output = document.getElementById( file.id + "_prg_bar" );
        output.style.width = n + "%"
        output = null;
    }

    _this.infoAdd = function( file ){

        var output = document.getElementById( upload_files );
        var div = document.createElement("div");
        var text = document.createTextNode( file.file.name );
        var span = document.createElement("span");
        var div0 =  document.createElement("div");
        var div1 =  document.createElement("div");

        div.setAttribute("class", "item")

        // var text_prg = document.createTextNode( " - 0%" );

        //li__img.setAttribute("id", file.name)
        span.setAttribute( "id", file.id +"_prg" );
        div.setAttribute( "id", file.id );

            div0.setAttribute("class", "ui teal progress")
            //div0.setAttribute("data-percent","29")


            div1.setAttribute("class", "bar")
            div1.setAttribute("id", file.id + "_prg_bar")

        div0.appendChild( div1 )
        div.appendChild( text );
        div.appendChild( span );
        // li.appendChild( li__img );
        output.appendChild( div );
        output.appendChild( div0 );
        // var imgByClassName = document.getElementById( file.name );
        // imgByClassName.src = dataURL;
    }

    _this.initailize = function(){
        document.getElementById( file_upload_input ).value = "";
        fileDataInfo = null;
    }

    _this._evt_change__Input_File = function( e )
    {

        var el = e.target;//INPUT Element;

        var file = el.files[ 0 ];//Selected Files;

        var key = Date.now();

        if( !_store[ key ] )
        {
            _store[ key ] = {
                file : file
                , dateTime : key
                , id : file.name + "_" + key
                , offset_count : 0
            };
        }
        _this.infoAdd( _store[ key ] );
        return key;
    };
    _this.addEvent = function( el_input, el_button )
    {

        var keyInfo = { key : "" };

        var evt_change = function( e ){
            el_input.removeEventListener( "change", arguments.callee, false );
            
            _store = {};//파일데이터를 초기화 한다.
            window.service.element.removeChild_all( document.getElementById( upload_files ) );
            
            keyInfo.key = _this._evt_change__Input_File( e );

            el_button.addEventListener( "click", function( e ){

                el_button.removeEventListener( "click", arguments.callee, false );
                _this.parseFile( keyInfo.key );
            

            }, false, 0, true );
        };

        el_input.addEventListener( "change", evt_change, false, 0, true );

    };

    _this.removeEvent = function( el_input, el_button )
    {
        
    };

    
    //----------;
    //_this.__defineSetter__( "a", function(){ return _a; } );
    _this.__defineSetter__( "file_upload_input", function( str ){ file_upload_input = str; } );
    _this.__defineSetter__( "upload_files", function( str ){ upload_files = str; } );
    _this.__defineSetter__( "upload_end_cbFuntion", function( fn ){ upload_end_cbFuntion = fn; } );
    
	//----------;

	//--------------------------------------------------;

	//--------------------------------------------------;


	//--------------------------------------------------this - FUNCTION, GET METHOD, SET METHOD, GET/SET METHOG, GETTER, SETTER, GETTER / SETTER 순서 - 타입별 내부는 알파벳 순서 _는 알파벳보다 빠르다.;
	var _ = _this;

	//--------------------------------------------------this;
	return _;
};