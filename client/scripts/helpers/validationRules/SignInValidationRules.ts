import {
	emailBaseValidationRules,
	passwordBaseValidationRules
} from './BaseValidationRules';

export default {
	email: {
		...emailBaseValidationRules,
		required: 'Email is a required'
	},
	password: {
		...passwordBaseValidationRules,
		required: 'Password is a required'
	}
};
