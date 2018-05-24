/**
 * 문자열의 인코딩 방식을 변경하는 함수
 * @param  {Array} array
 * @param  {String} characterSet
 * @return {String}
 */
global.api.Mail.send_mail = function(){

	const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
	const TOKEN_PATH = 'sendMail__google_api_key.json';

	// Load client secrets from a local file.
	global.REQUIRES.fs.readFile('sendMail__google_api_key.json', function(err, content){
	  if (err) return console.log('Error loading client secret file:', err);
	  console.log( JSON.parse(content) )
	  authorize(JSON.parse(content), listLabels);

	});

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {

	  var client_secret = "tlciIo1m5hqfDB75tmK_5N7g";
	  var client_id = "119749462334-pl37367idi2q5p1egrs5b3ti78c8paee.apps.googleusercontent.com";
	  var redirect_uris = "http://ec2-13-125-22-207.ap-northeast-2.compute.amazonaws.com:8888";

	  var oAuth2Client = new global.REQUIRES.googleapis.oauth2_v2.OAuth2( client_id, client_secret, redirect_uris[0] );

	  // Check if we have previously stored a token.
	  global.REQUIRES.fs.readFile(TOKEN_PATH, function(err, token){
	    if (err) return getNewToken(oAuth2Client, callback);
	    oAuth2Client.setCredentials(JSON.parse(token));
	    callback(oAuth2Client);
	  });
	}

	/**
	 * Get and store new token after prompting for user authorization, and then
	 * execute the given callback with the authorized OAuth2 client.
	 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
	 * @param {getEventsCallback} callback The callback for the authorized client.
	 */
	function getNewToken(oAuth2Client, callback) {
	  var authUrl = oAuth2Client.generateAuthUrl({
	    access_type: 'offline',
	    scope: SCOPES,
	  });
	  console.log('Authorize this app by visiting this url:', authUrl);
	  const rl = global.REQUIRES.readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
	  });
	  rl.question('Enter the code from that page here: ', function(code){
	    rl.close();
	    oAuth2Client.getToken(code, function(err, token){
	      if (err) return callback(err);
	      oAuth2Client.setCredentials(token);
	      // Store the token to disk for later program executions
	      global.REQUIRES.fs.writeFile(TOKEN_PATH, JSON.stringify(token), function(err){
	        if (err) return console.error(err);
	        console.log('Token stored to', TOKEN_PATH);
	      });
	      callback(oAuth2Client);
	    });
	  });
	}

	/**
	 * Lists the labels in the user's account.
	 *
	 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
	 */
	function listLabels(auth) {
	  var gmail = global.REQUIRES.googleapis.gmail({version: 'v1', auth});
	  gmail.users.labels.list({
	    userId: 'me',
	}, function(err, {data}){
	    if (err) return console.log('The API returned an error: ' + err);
	    var labels = data.labels;
	    if (labels.length) {
	      console.log('Labels:');
	      labels.forEach((label) => {
	        console.log(`- ${label.name}`);
	      });
	    } else {
	      console.log('No labels found.');
	    }
	  });
	}


}
