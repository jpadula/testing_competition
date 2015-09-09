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
	
	competition: {
		type: Schema.ObjectId,
		ref: 'Competition'
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
	},

	status : {
		type: String,
		trim:true,
		default: 'OPEN',
		enum: ['OPEN', 'REJECTED', 'APPROVED']
	}
	
});

mongoose.model('Bug', BugSchema);