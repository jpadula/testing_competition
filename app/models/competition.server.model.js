'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Competition Schema
 */
var CompetitionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Competition name',
		trim: true,
		unique:true
	},
	created: {
		type: Date,
		default: Date.now
	},

	//group list
	groupsList: [{
		type: Schema.ObjectId,
		ref: 'Group'
	}],

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	POINTS:{
		FIRST_BUG_IN_CLASS_C: {
			type:Number,
			default: 10
		},
		NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R: {
			type:Number,
			default: 5
		},
		NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R: {
			type:Number,
			default: 3
		},
		PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG: {
			type:Number,
			default: 2
		},
	}
});

mongoose.model('Competition', CompetitionSchema);