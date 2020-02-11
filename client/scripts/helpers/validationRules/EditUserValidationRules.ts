import {
	cityBaseValidationRules,
	emailBaseValidationRules,
	extraInfoBaseValidationRules,
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
	city: {
		...cityBaseValidationRules
	},
	extraInfo: {
		...extraInfoBaseValidationRules
	},
	newPassword: {
		...passwordBaseValidationRules
	},
	currentPassword: {
		...passwordBaseValidationRules,
		required: 'Current Password is a required'
	}
};
