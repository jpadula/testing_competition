'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	logSrv = require('../services/logSrv.js');

/**
 * Bug Schema
 */
var BugSchema = new Schema({
	
	created: {
		type: Date,
		default: Date.now
	},
	
	group: {
		type: Schema.ObjectId,
		ref: 'Group'
	},

	group_reported: {
		type: Schema.ObjectId,
		ref: 'Group'
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	
	competition: {
		type: Schema.ObjectId,
		ref: 'Competition'
	},

	userName: {
		type: String,
		default: ''
	},
	competitionName: {
		type: String,
		default: ''
	},
	groupReportedName: {
		type: String,
		default: ''
	},
	groupName: {
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: '',
		required: 'Please fill Class name',
		trim: true
	},
	totalSilverMedals: {
		type: Number,
		default: 0
	},
	totalGoldMedals: {
		type: Number,
		default: 0
	},
	routineName: {
		type: String,
		default: '',
		required: 'Please fill Routine name',
		trim: true
	},
	title: {
		type:String,
		default:'',
		required: 'Please fill Title',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Description',
		trim: true
	},

	status : {
		type: String,
		trim:true,
		default: 'OPEN',
		enum: ['OPEN', 'REJECTED', 'APPROVED']
	},
	statusReason : {
		type: String,
		trim:true,
		default: 'No comment'
	},
	points: {
		type: Number,
		default:0
	},
	extra_points_for_approved: {
		type: Number,
		default: 0
	}
	
});

mongoose.model('Bug', BugSchema);


//TODO: Modularize in a Service

var getCompetition = function(competitionID,cb) {
	var Competition = mongoose.model('Competition');
	Competition.findById(competitionID,function(err,competition){
		if (err) {
			cb(err,null);
		} else {
			cb(null,competition);
		}
	});
};


var findBugByQuery = function(query,cb) {
	var Bug = mongoose.model('Bug');
	Bug.find(query,function(err,bugs){
		if (err) {
			cb(err,null);
		} else {
			cb(null,bugs);
		}
	});
}
//TODO: modularize
var assignReportBugPoints = function(self,next) {
	getCompetition(self.competition,function(err,competition){
    	if (err) next(new Error('Failed to load Competition: ' + err));
		if (!competition) next(new Error('Failed to load Competition ' + self.competition));
	    
	    var queryByClassName = {"className":self.className,"group_reported":self.group_reported};
	    findBugByQuery(queryByClassName,function(err,bugs){
	    	if (err) next(err);
	    	if (bugs){
	    		if (bugs.length > 0) { //is not the first in CLASS C, we should search if is the first in the Routine R
	    			var queryByRoutineName = {"className":self.className,"routineName":self.routineName,"group_reported":self.group_reported};
	    			findBugByQuery(queryByRoutineName,function(err,bugs){
	    				if (err) next(err);
	    				if (bugs){
		    				if (bugs.length >0) { //is not the first in ROUTINE R, we should assign  NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R
		    					self.points = competition.POINTS.NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R;
		    					next();
		    				} else { //is the first in ROUTINE R, so we should assing NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R points
								self.points = competition.POINTS.NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R;
								self.totalSilverMedals++;
								logSrv.addPageLog(logSrv.events.reportSilverMedalBugEvent(self.userName, competition.name, self.groupReportedName));
								next();
		    				}
	    				} else {
	    					next (new Error("bug not found"));
	    				}
	    			});
	    		} else { //is the first in CLASS C, so we should assing FIRST_BUG_IN_CLASS_C points
	    			self.points = competition.POINTS.FIRST_BUG_IN_CLASS_C;
	    			self.totalGoldMedals++;
	    			logSrv.addPageLog(logSrv.events.reportGoldMedalBugEvent(self.userName, competition.name, self.groupReportedName));
	    			next();
	    		}

	    	} else {
				next (new Error("No bugs founded"));
	    	}
	    });		
    });
}

var assignExtraApprovedPoints = function(self,next) {
	getCompetition(self.competition,function(err,competition){
		if (err) next(new Error('Failed to load Competition: ' + err));
		if (!competition) next(new Error('Failed to load Competition ' + self.competition));
		
		if (self.status == "APPROVED") {
			logSrv.addPageLog(logSrv.events.reportAcceptBugEvent(self.userName, competition.name, self.groupReportedName));
			self.extra_points_for_approved = competition.POINTS.PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG;
		}
		if (self.status == "REJECTED") {
			logSrv.addPageLog(logSrv.events.reportRejectBugEvent(self.userName, competition.name, self.groupReportedName));
			self.extra_points_for_approved = competition.POINTS.PERSON_WHO_SUBMITTED_A_REJECTED_BUG;
		}

		next();
	});

};

BugSchema.pre("save", function(next) {
	var self = this;
	
	if (!self.isUpdateAction) // if we are not using the update method, we should to calculate how many points save
		assignReportBugPoints(self,next);

	if (self.isUpdateAction) //if we are using update method, we should set extra points (if the status is APPROVED)
		assignExtraApprovedPoints(self,next);

});