'use strict';

/**
 * Module dependencies.
 */

// the name start with 'a' so that it loads before the bug server model
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var pageViewSchema = new Schema({
	ip: String,
	pageCode: String, // using a number as String
	userName: String,
	competitionName: {
		type:String,
		default: ""
	},
	date: {
		type: Date,
		default: Date.now
	},
	groupName: {
		type:String,
		default: ""
	}
});

mongoose.model('pageView', pageViewSchema);