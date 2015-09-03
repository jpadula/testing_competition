'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	
	className: {
		type: String,
		default: '',
		required: 'Please fill Class name',
		trim: true
	},

	routineName: {
		type: String,
		default: '',
		required: 'Please fill Routine name',
		trim: true
	},

	description: {
		type: String,
		default: '',
		required: 'Please fill Description',
		trim: true
	}
	
});

mongoose.model('Bug', BugSchema);