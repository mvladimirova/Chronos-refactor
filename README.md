Chronos
========

Server based events planner


Setup
=======
Dependencies: 
* Node.js
* MongoDB 

Running the app:
(I would recomend installing nodemon, because it helps with developement and quick changes)
1. Create the needed data base folders for mongo:
  Chronos/Database/dblogs/mongo.log
  Chronos/Database/chronosDB
2. Start MongoDB 
  Go to to the root folder and type mongod --config MongoConf.conf
3. go to the core-js folder and start server.js (either by node server.js or nodemon server.js)

