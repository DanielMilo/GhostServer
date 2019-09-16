const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const mongoUser = process.env["ghost-mongo-user"];
const mongoPass = process.env["ghost-mongo-pass"];

const uri = "mongodb+srv://" + mongoUser + ":" + mongoPass + "@ghostdb-y3gee.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "ghostDB";
const collection = "ghosts";

module.exports = {
    get: function(req,res){
        const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

        const app = req.query.app;
        const stageID = req.params.stageID;

        const query = {};
        if(app){
            query.app = app;
        }
        if(stageID){
            query.stageID = stageID;
        }

        client.connect(err => {
            if(err){
                console.log(err);
                res.status = 500;
                res.send("ERROR")
            }
            else{
                const collection = client.db(dbName).collection(collection);
                collection.find(query).project({_id: 0 }).toArray(function(err, docs) {

                    if(err){
                        console.log(err);
                    }
                    //assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(docs);
                    res.send({ ghosts: docs });       
                    
                    client.close();
                })
                
            }
        });
    },
    

    post: function(req,res){
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            if(err){
                console.log(err);
                res.status = 500;
                res.send("ERROR")
            }
            else{
                const collection = client.db(dbName).collection(collection);
                
                const newGhost = {};
                
                newGhost.app = req.query.app;
                newGhost.insertTimestamp = Date.now();
                newGhost.inserterID = req.query.id;
                newGhost.stageID = req.params.stageID; // Only in the /stages/:stageID/ghosts route.

                newGhost.ghostData = req.body;

                collection.insertMany([newGhost], function(err,result) {

                    if(err){
                        res.status = 500;
                        res.send("DB ERROR");
                    }
                    else {
                        res.send(newGhost);
                    }
                    client.close();
                })

                
            }
        });
    },

    dummyGhost: {
        app: "StirlingEclipse",
        insertTimestamp: Date.now(),
        inserterID: "Witty",
        ghostData: {},
    }
}