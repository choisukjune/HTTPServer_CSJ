global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data.toString();
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})

	req.on('end', function () {

		//var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );

		console.log( global.REQUIRES.querystring.escape( decodeURI( body ) ))
		global.CSJLog.timeStamp( JSON.stringify( _q ) )
		console.log( body )
		console.log( _q )
		//https://api.channel.io/open/user_chats/{userChatId}/messages


		var o = {
			host: "api.channel.io"//o.host
			, port: "443"//o.port
			, path: "/open/user_chats/690905/messages?botName=sdfsdfsd"//o.path
			, data : {
			    "message": "Your message",
			    "botOption": {
			        "actAsManager": false,
			        "silentToManager": false,
			        "silentToGuest": false
			    }
			}
		}

		/*
		var options = {
			hostname: o.host
			, port: o.port
			, path: o.path
			, method: "POST"
			//, headers: {
			//   'Content-Type': 'application/x-www-form-urlencoded',
			//   //'Content-Length': Buffer.byteLength(postData)
			// }
			// , data : {
			//   a : "a",
			//   b : "b"
			// }
		};*/
		console.log( o )

		global.api.Request.request__POST_https(o,"utf8",function(d){
			console.log( "=======================>",d )
			global.api.Response.res_200_ok_String( req, res, "OK");
		})

	})
};
