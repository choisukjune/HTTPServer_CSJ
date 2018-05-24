D:\GitHub_CSJ\MongoDB\bin\mongo.exe --port 55555 -u tjrwns -p q1q1q1q1q1 --authenticationDatabase admin
:db.createUser({user: "tjrwns",pwd: "q1q1q1q1q1",roles: [ { role: "root", db: "admin" } ]})