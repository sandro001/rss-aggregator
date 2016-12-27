var q = require('q');

module.exports = {

  createTag: function (data) {
    var deferred = q.defer();

    var tag = {
      name: (data.name+"").toLowerCase()
    }
    Tag.findOrCreate(tag).exec(function(err, createdTag){
        if (err) {
        console.log('err', err)
          return deferred.reject(new Error(err));
        } else {
          return deferred.resolve(createdTag);
        }
    });
    return deferred.promise;
  },

  getUserTags: function (data) {
    var deferred = q.defer();
    
    async.waterfall([
      function(waterfallCb) {
        var tagIds = [];
        var taggedReqObj = {
          user: data.userId
        }
        UserTagged.find(taggedReqObj).then(function(mapps){
            mapps.map(function(tagged) {
              tagIds.push(tagged.tag);
            })
            waterfallCb(null, tagIds);
        }, function(err) {
            sails.log.debug('Some error occured ' + err);
            return waterfallCb(err);                    
        });
      },
      function(tagIds, waterfallCb) {
        var tags = [];
        async.each(tagIds, function(tagId, cb) {
          Tag.findOne({
            id: tagId
          }).exec(function(err, tag) {
            if(err) {
              return cb(err);
            }
            tags.push(tag)
            cb(null)
          })                
        }, function finish() {
          waterfallCb(null, tags)
        })   
      }
    ], function (err, tags) {
      if(err) {
        return deferred.reject(err);
      }
      deferred.resolve(tags);
    });
    return deferred.promise;
  },

  searchTags: function (data) {
    var deferred = q.defer();

    Tag.find({
      name: { contains: data.name }
    }).exec(function(err, tags) {
      if(err) {
        return deferred.reject(err);
      }
      deferred.resolve(tags)
    })  
    return deferred.promise;
  },
}