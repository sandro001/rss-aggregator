// var _ = require('lodash');
var async = require('async');   
// var CommonFunctions = require('../../api/services/CommonFunctions.js');
module.exports = {
    create: create,
    list: list,
    subscribeToSource: subscribeToSource
}

function list(req, res) {
    var currentUserId = req.options.is_authorized ? req.session.user_id : null;
    async.waterfall([
      // set tags
      function(cb) {
        Source.find().exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return cb(err);
            }
            cb(null, result);
        });
        
      },
      function(sources, cb) {
        if(currentUserId) {
            async.each(sources, function(source, callback) {
                var searchObj = {
                    user: currentUserId,
                    source: source.id
                }
                Subscribtion.findOne(searchObj).then(function(subscribtion){
                    if(subscribtion) {
                        source['mySubscr'] = true;
                    } else {
                        source['mySubscr'] = false;
                    }
                    callback(null);
                }, function(err) {
                    sails.log.debug('Some error occured ' + err);
                    return callback(err);                    
                });
            }, function(err) {
                if( err ) {
                  cb(err);
                } else {
                  cb(null, sources);
                }
            });
        } else {
            cb(null, sources);
        }
      }
    ], function(err, sources) {
      res.json(200, { success: 'Success', results: sources });
    })
    
}

function create(req, res) {
    var story = {
        name: req.body.name,
        url : req.body.url
    };
    Source.create(story).exec(function(err, result){
        if (err) {
            sails.log.debug('Some error occured ' + err);
            return res.json(500, { error: 'Some error occured' });
        }
        return res.json(200, { success: 'Success', data: result });
    });
}

function subscribeToSource(req, res) {
    if(!req.params.sourceId) {
        return res.json(500, { error: 'source id should be specified' });
    }
    if(!req.session.user_id) {
        return res.json(401, { error: 'please login' });
    }
    var obj = {
        sourceId: req.params.sourceId,
        userId : req.session.user_id
    };
    SourceSubscribtionService.subscribe(obj).then(function(subscribtion){
        return res.json(200, { success: 'Success', data: subscribtion });
    }, function(err) {
        sails.log.debug('Some error occured ' + err);
        return res.json(500, { error: 'Some error occured' });
        
    });
}


