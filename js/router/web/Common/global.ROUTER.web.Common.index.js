global.ROUTER.web.Common.index = function( req,res ){
	//global.api.Mail.send_mail()



	var fs = require('fs');
	var readline = require('readline');
	var googleapis = require('googleapis');


	  var client_secret = "o14DXv3LB8lW1ekIrJFeXnng";
	  var client_id = "71338733897-md79pjard2r1gmraimvorc7mpqunqt9d.apps.googleusercontent.com";
	  var redirect_uris = 'http://ec2-13-125-22-207.ap-northeast-2.compute.amazonaws.com:8888/oauth2callback';

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	var auth = new googleapis.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

	googleapis.discover('drive', 'v2').execute(function(err, client) {
	  var url = auth.generateAuthUrl({ scope: SCOPE });
	  var getAccessToken = function(code) {
	    auth.getToken(code, function(err, tokens) {
	      if (err) {
	        console.log('Error while trying to retrieve access token', err);
	        return;
	      }
	      auth.credentials = tokens;
	      upload();
	    });
	  };
	  var upload = function() {
	    client.drive.files
	      .insert({ title: 'My Document', mimeType: 'text/plain' })
	      .withMedia('text/plain', 'Hello World!')
	      .withAuthClient(auth).execute(console.log);
	  };
	  console.log('Visit the url: ', url);
	  rl.question('Enter the code here:', getAccessToken);
	});

	global.api.HTML.render_html( req, res );

};
