global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data.toString();
	})

	req.on('end', function () {

		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var ob = JSON.parse( body );

		// var _channelio_botname =  "Choisukjune__AAA";
		// var _channelio_host = "api.channel.io";
		// var _channelio_port = "443";
		// var _channelio_X_Access_Key = "5af3fe773fcc2fa8";
		// var _channelio_X_Access_Secret = "fbf0ce1cf97738667abbfbabc0ec0b36"


		var o = {
		    host : global.ROUTER.api.webhook.channelio.CONFIG._channelio_host//o.host
		    , port : global.ROUTER.api.webhook.channelio.CONFIG._channelio_port//o.port
		    , path : "/open/user_chats/" + ob.entity.chatId + "/messages?botName=" + global.ROUTER.api.webhook.channelio.CONFIG._channelio_botname//o.path
		    , headers : {
		       'Content-Type': 'application/json'
		       , 'Content-Length': -1
		       , 'X-Access-Key': global.ROUTER.api.webhook.channelio.CONFIG._channelio_X_Access_Key
		       , 'X-Access-Secret': global.ROUTER.api.webhook.channelio.CONFIG._channelio_X_Access_Secret
		    }
		    , data : {
		        "message" : "",
		        "botOption": {
		            "actAsManager": false,
		            "silentToManager": false,
		            "silentToGuest": false
		        }
		    }
		}

		o.data.message = encodeURIComponent( "Your message is " + ob.entity.message )

		global.CSJLog.log( JSON.stringify( o ) );
		global.CSJLog.log( JSON.stringify( global.ROUTER.api.webhook.channelio.CONFIG._options ) );
		if( ob.entity.personType != "Bot" )
		{
			global.api.Request.request__POST_https(o,"utf8",function(d){
				global.CSJLog.log( d )
				global.api.Response.res_200_ok_String( req, res, "OK");
			})
		}
	})
};
