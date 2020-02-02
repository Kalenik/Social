import {
	emailBaseValidationRules,
	passwordBaseValidationRules,
	userNameBaseValidationRules
} from './BaseValidationRules';

export default {
	username: {
		...userNameBaseValidationRules,
		required: 'UserName is a required'
	},
	email: {
		...emailBaseValidationRules,
		required: 'Email is a required'
	},
	password: {
		...passwordBaseValidationRules,
		required: 'Password is a required'
	}
};
