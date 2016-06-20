var configDB = require('../config/database');
var Pinboard = require('../app/models/pinboard');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


function getNews(res){
    MongoClient.connect(configDB.url, function(err, db) {
        assert.equal(null, err);
        var coll = db.collection('news');
        coll.find({}).sort({ date: 1 }).toArray(function(err, data){
            if(err){
                console.error(err);
            }else if (data.length){
                res.json(data);
            }else {
                console.log('nothing found');
            }
        });
    });
}

function getBoards(res){
    MongoClient.connect(configDB.url, function(err, db) {
        assert.equal(null, err);
        var coll = db.collection('pinboards');
        coll.find({}).sort({ date: 1 }).toArray(function(err, data){
            if(err){
                console.error(err);
            }else if (data.length){
                res.json(data);
            }else {
                console.log('nothing found');
            }
        });
    });
}

function getAllPinned(id ,res){
    Pinboard.findOne({_id : id}, function(err, data){
        if(err){
            res.json(err)
        } else if(data === null){
            console.log('Nothing found')
        } else {
            res.json(data.pins);
        }
    });
}

function newPinboard(req, res) {
    new Pinboard({
        user : req.body.user,
        time : Date.now()
    }).save( function( err, data, count ){
        res.json(data);
    });
}

function newPin(id, req, res) {
    Pinboard.findOne({_id : id}, function(err, data){
        if(err){
            res.json(err)
        } else if(data === null){
            console.log('Nothing found')
        } else {
            data.pins.push({
                title: req.body.title,
                kwic: req.body.kwic,
                url: req.body.url,
                pintime: Date.now()
            });
            data.save( function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    res.json(data.pins);
                }
            });
        }
    });
}

function deleteBoard(id, res) {
    Pinboard.findOne({_id : id}, function(err, data){
        if(err){
            res.json(err)
        } else if(data === null){
            console.log('Nothing found')
        } else {
            data.remove(function (err, data) {
               if(err){
                   res.json(err)
               } else {
                   console.log('Done');
               }
            });
        }
    });
}

function unPin(id, pinned, res) {
    Pinboard.findOne({_id : id}, function(err, data){
        if(err){
            res.json(err)
        } else if(data === null){
            console.log('Nothing found')
        } else {
            for(var i =0; i < data.pins.length; i++){
                if(data.pins[i]._id == pinned){
                    data.pins.splice(i, 1);
                } else {
                    console.log('nothing');
                }
            }
            data.save(function (err, data) {
                if(err){
                    res.json(err)
                } else {
                    res.json(data);
                }
            });
        }
    });
}


module.exports = {
    getNews,
    newPinboard,
    newPin,
    getBoards,
    deleteBoard,
    unPin,
    getAllPinned
};



