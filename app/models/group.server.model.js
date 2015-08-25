'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Group name',
		trim: true
	},
	number: {
		type: Number,
		required: "Please fill the Group Number",
		unique: true
	},
	created: {
		type: Date,
		default: Date.now
	},

	//group users
	studentsList: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],

	//user that created the group
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Group', GroupSchema);