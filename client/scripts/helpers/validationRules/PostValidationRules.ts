import {
	postTextBaseValidationRules,
	postTitleBaseValidationRules
} from './BaseValidationRules';

export default {
	title: {
		...postTitleBaseValidationRules,
		required: 'Title is a required'
	},
	text: {
		...postTextBaseValidationRules,
		required: 'Post is a required'
	}
};
