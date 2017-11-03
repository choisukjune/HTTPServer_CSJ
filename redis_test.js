var redis = require("redis");
r = redis.createClient(6379,'127.0.0.1');
r.auth("tjrwns2482");

// for(var i = 0;i < 100000; ++i)
// {
//   //r.set(i, "test" + i, 'EX', 10);
//   r.set(i, "test" + i, 'EX', 60*60);
//   // var todayEnd = new Date().setHours(0, 0, 30, 999);
// }

r.keys('*', function (err, keys) {
  if (err) return console.log(err);

  //for(var i = 0, len = keys.length; i < len; i++) {
    console.log("MULTI got " + keys.length + " replies");

           keys.forEach(function (reply, index) {
               console.log("Reply " + index + ": " + reply.toString());
               r.get(reply, function(err, data){
                       console.log(data);
               });
           });
  //}
});

console.log( "end" )
r.quit()
// process.exit( 0 );
