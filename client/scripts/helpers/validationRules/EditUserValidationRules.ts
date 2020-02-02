import {
	emailBaseValidationRules,
	passwordBaseValidationRules,
	userNameBaseValidationRules
} from './BaseValidationRules';

export default {
	username: {
		...userNameBaseValidationRules,
		required: 'Username is a required'
	},
	email: {
		...emailBaseValidationRules,
		required: 'Email is a required'
	},
	extraInfo: {
		maxLength: {
			value: 200,
			message: 'Max length is 200'
		}
	},
	newPassword: {
		...passwordBaseValidationRules
	},
	currentPassword: {
		...passwordBaseValidationRules,
		required: 'Current Password is a required'
	}
};
