global.ROUTER.api.webhook = {};

//------------------------------;

global.ROUTER.api.webhook.channelio = {};
global.ROUTER.api.webhook.channelio.CONFIG = {};

// var X_Access_Key = "5af3fe773fcc2fa8";
// var X_Access_Secret = "fbf0ce1cf97738667abbfbabc0ec0b36"
var botname =  "Choisukjune__AAA";

var options = {
    host: "api.channel.io"//o.host
    , port: "443"//o.port
    , path: "/open/user_chats/{{chatId}}/messages?botName={{botname}}"//o.path
    , headers : {
       'Content-Type': 'application/json'
       , 'Content-Length': -1
       , 'X-Access-Key': "5af3fe773fcc2fa8"
       , 'X-Access-Secret': "fbf0ce1cf97738667abbfbabc0ec0b36"
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

var	_ =	global.ROUTER.api.webhook.channelio.CONFIG ;
_.__defineGetter__(	"options", function(){ return options;	} );
_.__defineGetter__(	"botname", function(){ return botname;	} );
