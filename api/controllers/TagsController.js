
module.exports = {
    create: create,
    my_tags: my_tags,
}

function create(req, res) {
    var tag = {
        name: req.body['name']
    };
    TagService.createTag(tag)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        }, function(err) {
            return res.json(200, { error: err });
        })
}


function my_tags(req, res) {
    var currentUserId = req.options.is_authorized ? req.session.user_id : null;
    if(!currentUserId) {
        return res.json(200, { error: "You should be logged in to view this api" });
    }
    var reqObj = {
    	userId: currentUserId
    };
    TagService.getUserTags(reqObj)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        }, function(err) {
            return res.json(200, { error: err });
        })
}


