'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bug = mongoose.model('Bug'),
	Group = mongoose.model("Group"),
	Q = require('q'),
	User = mongoose.model("User"),
	_ = require('lodash');



var getGroupByUser = function(req,cb) {
	//var userID = [req.user._id];
	var username = [req.user.username];
	Group.find({studentsArrayList: {$in: username}}).exec(function (err,group) {
		if (!err) {
			if (!group){
				cb("The user has not in a valid group",null);
			}
			cb(null,group[0]);
		} else {
			cb(err,null);
		}
	});
}

/**
 * Create a Bug
 */
exports.create = function(req, res) {
	var bug = new Bug(req.body);
	bug.user = req.user;
	//First, search the User Group for this competition
	getGroupByUser(req,function(err,group){
		if (!err) {
			bug.group = group;
			bug.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(bug);
				}
			});
		} else {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};



/**
 * Show the current Bug
 */
exports.read = function(req, res) {
	res.jsonp(req.bug);
};

/**
 * Update a Bug
 */
exports.update = function(req, res) {
	var bug = req.bug ;

	bug.status = req.body.status;

	//bug = _.extend(bug , req.body);
	bug.isUpdateAction= true;
	bug.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * Delete a Bug
 */
exports.delete = function(req, res) {
	var bug = req.bug ;

	bug.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * List of Bugs
 */
exports.list = function(req, res) { 
	Bug.find().sort('-created').populate('user', 'displayName').exec(function(err, bugs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bugs);
		}
	});
};
var getGroupsRanking = function(competition,cb) {
    Bug.aggregate([
        { $match: {
            competition: mongoose.Types.ObjectId(competition)
        }},
        { $group: {
            _id:"$group",
            bugsReported: { $sum: 1 },
            totalPoints:       { $sum: { $add: ["$points", "$extra_points_for_approved"] } },
        	totalExtraPoints:   { $sum: "$extra_points_for_approved" },
        	totalReportedBugPoints: { $sum: "$points" }
        }},
        {$sort:{
        	"totalPoints": -1
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var promises = [];
		var indexes = [];
        for (var i = result.length - 1; i >= 0; i--) {
        	var deferred = Q.defer();
        	indexes.push({"groupID":result[i]._id,"index":i});

        	promises.push(Group.findOne({"_id":result[i]._id}).exec(function(err,group){
        		if (group != null){
	        		var index;
	        		for (var i = indexes.length - 1; i >= 0; i--) {
	        			if (group._id.equals(indexes[i].groupID)) {
	        				index = indexes[i].index;
	        				break;
	        			}
	        		};
        		}

        		if (!err && group != null) {
        			result[index].group=group.name;
        			deferred.resolve;
        		} else {
        			deferred.reject("Rejected");
        		}
        		
        	}));
        	
        };
        Q.all(promises).then(function(groups){
        	cb(result);
		});
    });
}

var getUsersRanking = function(competition,cb) {
    Bug.aggregate([
        { $match: {
            competition: mongoose.Types.ObjectId(competition)
        }},
        { $group: {
            _id:"$user",
            bugsReported: { $sum: 1 },
            totalPoints:       { $sum: { $add: ["$points", "$extra_points_for_approved"] } },
        	totalExtraPoints:   { $sum: "$extra_points_for_approved" },
        	totalReportedBugPoints: { $sum: "$points" }
        	/*"names": {
            	"$push": { "name": "$group_reported"}
          	}*/
        }},
        {$sort:{
        	"totalPoints": -1
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var promises = [];
		var indexes = [];
        for (var i = result.length - 1; i >= 0; i--) {
        	var deferred = Q.defer();
        	indexes.push({"userID":result[i]._id,"index":i});
        	promises.push(User.findOne({"_id":result[i]._id}).exec(function(err,user){
        		if (user != null){
	        		var index;
	        		for (var i = indexes.length - 1; i >= 0; i--) {
	        			if (user._id.equals(indexes[i].userID)) {
	        				index = indexes[i].index;
	        				break;
	        			}
	        		};
        		}

        		if (!err && user != null) {
        			result[index].user=user.displayName;
        			deferred.resolve;
        		} else {
        			deferred.reject("Rejected");
        		}
        		
        	}));
        	
        };
        Q.all(promises).then(function(users){
        	console.log("RESULT:",result);
        	cb(result);
		});
    });
    

}

exports.getUsersRanking = function(req,res) {
	var config = req.body;
	var competition = config.competition;
	getUsersRanking(competition,function(result){
		console.log("RESULTADO: ",result);
		res.jsonp(result);
	})
	//res.jsonp(getUsersRanking(competition));
}
exports.getGroupsRanking = function(req,res) {
	var config = req.body;
	var competition = config.competition;
	getGroupsRanking(competition,function(result){
		console.log("RESULTADO: ",result);
		res.jsonp(result);
	})
	//res.jsonp(getUsersRanking(competition));
}

/**
 * List of Open Bugs
 */
exports.getOpenBugs = function(req, res) {
	var config = req.body;
	var competition = config.competition;
	getGroupByUser(req,function(err,group){
		if (!err) {
			Bug.find({status:"OPEN",competition:competition}).sort('-created').populate('user', 'displayName').populate('group_reported','name').exec(function(err, bugs) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(bugs);
				}
			});
		} else {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};

/**
 *  getByGroupId
 */
exports.getByGroupId = function(req, res) {
	var config = req.body;
	var competition = config.competition;
	var groupId = config.groupId;
	Bug.find({status:"OPEN",competition:competition,group_reported:groupId}).sort('-created').populate('user', 'displayName').populate('group_reported','name').exec(function(err, bugs) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bugs);
		}
	});
};

/**
 * List of Open Bugs
 */
exports.getMyOpenBugs = function(req, res) {
	var config = req.body;
	var competition = config.competition;

	getGroupByUser(req,function(err,group){
		console.log("Group:",group);
		if (!err) {
			if (group){
			Bug.find({group_reported:group._id,competition:competition}).sort('-created').populate('user', 'displayName').exec(function(err, bugs) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log(bugs);
					res.jsonp(bugs);
				}
			});
			} else {
				console.log("Group undefined: ",group);
				return res.status(400).send({
					message: errorHandler.getErrorMessage("Group undefined: ",group)
				});
			}
		} else {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};

/**
 * Bug middleware
 */
exports.bugByID = function(req, res, next, id) {
	Bug.findById(id).populate('user', 'displayName').exec(function(err, bug) {
		if (err) return next(err);
		if (! bug) return next(new Error('Failed to load Bug ' + id));
		req.bug = bug ;
		next();
	});
};

/**
 * Bug authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	Group.findOne({"_id":req.bug.group_reported},function(err,group){
		if (err) return res.status(500).send('Internal Server Error: ',err);
		var tmpFlag = false;
		for (var i = group.studentsArrayList.length - 1; i >= 0; i--) {
			if (group.studentsArrayList[i] == req.user.username){
				tmpFlag = true;
				break;
			}
		};
		if (tmpFlag)
			next();
		else
			return res.status(403).send('User is not authorized');

	})
};
